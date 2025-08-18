/* 
  Tests for StrategicPurifier

  Framework note:
  - This test file uses Jest-style APIs: describe, it, expect, jest.fn, jest.useFakeTimers, etc.
  - If this repository uses Vitest, these tests will largely work with minor adjustments:
      - Replace jest.fn with vi.fn
      - Replace jest.spyOn with vi.spyOn
      - Replace jest.useFakeTimers/advanceTimersByTime with vi.useFakeTimers/advanceTimersByTime
*/

import { StrategicPurifier } from './strategic-purifier';
import type { ResourceRequest } from '../interfaces';

describe('StrategicPurifier', () => {
  const FIXED_NOW = 1735689600000; // 2025-01-01T00:00:00.000Z (arbitrary fixed timestamp)
  const expectedId = `StrategicPurifier-${FIXED_NOW}`;

  // Minimal mock for SacredKeyComptroller aligned with needed interface
  interface MockComptroller {
    approveRequest: (r: ResourceRequest) => boolean;
  }

  let approveRequestMock: jest.Mock<boolean, [ResourceRequest]>;
  let comptroller: MockComptroller;

  beforeEach(() => {
    // Freeze Date.now for deterministic IDs
    jest.spyOn(Date, 'now').mockReturnValue(FIXED_NOW);

    // Fake timers to control setTimeout used inside execute()
    jest.useFakeTimers();

    approveRequestMock = jest.fn();
    comptroller = {
      approveRequest: approveRequestMock,
    };

    // Silence real console during tests, but allow verification via spies
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
    (Date.now as jest.Mock | jest.SpyInstance).mockRestore();
  });

  it('generates a deterministic id using Date.now', () => {
    const purifier = new StrategicPurifier(comptroller as any);
    // @ts-expect-error - accessing internal property to assert determinism
    expect(purifier.id).toBe(expectedId);
  });

  it('requests compute resources with correct payload and executes on approval (happy path)', async () => {
    approveRequestMock.mockReturnValue(true);

    const purifier = new StrategicPurifier(comptroller as any);

    const task = { purpose: 'Neutralize anomalies' };
    const execPromise = purifier.execute(task);

    // The request should have been built and approved before the delay runs
    expect(approveRequestMock).toHaveBeenCalledTimes(1);
    const requestArg = approveRequestMock.mock.calls[0][0] as ResourceRequest;

    expect(requestArg).toEqual({
      requesterId: expectedId,
      resourceType: 'compute',
      amount: 10,
      purpose: `Execute purification task: ${task.purpose}`,
    });

    // Should log start message
    expect(console.log).toHaveBeenCalledWith(
      `[${expectedId}] Executing purification: "${task.purpose}"`
    );

    // Not completed yet until timers advance
    expect(console.log).not.toHaveBeenCalledWith(
      `[${expectedId}] Purification task completed.`
    );

    // Advance the fake timer by 100ms to resolve the internal delay
    await jest.advanceTimersByTimeAsync(100);

    await execPromise;

    // Now should have logged completion
    expect(console.log).toHaveBeenCalledWith(
      `[${expectedId}] Purification task completed.`
    );

    // Ensure no error log in the success path
    expect(console.error).not.toHaveBeenCalled();
  });

  it('logs error and aborts when the comptroller denies the request (failure path)', async () => {
    approveRequestMock.mockReturnValue(false);

    const purifier = new StrategicPurifier(comptroller as any);

    const task = { purpose: 'Calibrate containment field' };
    await purifier.execute(task);

    // Validate request payload passed to approveRequest
    expect(approveRequestMock).toHaveBeenCalledTimes(1);
    const req = approveRequestMock.mock.calls[0][0] as ResourceRequest;
    expect(req.requesterId).toBe(expectedId);
    expect(req.resourceType).toBe('compute');
    expect(req.amount).toBe(10);
    expect(req.purpose).toBe(`Execute purification task: ${task.purpose}`);

    // Should log an error and not proceed to completion
    expect(console.error).toHaveBeenCalledWith(
      `[${expectedId}] Resource request denied. Task aborted.`
    );
    expect(console.log).not.toHaveBeenCalledWith(
      `[${expectedId}] Purification task completed.`
    );
  });

  it('handles empty purpose gracefully and still forms a valid request', async () => {
    approveRequestMock.mockReturnValue(true);
    const purifier = new StrategicPurifier(comptroller as any);

    const task = { purpose: '' };
    const execPromise = purifier.execute(task);

    expect(approveRequestMock).toHaveBeenCalledTimes(1);
    const req = approveRequestMock.mock.calls[0][0] as ResourceRequest;
    expect(req.purpose).toBe('Execute purification task: ');

    // Start log reflects empty purpose
    expect(console.log).toHaveBeenCalledWith(
      `[${expectedId}] Executing purification: ""`
    );

    await jest.advanceTimersByTimeAsync(100);
    await execPromise;

    expect(console.log).toHaveBeenCalledWith(
      `[${expectedId}] Purification task completed.`
    );
  });

  it('tolerates unexpected task shape at runtime (purpose undefined) without throwing', async () => {
    approveRequestMock.mockReturnValue(true);
    const purifier = new StrategicPurifier(comptroller as any);

    // Bypass TS typing to simulate runtime misuse
    const badTask: any = { purpose: undefined };

    const execPromise = purifier.execute(badTask);

    // Request still created with "undefined" interpolation
    expect(approveRequestMock).toHaveBeenCalledTimes(1);
    const req = approveRequestMock.mock.calls[0][0] as ResourceRequest;
    expect(req.purpose).toBe('Execute purification task: undefined');

    // Logs still occur
    expect(console.log).toHaveBeenCalledWith(
      `[${expectedId}] Executing purification: "undefined"`
    );

    await jest.advanceTimersByTimeAsync(100);
    await execPromise;

    expect(console.log).toHaveBeenCalledWith(
      `[${expectedId}] Purification task completed.`
    );
    expect(console.error).not.toHaveBeenCalled();
  });

  it('waits approximately 100ms before completing on approval', async () => {
    approveRequestMock.mockReturnValue(true);
    const purifier = new StrategicPurifier(comptroller as any);

    const task = { purpose: 'Stabilize entropy' };
    const p = purifier.execute(task);

    // Before advancing timers, completion not logged
    expect(console.log).not.toHaveBeenCalledWith(
      `[${expectedId}] Purification task completed.`
    );

    // Advance by less than 100ms
    await jest.advanceTimersByTimeAsync(99);
    expect(console.log).not.toHaveBeenCalledWith(
      `[${expectedId}] Purification task completed.`
    );

    // Now advance the final millisecond
    await jest.advanceTimersByTimeAsync(1);
    await p;

    expect(console.log).toHaveBeenCalledWith(
      `[${expectedId}] Purification task completed.`
    );
  });
});
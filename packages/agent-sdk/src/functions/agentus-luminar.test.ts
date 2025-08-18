/**
 * Tests for AgentusLuminar
 *
 * Testing library and framework:
 * - This suite is authored with Vitest-style imports (describe, it, expect, vi).
 * - If your project uses Jest, the API is compatible; replace 'vitest' import with jest globals or configure jest.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AgentusLuminar } from './agentus-luminar';
import type { SacredKeyComptroller } from '../sacred-key-comptroller';
import type { ResourceRequest } from '../interfaces';

describe('AgentusLuminar', () => {
  let mockComptroller: SacredKeyComptroller;

  const buildComptroller = (approve: boolean, inspect?: (req: ResourceRequest) => void): SacredKeyComptroller => {
    return {
      approveRequest: vi.fn((req: ResourceRequest) => {
        inspect && inspect(req);
        return approve;
      })
    } as unknown as SacredKeyComptroller;
  };

  const spyConsole = () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    return { log, error };
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01T00:00:00.000Z')); // Stabilize Date.now for deterministic id
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('constructs with deterministic id prefix and stores comptroller', () => {
    mockComptroller = buildComptroller(true);
    const luminar = new AgentusLuminar(mockComptroller);

    expect(luminar.id).toMatch(/^AgentusLuminar-\d+$/);
    // Ensures timestamp component reflects fake time
    const suffix = luminar.id.replace('AgentusLuminar-', '');
    expect(Number.isNaN(Number(suffix))).toBe(false);
  });

  it('requests compute resources with expected shape and purpose, then executes when approved (happy path)', async () => {
    let captured: ResourceRequest | undefined;
    mockComptroller = buildComptroller(true, (req) => { captured = req; });

    const { log, error } = spyConsole();
    const luminar = new AgentusLuminar(mockComptroller);

    const task = { agentTask: 'Compile daily analytics report' };
    const promise = luminar.execute(task);

    // Fast-forward the internal sleep of 150ms
    await vi.runAllTimersAsync();

    const result = await promise;

    // Validate resource request details
    expect(captured).toBeDefined();
    expect(captured!.requesterId).toBe(luminar.id);
    expect(captured!.resourceType).toBe('compute');
    expect(captured!.amount).toBe(25);
    expect(captured!.purpose).toBe(`Agent task and reporting: ${task.agentTask}`);

    // Validate return message
    expect(result).toBe(`Task "${task.agentTask}" was completed successfully.`);

    // Validate logging behavior (no errors in happy path)
    expect(log).toHaveBeenCalledWith(`[${luminar.id}] Executing agent task: "${task.agentTask}"`);
    expect(log).toHaveBeenCalledWith(`[${luminar.id}] Task result documented.`);
    expect(error).not.toHaveBeenCalled();
  });

  it('returns denial message and logs error when comptroller denies', async () => {
    let captured: ResourceRequest | undefined;
    mockComptroller = buildComptroller(false, (req) => { captured = req; });

    const { log, error } = spyConsole();
    const luminar = new AgentusLuminar(mockComptroller);

    const task = { agentTask: 'Run GPU-intensive simulation' };
    const result = await luminar.execute(task);

    // Validate resource request details even on denial
    expect(captured).toBeDefined();
    expect(captured!.requesterId).toBe(luminar.id);
    expect(captured!.resourceType).toBe('compute');
    expect(captured!.amount).toBe(25);
    expect(captured!.purpose).toBe(`Agent task and reporting: ${task.agentTask}`);

    // Validate error path response (should not wait for 150ms sleep)
    expect(result).toBe(`[${luminar.id}] Resource request denied. Task aborted.`);

    // Validate logging behavior
    expect(error).toHaveBeenCalledWith(`[${luminar.id}] Resource request denied. Task aborted.`);
    // Should not log execution or documentation messages on denial
    expect(log).not.toHaveBeenCalledWith(expect.stringContaining('Executing agent task'));
    expect(log).not.toHaveBeenCalledWith(expect.stringContaining('Task result documented.'));
  });

  it('waits approximately 150ms before returning success on approval (timing behavior)', async () => {
    mockComptroller = buildComptroller(true);
    const luminar = new AgentusLuminar(mockComptroller);

    const task = { agentTask: 'Short task' };
    const promise = luminar.execute(task);

    // Before advancing timers, the promise should still be pending.
    // In Vitest/Jest fake timers, we can queue microtasks to ensure pending state.
    let settled = false;
    promise.then(() => { settled = true; });

    // Run 149ms -> should still be pending
    await vi.advanceTimersByTimeAsync(149);
    expect(settled).toBe(false);

    // Advance the remaining 1ms -> now resolve
    await vi.advanceTimersByTimeAsync(1);
    await promise;
    expect(settled).toBe(true);
  });

  it('handles unexpected or empty agentTask gracefully by still forming purpose and completing when approved', async () => {
    mockComptroller = buildComptroller(true);
    const luminar = new AgentusLuminar(mockComptroller);

    // Using blank string to simulate edge case input
    const task = { agentTask: '' };
    const promise = luminar.execute(task);
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toBe('Task "" was completed successfully.');
  });

  it('supports very long agentTask strings and preserves them in the result', async () => {
    mockComptroller = buildComptroller(true);
    const luminar = new AgentusLuminar(mockComptroller);

    const longTask = 'A'.repeat(5000);
    const task = { agentTask: longTask };
    const promise = luminar.execute(task);
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toBe(`Task "${longTask}" was completed successfully.`);
  });

  it('calls approveRequest exactly once per execution with correct payload', async () => {
    let captured: ResourceRequest | undefined;
    const approveRequest = vi.fn((req: ResourceRequest) => {
      captured = req;
      return true;
    });
    mockComptroller = { approveRequest } as unknown as SacredKeyComptroller;

    const luminar = new AgentusLuminar(mockComptroller);
    const task = { agentTask: 'Verify single approval call' };
    const promise = luminar.execute(task);
    await vi.runAllTimersAsync();
    await promise;

    expect(approveRequest).toHaveBeenCalledTimes(1);
    expect(approveRequest).toHaveBeenCalledWith(captured);
    expect(captured).toBeDefined();
    expect(captured!.purpose).toBe(`Agent task and reporting: ${task.agentTask}`);
  });

  it('produces unique ids across different instances created at different times', () => {
    // First instance at time T0
    vi.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));
    const a = new AgentusLuminar(buildComptroller(true));

    // Second instance at time T1 (different)
    vi.setSystemTime(new Date('2024-01-01T00:00:01.000Z'));
    const b = new AgentusLuminar(buildComptroller(true));

    expect(a.id).not.toBe(b.id);
    expect(a.id.startsWith('AgentusLuminar-')).toBe(true);
    expect(b.id.startsWith('AgentusLuminar-')).toBe(true);
  });

  it('does not throw when console methods are unavailable (defensive test)', async () => {
    // Simulate environments where console methods might be undefined
    const originalLog = console.log as any;
    const originalErr = console.error as any;
    // @ts-expect-error override for test
    console.log = undefined;
    // @ts-expect-error override for test
    console.error = undefined;

    try {
      const luminar = new AgentusLuminar(buildComptroller(true));
      const promise = luminar.execute({ agentTask: 'No console available' });
      await vi.runAllTimersAsync();
      const result = await promise;
      expect(result).toContain('completed successfully');
    } finally {
      console.log = originalLog;
      console.error = originalErr;
    }
  });
});
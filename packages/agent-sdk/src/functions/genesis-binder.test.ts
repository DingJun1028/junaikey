import { jest } from '@jest/globals';

// Attempt to import the class under test from likely implementation location.
// If the project colocates tests with implementation, adjust import accordingly.
import { GenesisBinder } from './genesis-binder';
import type { ResourceRequest } from '../interfaces';
import type { SacredKeyComptroller } from '../sacred-key-comptroller';

describe('GenesisBinder', () => {
  const FIXED_NOW = 1_725_000_000_000; // fixed timestamp for deterministic IDs

  let originalNow: () => number;
  let approveRequestMock: jest.Mock<boolean, [ResourceRequest]>;
  let mockComptroller: SacredKeyComptroller;

  beforeAll(() => {
    // Preserve original Date.now
    originalNow = Date.now;
  });

  beforeEach(() => {
    // Mock Date.now to be deterministic
    // @ts-ignore
    Date.now = jest.fn(() => FIXED_NOW);

    approveRequestMock = jest.fn<boolean, [ResourceRequest]>();
    // Minimal mock that satisfies the shape of SacredKeyComptroller
    mockComptroller = {
      approveRequest: approveRequestMock as any,
    } as unknown as SacredKeyComptroller;

    // Use modern fake timers to control setTimeout
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout'); // to assert timing usage

    // Silence real console output while enabling assertions
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore timers and mocks
    jest.useRealTimers();
    (console.log as jest.Mock).mockRestore();
    (console.error as jest.Mock).mockRestore();
    (setTimeout as unknown as jest.SpyInstance).mockRestore?.();
    // @ts-ignore
    Date.now = originalNow;
    jest.clearAllMocks();
  });

  it('constructs a deterministic id using Date.now', () => {
    const binder = new GenesisBinder(mockComptroller);
    expect(binder.id).toBe(`GenesisBinder-${FIXED_NOW}`);
  });

  it('sends a correct ResourceRequest to the comptroller', async () => {
    approveRequestMock.mockReturnValue(true);
    const binder = new GenesisBinder(mockComptroller);

    const blueprint = 'Alpha-Blueprint';
    const execPromise = binder.execute({ blueprint });

    // The implementation awaits a 200ms delay when approved; fast-forward it
    expect(setTimeout).toHaveBeenCalledTimes(1);
    // Verify that the scheduled delay is 200ms
    const timeoutArgs = (setTimeout as jest.Mock).mock.calls[0];
    expect(typeof timeoutArgs[0]).toBe('function');
    expect(timeoutArgs[1]).toBe(200);

    // Fast-forward timers to resolve the internal Promise
    jest.advanceTimersByTime(200);
    await execPromise;

    // Assert approveRequest was called once with the expected payload
    expect(approveRequestMock).toHaveBeenCalledTimes(1);
    const requestArg = approveRequestMock.mock.calls[0][0];
    expect(requestArg).toEqual({
      requesterId: binder.id,
      resourceType: 'token',
      amount: 50,
      purpose: `Weave and bind blueprint: ${blueprint}`,
    } satisfies ResourceRequest);
  });

  it('on approval=true, logs weaving start and completion with the correct id and blueprint', async () => {
    approveRequestMock.mockReturnValue(true);
    const binder = new GenesisBinder(mockComptroller);

    const blueprint = 'Omega';
    const promise = binder.execute({ blueprint });

    // Should schedule the 200ms delay and then log completion
    expect(setTimeout).toHaveBeenCalledTimes(1);
    // At this point, start log should already have been emitted
    expect(console.log).toHaveBeenCalledWith(
      `[${binder.id}] Weaving from blueprint: "${blueprint}"`
    );

    jest.advanceTimersByTime(200);
    await promise;

    // Completion log
    expect(console.log).toHaveBeenCalledWith(
      `[${binder.id}] Weaving complete.`
    );
    // Ensure no error logs when approved
    expect(console.error).not.toHaveBeenCalled();
  });

  it('on approval=false, logs an error and does not log success messages or wait', async () => {
    approveRequestMock.mockReturnValue(false);
    const binder = new GenesisBinder(mockComptroller);

    await binder.execute({ blueprint: 'Denied-One' });

    // Should not schedule a setTimeout since it early-returns on denial
    expect(setTimeout).not.toHaveBeenCalled();

    // Error should be logged
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      `[${binder.id}] Resource request denied. Task aborted.`
    );

    // No success logs
    expect(console.log).not.toHaveBeenCalledWith(
      expect.stringContaining('Weaving from blueprint')
    );
    expect(console.log).not.toHaveBeenCalledWith(
      expect.stringContaining('Weaving complete')
    );
  });

  it('handles an empty blueprint string (edge case) by still forming a valid purpose', async () => {
    approveRequestMock.mockReturnValue(true);
    const binder = new GenesisBinder(mockComptroller);

    const exec = binder.execute({ blueprint: '' });

    // Verify request constructed even with empty blueprint
    expect(approveRequestMock).toHaveBeenCalledTimes(1);
    const req = approveRequestMock.mock.calls[0][0];
    expect(req.purpose).toBe('Weave and bind blueprint: ');

    jest.advanceTimersByTime(200);
    await exec;

    // Logs still occur
    expect(console.log).toHaveBeenCalledWith(
      `[${binder.id}] Weaving from blueprint: ""`
    );
    expect(console.log).toHaveBeenCalledWith(
      `[${binder.id}] Weaving complete.`
    );
  });

  it('supports very long blueprint strings without truncation or errors', async () => {
    approveRequestMock.mockReturnValue(true);
    const binder = new GenesisBinder(mockComptroller);

    const longBlueprint = 'X'.repeat(5000);
    const exec = binder.execute({ blueprint: longBlueprint });

    expect(approveRequestMock).toHaveBeenCalledTimes(1);
    const req = approveRequestMock.mock.calls[0][0];
    expect(req.purpose).toBe(`Weave and bind blueprint: ${longBlueprint}`);

    jest.advanceTimersByTime(200);
    await exec;

    expect(console.log).toHaveBeenCalledWith(
      `[${binder.id}] Weaving from blueprint: "${longBlueprint}"`
    );
    expect(console.log).toHaveBeenCalledWith(
      `[${binder.id}] Weaving complete.`
    );
  });

  it('gracefully handles being called with an object missing the blueprint property at runtime', async () => {
    // Although TypeScript types should prevent this, runtime misuse can happen.
    approveRequestMock.mockReturnValue(true);
    const binder = new GenesisBinder(mockComptroller);

    // @ts-expect-error intentional misuse for runtime robustness
    const exec = binder.execute({} as any);

    // It will likely construct "undefined" in the purpose and logs; verify no crash
    expect(approveRequestMock).toHaveBeenCalledTimes(1);
    const req = approveRequestMock.mock.calls[0][0];
    expect(req.purpose).toBe('Weave and bind blueprint: undefined');

    jest.advanceTimersByTime(200);
    await exec;

    expect(console.log).toHaveBeenCalledWith(
      `[${binder.id}] Weaving from blueprint: "undefined"`
    );
    expect(console.log).toHaveBeenCalledWith(
      `[${binder.id}] Weaving complete.`
    );
  });
});
import { OmniKey } from './interfaces';
import { StrategicConcord } from './strategic-concord';

/**
 * Represents the Prime Architect, the absolute will and single core of the system.
 * Implemented as a singleton to ensure a single source of truth and authority.
 */
export class PrimeArchitect {
  private static instance: PrimeArchitect;
  public readonly omniKey: OmniKey;

  private constructor() {
    this.omniKey = { id: "OmniKey-" + Date.now() };
  }

  /**
   * Retrieves the single instance of the Prime Architect.
   */
  public static getInstance(): PrimeArchitect {
    if (!PrimeArchitect.instance) {
      PrimeArchitect.instance = new PrimeArchitect();
    }
    return PrimeArchitect.instance;
  }

  /**
   * Issues a divine edict, which materializes as a StrategicConcord.
   * This defines the core mission for a given operational cycle.
   * @param purpose The high-level purpose of the edict.
   * @returns A new StrategicConcord instance.
   */
  public issueDivineEdict(purpose: string): StrategicConcord {
    return new StrategicConcord(this, purpose);
  }
}

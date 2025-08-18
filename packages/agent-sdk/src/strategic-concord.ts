import { Edict } from './interfaces';
import { PrimeArchitect } from './prime-architect';

/**
 * Represents the Strategic Concord, the immutable "Genesis Edict" for an operational cycle.
 * It is created by the Prime Architect and serves as the ultimate source of truth for the
 * SacredKeyComptroller.
 */
export class StrategicConcord implements Edict {
  public readonly source: PrimeArchitect;
  public readonly content: string;
  public readonly creationTimestamp: number;

  constructor(source: PrimeArchitect, content: string) {
    this.source = source;
    this.content = content;
    this.creationTimestamp = Date.now();
  }

  /**
   * Validates that this edict was issued by the one true Prime Architect.
   * @param architect The instance of the Prime Architect to validate against.
   * @returns True if the edict is valid, false otherwise.
   */
  public isValid(architect: PrimeArchitect): boolean {
    return this.source.omniKey.id === architect.omniKey.id;
  }
}

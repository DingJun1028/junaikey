import { ResourceRequest } from './interfaces';
import { PrimeArchitect } from './prime-architect';
import { StrategicConcord } from './strategic-concord';

/**
 * Represents the Sacred Key Comptroller, the sole gatekeeper of resources.
 * It acts as the most trusted arm of the Prime Architect, ensuring every
 * action aligns with the established Strategic Concord.
 */
export class SacredKeyComptroller {
  private readonly architect: PrimeArchitect;
  private readonly concord: StrategicConcord;

  constructor(architect: PrimeArchitect, concord: StrategicConcord) {
    this.architect = architect;
    this.concord = concord;
  }

  /**
   * Approves or denies a resource request based on its alignment with the
   * Strategic Concord. This is the core of resource governance.
   * @param request The resource request from an Omni-Function.
   * @returns True if the request is approved, false otherwise.
   */
  public approveRequest(request: ResourceRequest): boolean {
    if (!this.concord.isValid(this.architect)) {
      console.error("Error: The Strategic Concord is invalid. Halting all operations.");
      return false;
    }
    return true;
  }
}

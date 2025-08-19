import { OmniFunction, ResourceRequest } from '../interfaces';
import { SacredKeyComptroller } from '../sacred-key-comptroller';

/**
 * Represents the Strategic Purifier, a composite Omni-Function.
 */
export class StrategicPurifier implements OmniFunction {
  public readonly id: string;
  private comptroller: SacredKeyComptroller;

  constructor(comptroller: SacredKeyComptroller) {
    this.id = "StrategicPurifier-" + Date.now();
    this.comptroller = comptroller;
  }

  async execute(task: { purpose: string }): Promise<void> {
    const request: ResourceRequest = {
      requesterId: this.id,
      resourceType: 'compute',
      amount: 10,
      purpose: `Execute purification task: ${task.purpose}`
    };

    if (this.comptroller.approveRequest(request)) {
      console.log(`[${this.id}] Executing purification: "${task.purpose}"`);
      await new Promise(res => setTimeout(res, 100));
      console.log(`[${this.id}] Purification task completed.`);
    } else {
      console.error(`[${this.id}] Resource request denied. Task aborted.`);
    }
  }
}

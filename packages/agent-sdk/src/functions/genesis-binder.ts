import { OmniFunction, ResourceRequest } from '../interfaces';
import { SacredKeyComptroller } from '../sacred-key-comptroller';

/**
 * Represents the Genesis Binder, a composite Omni-Function.
 */
export class GenesisBinder implements OmniFunction {
  public readonly id: string;
  private comptroller: SacredKeyComptroller;

  constructor(comptroller: SacredKeyComptroller) {
    this.id = "GenesisBinder-" + Date.now();
    this.comptroller = comptroller;
  }

  async execute(task: { blueprint: string }): Promise<void> {
    const request: ResourceRequest = {
      requesterId: this.id,
      resourceType: 'token',
      amount: 50,
      purpose: `Weave and bind blueprint: ${task.blueprint}`
    };

    if (this.comptroller.approveRequest(request)) {
      console.log(`[${this.id}] Weaving from blueprint: "${task.blueprint}"`);
      await new Promise(res => setTimeout(res, 200));
      console.log(`[${this.id}] Weaving complete.`);
    } else {
      console.error(`[${this.id}] Resource request denied. Task aborted.`);
    }
  }
}

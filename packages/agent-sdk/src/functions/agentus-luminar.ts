import { OmniFunction, ResourceRequest } from '../interfaces';
import { SacredKeyComptroller } from '../sacred-key-comptroller';

/**
 * Represents the Agentus Luminar, a composite Omni-Function.
 */
export class AgentusLuminar implements OmniFunction {
  public readonly id: string;
  private comptroller: SacredKeyComptroller;

  constructor(comptroller: SacredKeyComptroller) {
    this.id = "AgentusLuminar-" + Date.now();
    this.comptroller = comptroller;
  }

  async execute(task: { agentTask: string }): Promise<string> {
    const request: ResourceRequest = {
      requesterId: this.id,
      resourceType: 'compute',
      amount: 25,
      purpose: `Agent task and reporting: ${task.agentTask}`
    };

    if (this.comptroller.approveRequest(request)) {
      console.log(`[${this.id}] Executing agent task: "${task.agentTask}"`);
      await new Promise(res => setTimeout(res, 150));
      const result = `Task "${task.agentTask}" was completed successfully.`;
      console.log(`[${this.id}] Task result documented.`);
      return result;
    } else {
      const errorMessage = `[${this.id}] Resource request denied. Task aborted.`;
      console.error(errorMessage);
      return errorMessage;
    }
  }
}

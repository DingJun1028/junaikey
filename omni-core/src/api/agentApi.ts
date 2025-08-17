// This file will contain specific agent-calling functions.
import { callAgent } from './firebaseRuneSystem';

export const createBlueprint = (blueprintName: string, initialData: any) => {
  return callAgent('genesisWeaver', { blueprintName, initialData });
};

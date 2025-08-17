import { getFunctions, httpsCallable } from 'firebase/functions';

// This is a placeholder for your firebase initialization
const functions = getFunctions();

export const callAgent = async (agentName: string, payload: any) => {
    const callable = httpsCallable(functions, agentName);
    try {
        const result = await callable(payload);
        return result.data;
    } catch (error) {
        console.error(`Error calling agent ${agentName}:`, error);
        throw error;
    }
};

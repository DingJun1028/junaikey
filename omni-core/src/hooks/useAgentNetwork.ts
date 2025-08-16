import { useState } from 'react';
import { callAgent } from '../api/firebaseRuneSystem';

/**
 * A placeholder hook for interacting with the Agent Network (Firebase Cloud Functions).
 */
export const useAgentNetwork = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const runAgent = async (agentName: string, payload: any) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await callAgent(agentName, payload);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { runAgent, loading, error, data };
};

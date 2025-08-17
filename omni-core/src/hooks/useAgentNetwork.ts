import { useState } from 'react';
import { callAgent } from '../api/firebaseRuneSystem';

type AgentStatus = 'idle' | 'loading' | 'success' | 'error';

const useAgentNetwork = () => {
  const [status, setStatus] = useState<AgentStatus>('idle');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const invoke = async (agentName: string, payload: any) => {
    setStatus('loading');
    setData(null);
    setError(null);
    try {
      const result = await callAgent(agentName, payload);
      setData(result);
      setStatus('success');
      return result;
    } catch (err) {
      setError(err);
      setStatus('error');
      throw err;
    }
  };

  return { status, data, error, invoke };
};

export default useAgentNetwork;

import React from 'react';
import useAgentNetwork from '../hooks/useAgentNetwork';

const ProjectBlueprint: React.FC = () => {
  const { status, invoke, data } = useAgentNetwork();

  const handleCreateBlueprint = () => {
    invoke('genesisWeaver', {
      blueprintName: 'New World',
      initialData: { created: true }
    });
  };

  return (
    <div>
      <h1>Project Blueprint</h1>
      <button onClick={handleCreateBlueprint} disabled={status === 'loading'}>
        {status === 'loading' ? 'Weaving...' : 'Invoke Genesis Weaver'}
      </button>
      {status === 'success' && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {status === 'error' && <p>Error creating blueprint.</p>}
    </div>
  );
};

export default ProjectBlueprint;

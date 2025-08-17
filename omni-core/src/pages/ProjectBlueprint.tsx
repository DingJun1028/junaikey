import React, { useState } from 'react';
import { useAgentNetwork } from '../hooks/useAgentNetwork';

/**
 * Placeholder for a page that allows creating a new project blueprint
 * by calling the genesisWeaver agent.
 */
const ProjectBlueprint: React.FC = () => {
  const [blueprintName, setBlueprintName] = useState('');
  const { runAgent, loading, error, data } = useAgentNetwork();

  const handleCreateBlueprint = () => {
    if (!blueprintName) {
      alert('Please enter a blueprint name.');
      return;
    }
    const payload = {
      blueprintName,
      initialData: {
        createdAt: new Date().toISOString(),
        status: 'new',
        version: '1.0',
      },
    };
    runAgent('genesisWeaver', payload);
  };

  return (
    <div>
      <h1>Create a New Project Blueprint</h1>
      <input
        type="text"
        value={blueprintName}
        onChange={(e) => setBlueprintName(e.target.value)}
        placeholder="Enter Blueprint Name"
        style={{ padding: '8px', marginRight: '8px' }}
      />
      <button onClick={handleCreateBlueprint} disabled={loading}>
        {loading ? 'Creating...' : 'Invoke GenesisWeaver'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && <p style={{ color: 'green' }}>Success: {JSON.stringify(data)}</p>}
    </div>
  );
};

export default ProjectBlueprint;

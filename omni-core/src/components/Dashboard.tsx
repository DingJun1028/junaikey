import React from 'react';
import Card from './Card';

/**
 * A placeholder for the main dashboard component.
 * It will orchestrate other components and display key information.
 */
const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Omni-Core Dashboard</h1>
      <Card title="System Status">
        <p>All systems operational.</p>
      </Card>
      <Card title="Agents">
        <p>GenesisWeaver is online.</p>
      </Card>
    </div>
  );
};

export default Dashboard;

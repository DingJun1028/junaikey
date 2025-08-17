import React from 'react';
import Card from './Card';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Card title="Blueprint 1" />
      <Card title="Event Card" />
    </div>
  );
};

export default Dashboard;

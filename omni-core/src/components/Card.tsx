import React from 'react';

const Card: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '8px' }}>
      <h2>{title}</h2>
      <p>This is a card component.</p>
    </div>
  );
};

export default Card;

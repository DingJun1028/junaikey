import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

/**
 * A simple reusable Card component for the UI.
 */
const Card: React.FC<CardProps> = ({ title, children }) => {
  const cardStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  return (
    <div style={cardStyle}>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default Card;

import React from 'react';

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
}

export function CodeBlock({ children, language }: CodeBlockProps) {
  return (
    <pre className="p-4 rounded-md bg-muted text-muted-foreground overflow-x-auto">
      <code className={`language-${language}`}>{children}</code>
    </pre>
  );
}

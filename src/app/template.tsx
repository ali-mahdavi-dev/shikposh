import React from 'react';

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return <div className="min-h-screen">{children}</div>;
}

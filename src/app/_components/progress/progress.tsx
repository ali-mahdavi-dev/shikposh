"use client";
import React from 'react';

export type ProgressProps = {
  value: number; // 0-100
  className?: string;
};

export const Progress: React.FC<ProgressProps> = ({ value, className }) => {
  const safe = Math.max(0, Math.min(100, value ?? 0));
  return (
    <div className={"h-2 w-full overflow-hidden rounded bg-muted " + (className || "")}> 
      <div
        className="h-full bg-primary transition-all"
        style={{ width: `${safe}%` }}
      />
    </div>
  );
};

export default Progress;


import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className = '', children, ...props }: CardProps) {
  const baseStyles = 'rounded-lg bg-white p-4 shadow-sm dark:bg-slate-800';

  const combinedClassName = `${baseStyles} ${className}`.trim();

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
}

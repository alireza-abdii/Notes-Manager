import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const baseStyles = 'rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200';

  const variantStyles = {
    primary: 'bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700',
    secondary:
      'bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}

import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className = '', ...props }: TextareaProps) {
  const baseStyles =
    'block w-full rounded-md border border-amber-200 bg-white px-3 py-2 text-amber-900 shadow-sm placeholder:text-amber-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:ring-slate-500';

  const combinedClassName = `${baseStyles} ${className}`.trim();

  return <textarea className={combinedClassName} {...props} />;
}

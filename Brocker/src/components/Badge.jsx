import React from 'react';

export default function Badge({ children, type = 'info', className = '' }) {
  const types = {
    info: 'bg-blue-500/20 text-blue-400',
    success: 'bg-green-500/20 text-green-400',
    warning: 'bg-yellow-500/20 text-yellow-400',
    danger: 'bg-red-500/20 text-red-400',
    neutral: 'bg-slate-500/20 text-slate-400',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${types[type]} ${className}`}>
      {children}
    </span>
  );
}

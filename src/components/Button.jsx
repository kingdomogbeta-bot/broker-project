import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  to, // internal SPA navigation key
  href, // external link
  target, // link target
  ...props 
}) {
  const baseStyles = 'font-semibold rounded-lg transition-all transform hover:scale-105 disabled:hover:scale-100';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white',
    secondary: 'border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    ghost: 'text-slate-300 hover:text-white hover:bg-slate-700/50',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const handleClick = (e) => {
    if (props.onClick) props.onClick(e);
    if (to) {
      window.dispatchEvent(new CustomEvent('app:navigate', { detail: to }));
    } else if (href) {
      if (target === '_blank') window.open(href, '_blank');
      else window.location.href = href;
    }
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

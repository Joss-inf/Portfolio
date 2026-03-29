import React from 'react';

interface CompactLinkProps {
  href?: string;
  icon: React.ReactNode;
  label: string;
}

export const CompactLink: React.FC<CompactLinkProps> = ({ href, icon, label }) => {
  const baseClasses = "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border select-none";
  
  if (href) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`${baseClasses} bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white border-transparent hover:bg-gray-200 dark:hover:bg-white/20 hover:scale-105 active:scale-95 cursor-pointer`}
      >
        {React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 14 })}
        {label}
      </a>
    );
  } else {
    return (
      <div className={`${baseClasses} bg-transparent border-gray-200 dark:border-white/5 text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-60`}>
        {React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 14 })}
        {label}
      </div>
    );
  }
};
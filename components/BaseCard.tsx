import React from 'react';

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const BaseCard: React.FC<BaseCardProps> = ({ children, className = '', onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white dark:bg-[#1C1C1E] rounded-2xl shadow-sm transition-colors duration-300 ${className}`}
  >
    {children}
  </div>
);
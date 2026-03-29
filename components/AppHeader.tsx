import React from 'react';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  rightContent?: React.ReactNode; // New prop for right-aligned content
}

export const AppHeader: React.FC<AppHeaderProps> = ({ title, subtitle, children, rightContent }) => (
  <div className="pl-6 pr-4 py-4 mt-14 mb-5 max-w-3xl rounded-3xl shadow-sm mx-auto bg-white dark:bg-[#1C1C1E]">
    <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h1>
    <div className="flex justify-between items-center mt-2"> {/* New flex row for subtitle & rightContent */}
      {subtitle && <p className="text-gray-500 dark:text-gray-400 font-medium">{subtitle}</p>}
      {rightContent}
    </div>
    {children}
  </div>
);
import React from 'react';

interface SectionTitleProps {
  title: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2 px-4">
    {title}
  </h2>
);
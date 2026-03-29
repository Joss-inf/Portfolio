import React from 'react';
import { BaseCard } from './BaseCard';
import { SkillCategory } from '../types';

interface SkillCategoryCardProps {
  category: SkillCategory;
}

export const SkillCategoryCard: React.FC<SkillCategoryCardProps> = ({ category }) => {
  return (
    <BaseCard className="p-5">
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-10 h-10 rounded-xl ${category.color} flex items-center justify-center shadow-sm flex-shrink-0`}>
          {category.icon}
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{category.title}</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{category.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 ml-[56px]">
        {category.skills.map((skill) => (
          <span 
            key={skill}
            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </BaseCard>
  );
};
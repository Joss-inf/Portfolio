import React from 'react';
import { Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import { LifeEvent } from '../types';
import { BaseCard } from './BaseCard';

export const LifeEventCard: React.FC<{ event: LifeEvent }> = ({ event }) => {
  const getIcon = (type: LifeEvent['type']) => {
    switch (type) {
      case 'education': return <GraduationCap size={18} className="text-blue-500" />;
      case 'work': return <Briefcase size={18} className="text-green-500" />;
      case 'milestone': return <Sparkles size={18} className="text-purple-500" />;
      default: return null;
    }
  };

  return (
    <div className="relative pl-10 pb-8 last:pb-0">
      <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
      <div className="absolute left-0 -translate-x-1/2 top-0 mt-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#1C1C1E] flex items-center justify-center border-2 border-ios-primary shadow-sm">
        {getIcon(event.type)}
      </div>
      <BaseCard className="ml-2 relative p-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-1">{event.year}</p>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{event.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{event.description}</p>
      </BaseCard>
    </div>
  );
};
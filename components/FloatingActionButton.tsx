import React from 'react';

interface FloatingActionButtonProps {
  onClick: () => void;
  'aria-label': string;
  icon: React.ReactNode;
  badgeCount?: number;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick, 'aria-label': ariaLabel, icon, badgeCount }) => {
  return (
    <div className="fixed bottom-24 right-6 md:bottom-12 md:right-12 z-50">
      <button
        onClick={onClick}
        className="relative flex items-center justify-center p-4 bg-black/60 backdrop-blur-md rounded-full shadow-2xl text-white transition-all active:scale-95 hover:brightness-110"
        aria-label={ariaLabel}
      >
        {icon}
        {badgeCount !== undefined && badgeCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center text-xs font-bold bg-red-500 text-white rounded-full border-2 border-white dark:border-[#1C1C1E]">
            {badgeCount}
          </span>
        )}
      </button>
    </div>
  );
};

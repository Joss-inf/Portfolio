import React from 'react';

interface AppIconProps {
  name: string;
  icon: React.ReactNode;
  colorClass: string;
  onClick: () => void;
}

export const AppIcon: React.FC<AppIconProps> = ({ name, icon, colorClass, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center gap-2 group transition-transform active:scale-90 focus:outline-none"
    >
      <div className={`${colorClass} w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-lg group-hover:brightness-110 transition-all relative overflow-hidden`}>
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
        {icon}
      </div>
      <span className="text-xs md:text-sm font-medium text-white drop-shadow-md">{name}</span>
    </button>
  );
};
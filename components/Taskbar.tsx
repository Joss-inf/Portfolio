import React from 'react';
import { AppDefinition, AppID } from '../types';
import { ChevronDown } from 'lucide-react';

interface TaskbarProps {
  apps: AppDefinition[];
  activeApp: AppID | null;
  runningApps: AppID[];
  onSwitch: (id: AppID) => void;
  isMinimized: boolean;
  setIsMinimized: (minimized: boolean) => void;
  appIsClosing: boolean;
}

export const Taskbar = React.memo<TaskbarProps>(({ apps, activeApp, runningApps, onSwitch, isMinimized, setIsMinimized, appIsClosing }) => {
  const visualIsMinimized = appIsClosing || isMinimized;
  const showMinimizedPill = isMinimized && !!activeApp;

  return (
    <>
      {showMinimizedPill && (
        <div
          className={`
            fixed bottom-2 left-0 right-0 z-[69] flex justify-center pointer-events-none 
            transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] 
            ${showMinimizedPill ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}
        >
          <div
            onClick={() => setIsMinimized(false)}
            className="pointer-events-auto cursor-pointer bg-black/40 border border-white/10 px-10 py-1.5 rounded-full shadow-lg hover:bg-black/60 transition-colors group transform-gpu will-change-transform"
          >
            <div className="w-12 h-1 bg-white/40 rounded-full group-hover:bg-white/80 transition-colors shadow-sm" />
          </div>
        </div>
      )}

      <div className={`
        fixed bottom-8 left-0 right-0 z-[70] flex justify-center pointer-events-none 
        transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] transform-gpu will-change-transform 
        ${visualIsMinimized ? 'translate-y-[200%]' : 'translate-y-0 opacity-100'}
      `}>
        <div className="pointer-events-auto origin-bottom transform-gpu will-change-transform relative max-w-[90vw] md:max-w-3xl mx-auto">
          <div className="absolute inset-0 backdrop-blur-2xl bg-black/20 border border-white/20 rounded-[2.5rem] shadow-2xl transform translate-z-0" />

          <div className="flex items-center gap-3 px-4 py-3 relative z-10 animate-[dock-bounce_0.5s_ease-out] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {apps.map((app) => {
              const isActive = activeApp === app.id;
              const isRunning = runningApps.includes(app.id);

              return (
                <button
                  key={app.id}
                  onClick={() => onSwitch(app.id)}
                  className={`
                    relative group flex flex-col items-center justify-center transition-all duration-300 ease-out flex-shrink-0
                    ${isActive ? '-translate-y-2' : 'hover:-translate-y-1 hover:scale-110'}
                  `}
                >
                  <div className={`
                    ${app.iconColor} w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 
                    ${isActive ? 'ring-2 ring-white ring-offset-2 ring-offset-black/20' : 'opacity-90 hover:opacity-100'}
                  `}>
                    {React.cloneElement(app.icon as React.ReactElement<{ className?: string }>, { className: "text-white w-5 h-5" })}
                  </div>

                  {isRunning && !isActive && (
                    <div className="absolute -bottom-2 w-1 h-1 bg-white/60 rounded-full" />
                  )}

                  {isActive && (
                    <div className="absolute -bottom-3 w-8 h-1 bg-white/20 rounded-full blur-sm" />
                  )}

                  <span className={`
                    absolute -top-10 bg-gray-900/90 text-white text-[10px] font-medium px-2 py-1 rounded-md 
                    opacity-0 transition-opacity pointer-events-none whitespace-nowrap backdrop-blur-sm 
                    ${isActive ? 'hidden' : 'group-hover:opacity-100'}
                  `}>
                    {app.name}
                  </span>
                </button>
              );
            })}

            <div className="w-[1px] h-8 bg-white/10 mx-1 flex-shrink-0" />

            <button
              onClick={() => setIsMinimized(true)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-white/50 hover:text-white transition-colors active:scale-90 flex-shrink-0"
              title="Hide Taskbar"
            >
              <ChevronDown size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

Taskbar.displayName = 'Taskbar';
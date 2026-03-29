import React from 'react';
import { AppDefinition } from '../types';

interface DockProps {
  apps: AppDefinition[];
  onOpenApp: (id: string) => void;
}

export const Dock = React.memo<DockProps>(({ apps, onOpenApp }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 backdrop-blur-2xl bg-white/20 border border-white/20 rounded-[2.5rem] transform translate-z-0" />
      
      <div className="p-2 rounded-[2.5rem] flex items-end gap-3 shadow-2xl relative z-10">
        {apps.map((app) => (
          <div key={app.id} className="hover:-translate-y-2 transition-transform duration-300 ease-out">
            <button 
              onClick={() => onOpenApp(app.id)}
              className="group transition-transform active:scale-90 focus:outline-none"
            >
              <div className={`${app.iconColor} w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden`}>
                {React.isValidElement(app.icon) 
                  ? React.cloneElement(app.icon as React.ReactElement<any>, { className: "text-white w-6 h-6" })
                  : app.icon
                }
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

Dock.displayName = 'Dock';
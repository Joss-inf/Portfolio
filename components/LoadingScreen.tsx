import React from 'react';
import { Command } from 'lucide-react';

interface LoadingScreenProps {
  loadingState: 'initial' | 'fading' | 'complete';
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ loadingState }) => {
  if (loadingState === 'complete') return null;
  
  return (
    <div 
      className={`
        fixed inset-0 z-[9999] bg-black flex items-center justify-center
        transition-opacity duration-700 ease-out
        ${loadingState === 'fading' ? 'opacity-0' : 'opacity-100'}
      `}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
           <div className="w-20 h-20 bg-white rounded-[22px] flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.3)] animate-[pulse_3s_ease-in-out_infinite]">
              <Command size={40} className="text-black" />
           </div>
        </div>
      </div>
    </div>
  );
};
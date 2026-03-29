import React, { useEffect, useCallback, useRef } from 'react';
import { X } from 'lucide-react';
import { AppID } from '../types';

interface WindowProps {
  isOpen: boolean;
  onCloseInitiated: () => void;
  onCloseAnimationComplete: () => void;
  currentAppId: AppID | null;
  previousAppId: AppID | null;
  isSwitchingApp: boolean;
  slideDirection: 'left' | 'right' | null;
  renderAppContent: (id: AppID, isActiveAndSettled: boolean) => React.ReactNode;
  onAppSwitchAnimationComplete: () => void;
}

export const Window: React.FC<WindowProps> = ({ 
  isOpen, 
  onCloseInitiated, 
  onCloseAnimationComplete,
  currentAppId,
  previousAppId,
  isSwitchingApp,
  slideDirection,
  renderAppContent,
  onAppSwitchAnimationComplete,
}) => {
  const closeTimerRef = useRef<number | null>(null);
  const switchTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      
      closeTimerRef.current = window.setTimeout(() => {
        onCloseAnimationComplete();
      }, 70);
    } else {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    }
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, [isOpen, onCloseAnimationComplete]);

  useEffect(() => {
    if (isSwitchingApp) {
      switchTimerRef.current = window.setTimeout(() => {
        onAppSwitchAnimationComplete();
      }, 300);
    } else {
      if (switchTimerRef.current) {
        window.clearTimeout(switchTimerRef.current);
        switchTimerRef.current = null;
      }
    }
    return () => {
      if (switchTimerRef.current) {
        window.clearTimeout(switchTimerRef.current);
      }
    };
  }, [isSwitchingApp, onAppSwitchAnimationComplete]);

  const handleCloseClick = useCallback(() => {
    onCloseInitiated();
  }, [onCloseInitiated]);

  const getIncomingAnimationClass = () => {
    if (!isSwitchingApp || !slideDirection) return '';
    return slideDirection === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left';
  };

  const getOutgoingAnimationClass = () => {
    if (!isSwitchingApp || !slideDirection) return '';
    return slideDirection === 'right' ? 'animate-slide-out-left' : 'animate-slide-out-right';
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col bg-black will-change-transform-opacity ${isOpen ? 'animate-app-open' : 'animate-app-close'}`}>
      <div 
        className="h-6 bg-transparent w-full flex justify-center items-center cursor-pointer absolute top-0 z-[60] md:hidden"
        onClick={handleCloseClick}
      >
        <div className="w-16 h-1.5 bg-gray-300/50 rounded-full backdrop-blur-sm" />
      </div>

      {/* App Content Container with Dark Mode Support */}
      <div className="flex-1 relative overflow-hidden bg-white dark:bg-black md:rounded-t-none transition-colors duration-300">
        {isSwitchingApp && previousAppId && (
          <div className={`absolute inset-0 ${getOutgoingAnimationClass()} will-change-transform-opacity`}>
            {renderAppContent(previousAppId, false)}
          </div>
        )}

        {currentAppId && (
          <div className={`absolute inset-0 ${isSwitchingApp ? getIncomingAnimationClass() + ' z-10' : ''} will-change-transform-opacity`}>
           <button 
        onClick={handleCloseClick}
        className="absolute top-12 right-6 z-[60] bg-gray-200/50 hover:bg-gray-300/80 backdrop-blur-md text-black w-8 h-8 rounded-full flex items-center justify-center shadow-sm"
      >
        <X size={16} />
      </button>
            {renderAppContent(currentAppId, !isSwitchingApp)}
          </div>
        )}
      </div>
      
    </div>
  );
};
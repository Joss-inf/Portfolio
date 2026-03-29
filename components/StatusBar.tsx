import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal, Grid, User, Code2, Mail, Image, Settings } from 'lucide-react'; // Import Settings icon
import { AppID } from '../types';

interface StatusBarProps {
  currentApp: AppID | null;
}

export const StatusBar: React.FC<StatusBarProps> = ({ currentApp }) => {
  const [time, setTime] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Collapse when app changes or closes
  useEffect(() => {
    setIsExpanded(false);
  }, [currentApp]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).replace(' ', '');
  };

  const getIslandData = () => {
    if (!currentApp) return null;
    switch (currentApp) {
      case AppID.PROJECTS: return { icon: <Grid size={14} className="text-blue-400" />, label: 'Projects', sub: 'Gallery View' };
      case AppID.ABOUT: return { icon: <User size={14} className="text-yellow-400" />, label: 'About', sub: 'Profile' };
      case AppID.SKILLS: return { icon: <Code2 size={14} className="text-purple-400" />, label: 'Skills', sub: 'Technical Stack' };
      case AppID.CONTACT: return { icon: <Mail size={14} className="text-gray-400" />, label: 'Contact', sub: 'Get in touch' };
      case AppID.GALLERY: return { icon: <Image size={14} className="text-pink-400" />, label: 'Gallery', sub: 'Image Collection' };
      case AppID.SETTINGS: return { icon: <Settings size={14} className="text-gray-400" />, label: 'Settings', sub: 'Preferences' }; // New Case
      default: return null;
    }
  };

  const islandData = getIslandData();
  const isAppOpen = !!currentApp; // Check if any app is currently open

  return (
    <>
      {/* Status Bar Info (Time, Battery) - Blended with background */}
      <div className="fixed top-0 left-0 right-0 h-12 px-6 flex justify-between items-center z-[900] text-white text-sm font-medium pointer-events-none mix-blend-difference">
        {/* Time - Adjust width and font size based on app open state */}
        <div className={`pl-2 flex items-center justify-center transition-all duration-300 ${isAppOpen ? 'w-10' : 'w-20'}`}>
          <span className={`text-center transition-all duration-300 ${isAppOpen ? 'text-[10px]' : 'text-sm'}`}>
            {formatTime(time)}
          </span>
        </div>
        {/* Icons - Adjust width based on app open state */}
        <div className={`flex items-center gap-2 justify-end pr-2 transition-all duration-300 ${isAppOpen ? 'w-14' : 'w-20'}`}>
          <Signal size={16} />
          <Wifi size={16} />
          <Battery size={20} />
        </div>
      </div>

      {/* Dynamic Island - Solid Black, Interactive */}
      <div className="fixed top-0 left-0 right-0 h-0 flex justify-center z-[950]">
        <div 
          className={`
            bg-black shadow-2xl transform transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] relative overflow-hidden will-change-transform-opacity
            ${isExpanded ? 'w-[340px] h-[100px] rounded-[32px] translate-y-2' : 
              islandData ? 'w-[160px] h-[30px] rounded-[15px] translate-y-2 cursor-pointer hover:scale-[1.02]' : 
              'w-28 h-7 rounded-full translate-y-2'}
          `}
          onClick={() => islandData && setIsExpanded(!isExpanded)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {/* Content Wrapper */}
          <div className="w-full h-full relative">
            
            {/* Compact View (Visible when Active but Not Expanded) */}
            <div className={`
              absolute inset-0 flex items-center justify-between px-3 transition-all duration-300
              ${islandData && !isExpanded ? 'opacity-100 delay-100 scale-100 blur-0' : 'opacity-0 pointer-events-none scale-95 blur-sm'}
            `}>
              <div className="flex items-center gap-2">
                <span className="transition-transform duration-300 scale-100">{islandData?.icon}</span>
                <span className="text-[10px] font-semibold text-white/90 tracking-wide">{islandData?.label}</span>
              </div>
              {/* Activity Indicator */}
              <div className="flex items-center gap-1 h-full">
                 <div className="w-0.5 h-2.5 bg-green-400 rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
                 <div className="w-0.5 h-1.5 bg-green-400 rounded-full animate-[pulse_1.5s_ease-in-out_infinite] delay-75" />
                 <div className="w-0.5 h-3 bg-green-400 rounded-full animate-[pulse_1s_ease-in-out_infinite] delay-150" />
              </div>
            </div>

            {/* Expanded View */}
            <div className={`
              absolute inset-0 p-4 flex flex-col justify-between
              ${isExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
            `}>
              {/* Header */}
              <div className={`flex items-center justify-between text-white/60 text-xs font-medium transition-all duration-500 ease-out ${isExpanded ? 'translate-y-0 opacity-100 delay-100' : '-translate-y-4 opacity-0'}`}>
                <div className="flex items-center gap-2">
                  {islandData?.icon}
                  <span className="uppercase tracking-wide text-[10px]">Running</span>
                </div>
                <span className="text-white/40">Now</span>
              </div>
              
              {/* Main Content */}
              <div className="flex items-center justify-between mt-1">
                <div className={`transition-all duration-500 ease-out ${isExpanded ? 'translate-x-0 opacity-100 delay-200' : '-translate-x-4 opacity-0'}`}>
                   <h3 className="text-white font-bold text-lg leading-tight">{islandData?.label}</h3>
                   <p className="text-white/50 text-xs">{islandData?.sub}</p>
                </div>
                 {/* Animated Waveform */}
                 <div className={`flex gap-1 items-center justify-center h-8 w-12 transition-all duration-500 ease-out ${isExpanded ? 'scale-100 opacity-100 delay-300' : 'scale-50 opacity-0'}`}>
                    <div className="w-1.5 bg-white rounded-full animate-[bounce_1s_infinite] h-3" />
                    <div className="w-1.5 bg-white rounded-full animate-[bounce_1.2s_infinite] h-6" />
                    <div className="w-1.5 bg-white rounded-full animate-[bounce_0.8s_infinite] h-4" />
                    <div className="w-1.5 bg-white rounded-full animate-[bounce_1.1s_infinite] h-5" />
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
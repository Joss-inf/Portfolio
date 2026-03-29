import React, { useState } from 'react';
import { BaseCard } from './BaseCard';
import { PROFILE } from '../constants'
// NOTE: Local asset paths like '../assets/...' are not supported in this environment.
// To use your own image, upload it to an image hosting service (like Imgur) and paste the public URL here.
const avatar = PROFILE.avatar

export const ProfileHeader: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <BaseCard className="p-6 flex flex-col items-center text-center">
      {/* Image Container: Explicit w-32 h-32, shrink-0 to prevent flexing, overflow-hidden */}
      <div className="w-32 h-32 shrink-0 rounded-full bg-gray-200 dark:bg-gray-800 mb-4 overflow-hidden border-4 border-white dark:border-gray-700 shadow-sm relative z-0">
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton-wave" />
        )}
        <img 
          src= {avatar} 
          alt="Profile" 
          onLoad={() => setImageLoaded(true)}
          className={`
            w-full h-full object-cover object-center transition-opacity duration-500 ease-in-out
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
          `} 
        />
      </div>
      <h2 className="text-2xl font-bold">{PROFILE.name}</h2>
      <p className="text-ios-primary font-medium mb-4">{PROFILE.job}</p>
      <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{PROFILE.introduction}
      </p>
    </BaseCard>
  );
};
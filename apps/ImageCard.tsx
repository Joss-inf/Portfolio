import React, { useState } from 'react';
import { GalleryImage } from '../types';
import { ImageOff } from 'lucide-react';

interface ImageCardProps {
  image: GalleryImage;
  onClick: () => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div 
      className={`relative w-full aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm group transition-all ${!hasError ? 'cursor-pointer hover:shadow-md' : ''}`}
      onClick={!hasError ? onClick : undefined}
    >
      {/* Skeleton Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 skeleton-wave" />
      )}
      
      {/* Error State */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-4 text-center select-none bg-gray-100 dark:bg-gray-900">
          <ImageOff size={24} className="mb-2 opacity-50" />
          <span className="text-xs font-medium opacity-70">Could not load</span>
        </div>
      ) : (
        <>
          <img
            src={image.src}
            alt={image.caption || "Gallery image"}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setIsLoaded(true);
              setHasError(true);
            }}
            className={`
              w-full h-full object-cover object-center transition-all duration-700 ease-out
              ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-lg scale-105'}
            `}
          />
          {/* Caption Overlay */}
          {isLoaded && image.caption && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white text-xs font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
              {image.caption}
            </div>
          )}
        </>
      )}
    </div>
  );
};
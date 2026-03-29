import React, { useRef, useState, useEffect } from 'react';
import { GalleryImage } from '../types';
import { ImageCard } from '../apps/ImageCard'; // ImageCard is in apps/

interface LazyLoadImageCardWrapperProps {
  image: GalleryImage;
  onClick: () => void;
}

export const LazyLoadImageCardWrapper: React.FC<LazyLoadImageCardWrapperProps> = ({ image, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once it's visible
        }
      },
      {
        rootMargin: '200px', // Load images when they are 200px from viewport
      }
    );

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    return () => {
      if (placeholderRef.current) {
        observer.unobserve(placeholderRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={placeholderRef} className="relative w-full aspect-square">
      {!isVisible && (
        // Placeholder with skeleton wave animation
        <div className={`absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm skeleton-wave`} />
      )}
      {isVisible && (
        <ImageCard image={image} onClick={onClick} />
      )}
    </div>
  );
};
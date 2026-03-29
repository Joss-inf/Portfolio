import React, { useState, useMemo } from 'react';
import { GALLERY_IMAGES } from '../constants';
import { ImageZoomModal } from '../components/ImageZoomModal';
import { AppHeader } from '../components/AppHeader';
import { LazyLoadImageCardWrapper } from '../components/LazyLoadImageCardWrapper';
import { SearchBar } from '../components/SearchBar';

interface GalleryAppProps {
  isActiveAndSettled: boolean;
  showSearchInApps: boolean;
}

export const GalleryApp: React.FC<GalleryAppProps> = ({ isActiveAndSettled, showSearchInApps }) => {
  const [selectedImage, setSelectedImage] = useState<{ src: string, caption: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredImages = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase().trim();
    if (!lowercasedQuery) {
      return GALLERY_IMAGES;
    }
    return GALLERY_IMAGES.filter(image =>
      image.caption.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery]);

  return (
    <div className="h-full overflow-y-auto pb-20 bg-gray-50 dark:bg-black text-black dark:text-white scroll-smooth transition-colors duration-300">
      <AppHeader 
        title="Gallery" 
        subtitle="Captured moments"
        rightContent={
          showSearchInApps && (
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search..."
              size="small"
              className="w-48"
            />
          )
        }
      />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 md:px-6">
        {filteredImages.length > 0 ? (
          filteredImages.map((image, index) => (
            <LazyLoadImageCardWrapper 
              key={index} 
              image={image} 
              onClick={() => setSelectedImage({ src: image.src, caption: image.caption })} 
            />
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-gray-400">
            <p className="font-semibold text-lg">No images found for "{searchQuery}"</p>
            <p className="text-sm mt-1">Try a different search term.</p>
          </div>
        )}
      </div>
      <div className="h-20"></div>

      {selectedImage && (
        <ImageZoomModal 
          imageUrl={selectedImage.src} 
          caption={selectedImage.caption}
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </div>
  );
};

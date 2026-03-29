import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, ImageOff } from 'lucide-react'; 

interface ImageZoomModalProps {
  imageUrl: string;
  caption?: string; 
  onClose: () => void;
}

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({ imageUrl, caption, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startDragX, setStartDragX] = useState(0);
  const [startDragY, setStartDragY] = useState(0);
  const [originalOffsetX, setOriginalOffsetX] = useState(0);
  const [originalOffsetY, setOriginalOffsetY] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // State to control actual fade-in/out
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  // New Error State
  const [hasError, setHasError] = useState(false);

  // Trigger fade-in on mount
  useEffect(() => {
    requestAnimationFrame(() => setIsModalVisible(true));
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false); // Start fade-out
    setTimeout(onClose, 300); // Call parent onClose after transition
  }, [onClose]);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setOffsetX(0);
    setOffsetY(0);
  }, []);

  // Reset zoom, position, and error when image changes or modal opens
  useEffect(() => {
    resetZoom();
    setHasError(false);
  }, [imageUrl, resetZoom]);

  const handleZoom = useCallback((delta: number) => {
    if (hasError) return;
    setZoom(prevZoom => {
      let newZoom = prevZoom * (1 - delta * 0.001); 
      newZoom = Math.max(1, Math.min(newZoom, 4)); 

      if (newZoom === 1) {
        setOffsetX(0);
        setOffsetY(0);
      }
      return newZoom;
    });
  }, [hasError]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault(); 
    handleZoom(e.deltaY);
  }, [handleZoom]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (hasError) return;
    if (zoom > 1 && imageRef.current && containerRef.current && (e.target === imageRef.current || e.target === containerRef.current)) {
      setIsDragging(true);
      setStartDragX(e.clientX);
      setStartDragY(e.clientY);
      setOriginalOffsetX(offsetX);
      setOriginalOffsetY(offsetY);
    }
  }, [zoom, offsetX, offsetY, hasError]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && imageRef.current && containerRef.current && !hasError) {
      const dx = e.clientX - startDragX;
      const dy = e.clientY - startDragY;

      const img = imageRef.current;
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      const containerAspectRatio = containerRef.current.offsetWidth / containerRef.current.offsetHeight;

      let currentImageWidth = containerRef.current.offsetWidth;
      let currentImageHeight = containerRef.current.offsetHeight;

      if (aspectRatio > containerAspectRatio) { 
        currentImageHeight = containerRef.current.offsetWidth / aspectRatio;
      } else { 
        currentImageWidth = containerRef.current.offsetHeight * aspectRatio;
      }

      const displayedImageWidth = currentImageWidth * zoom;
      const displayedImageHeight = currentImageHeight * zoom;
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;

      const maxOffsetX = Math.max(0, (displayedImageWidth - containerWidth) / 2 / zoom);
      const maxOffsetY = Math.max(0, (displayedImageHeight - containerHeight) / 2 / zoom);

      const newOffsetX = originalOffsetX + dx / zoom;
      const newOffsetY = originalOffsetY + dy / zoom;

      setOffsetX(Math.max(-maxOffsetX, Math.min(maxOffsetX, newOffsetX)));
      setOffsetY(Math.max(-maxOffsetY, Math.min(maxOffsetY, newOffsetY)));
    }
  }, [isDragging, startDragX, startDragY, originalOffsetX, originalOffsetY, zoom, hasError]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  const getCursorStyle = useCallback(() => {
    if (hasError) return 'default';
    if (isDragging) return 'grabbing';
    if (zoom > 1) return 'grab';
    return 'zoom-in';
  }, [isDragging, zoom, hasError]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[1000] bg-black flex items-center justify-center transition-opacity duration-300 pointer-events-auto
        ${isModalVisible ? 'opacity-100' : 'opacity-0'}
      `}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
      onDoubleClick={!hasError ? resetZoom : undefined} 
      onClick={(e) => { 
        if (e.target === containerRef.current) {
          handleCloseModal();
        }
      }}
      style={{ cursor: getCursorStyle() }}
    >
      <button
        onClick={handleCloseModal}
        className="absolute top-12 right-6 z-[1001] w-10 h-10 bg-gray-700/50 backdrop-blur-lg rounded-full text-white hover:bg-gray-700/80 transition-colors flex items-center justify-center shadow-lg"
      >
        <X size={20} />
      </button>

      {caption && !hasError && (
        <div className={` pointer-events-none absolute inset-x-0 top-12 z-[1001] flex justify-center transition-all duration-300
          ${isModalVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
        `}>
          <p className="max-w-md text-center text-white text-xs font-normal bg-black/30 backdrop-blur-md px-4 py-2 rounded-full">
            {caption}
          </p>
        </div>
      )}

      {/* Zoom controls - hide if error */}
      {!hasError && (
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-[1001] flex gap-2 p-2 bg-gray-700/50 backdrop-blur-lg rounded-full text-white shadow-lg transition-all duration-300
          ${isModalVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}>
          <button
            onClick={() => handleZoom(100)} 
            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
            disabled={zoom === 1}
          >
            <ZoomOut size={20} />
          </button>
          <button
            onClick={() => handleZoom(-100)} 
            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
            disabled={zoom === 4}
          >
            <ZoomIn size={20} />
          </button>
        </div>
      )}

      {hasError ? (
         <div className={`flex flex-col items-center justify-center text-white/50 transition-all duration-500
           ${isModalVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
         `}>
            <ImageOff size={64} strokeWidth={1} className="mb-4" />
            <p className="text-lg font-medium">Image unavailable</p>
         </div>
      ) : (
        <img
          ref={imageRef}
          src={imageUrl}
          alt={caption || "Zoomed image"}
          onError={() => setHasError(true)}
          className={`max-w-full max-h-full object-contain select-none transition-opacity duration-300
            ${isModalVisible ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            transform: `scale(${zoom}) translate(${offsetX}px, ${offsetY}px)`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out, opacity 0.3s ease-out',
            transformOrigin: 'center center',
          }}
          onDragStart={(e) => e.preventDefault()}
        />
      )}
    </div>
  );
};
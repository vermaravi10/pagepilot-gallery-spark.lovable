import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { FileItem } from '@/types/file';
import { formatFileSize } from '@/utils/fileValidation';
import { cn } from '@/lib/utils';

interface LightboxProps {
  images: FileItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const currentImage = images[currentIndex];

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    onNavigate(newIndex);
  }, [currentIndex, images.length, onNavigate]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    onNavigate(newIndex);
  }, [currentIndex, images.length, onNavigate]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        goToPrevious();
        break;
      case 'ArrowRight':
        goToNext();
        break;
    }
  }, [onClose, goToPrevious, goToNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'auto';
    };
  }, [handleKeyPress]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentImage.src;
    link.download = currentImage.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      {/* Navigation buttons */}
      <button
        onClick={goToPrevious}
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full",
          "bg-white/10 hover:bg-white/20 text-white transition-all duration-200",
          "hover:scale-110 active:scale-95"
        )}
        disabled={images.length <= 1}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full",
          "bg-white/10 hover:bg-white/20 text-white transition-all duration-200",
          "hover:scale-110 active:scale-95"
        )}
        disabled={images.length <= 1}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <h3 className="font-medium">{currentImage.name}</h3>
            <p className="text-sm text-white/70">
              {currentIndex + 1} of {images.length} • {formatFileSize(currentImage.size)}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className={cn(
                "p-2 rounded-full bg-white/10 hover:bg-white/20",
                "text-white transition-all duration-200 hover:scale-110"
              )}
            >
              <Download className="w-5 h-5" />
            </button>
            
            <button
              onClick={onClose}
              className={cn(
                "p-2 rounded-full bg-white/10 hover:bg-white/20",
                "text-white transition-all duration-200 hover:scale-110"
              )}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main image */}
      <div 
        className="max-w-[90vw] max-h-[80vh] cursor-pointer"
        onClick={onClose}
      >
        <img
          src={currentImage.src}
          alt={currentImage.name}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        />
      </div>

      {/* Image counter dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => onNavigate(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                index === currentIndex 
                  ? "bg-white scale-125" 
                  : "bg-white/40 hover:bg-white/60"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
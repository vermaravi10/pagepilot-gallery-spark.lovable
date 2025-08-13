import React, { useState } from 'react';
import { FileItem } from '@/types/file';
import { ImageCard } from './ImageCard';
import { Lightbox } from './Lightbox';
import { EmptyState } from './EmptyState';

interface ImageGalleryProps {
  files: FileItem[];
  onRemoveFile: (id: string) => void;
  onClearAll: () => void;
}

export function ImageGallery({ files, onRemoveFile, onClearAll }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (files.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          Gallery ({files.length} images)
        </h2>
        
        <button
          onClick={onClearAll}
          className="px-4 py-2 text-sm font-medium text-destructive hover:text-destructive-foreground hover:bg-destructive rounded-lg transition-all duration-200"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((file, index) => (
          <ImageCard
            key={file.id}
            file={file}
            onRemove={() => onRemoveFile(file.id)}
            onClick={() => setLightboxIndex(index)}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={files}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
import React from 'react';
import { Trash2 } from 'lucide-react';
import { FileItem } from '@/types/file';
import { formatFileSize } from '@/utils/fileValidation';
import { cn } from '@/lib/utils';

interface ImageCardProps {
  file: FileItem;
  onRemove: () => void;
  onClick: () => void;
}

export function ImageCard({ file, onRemove, onClick }: ImageCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-surface shadow-card hover:shadow-upload transition-all duration-300 hover:scale-[1.02]">
      <div 
        className="aspect-square cursor-pointer overflow-hidden"
        onClick={onClick}
      >
        <img
          src={file.src}
          alt={file.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-foreground truncate text-sm">
          {file.name}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-muted-foreground">
            {formatFileSize(file.size)}
          </span>
          <span className="text-xs text-muted-foreground">
            {file.createdAt.toLocaleDateString()}
          </span>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className={cn(
          "absolute top-2 right-2 p-2 rounded-full",
          "bg-destructive/80 hover:bg-destructive text-destructive-foreground",
          "opacity-0 group-hover:opacity-100 transition-all duration-200",
          "hover:scale-110 active:scale-95"
        )}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
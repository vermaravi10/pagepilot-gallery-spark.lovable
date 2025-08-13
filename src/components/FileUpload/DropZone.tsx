import React, { useCallback, useState } from 'react';
import { Upload, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  className?: string;
}

export function DropZone({ onFilesSelected, className }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev - 1);
    if (dragCounter <= 1) {
      setIsDragOver(false);
    }
  }, [dragCounter]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setDragCounter(0);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  }, [onFilesSelected]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesSelected(files);
    }
    // Reset input value to allow selecting same file again
    e.target.value = '';
  }, [onFilesSelected]);

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-xl transition-all duration-300",
        "bg-gradient-surface hover:shadow-upload",
        isDragOver 
          ? "border-primary shadow-glow bg-accent/50 scale-[1.02]" 
          : "border-border hover:border-primary/50",
        className
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
        <div className={cn(
          "mb-6 p-4 rounded-full transition-all duration-300",
          "bg-gradient-primary shadow-card",
          isDragOver && "scale-110 shadow-glow"
        )}>
          {isDragOver ? (
            <Image className="w-8 h-8 text-primary-foreground" />
          ) : (
            <Upload className="w-8 h-8 text-primary-foreground" />
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-foreground">
          {isDragOver ? 'Drop images here' : 'Upload your images'}
        </h3>
        
        <p className="text-muted-foreground mb-6 max-w-sm">
          Drag and drop your images here, or click to browse files. 
          Supports JPEG, PNG, GIF, and WebP up to 5MB.
        </p>
        
        <label className={cn(
          "inline-flex items-center gap-2 px-6 py-3 rounded-lg",
          "bg-gradient-primary text-primary-foreground font-medium",
          "transition-all duration-200 cursor-pointer",
          "hover:shadow-glow hover:scale-105 active:scale-95",
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring"
        )}>
          <Upload className="w-4 h-4" />
          Choose Files
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="sr-only"
          />
        </label>
      </div>
      
      {isDragOver && (
        <div className="absolute inset-0 bg-primary/10 rounded-xl pointer-events-none" />
      )}
    </div>
  );
}
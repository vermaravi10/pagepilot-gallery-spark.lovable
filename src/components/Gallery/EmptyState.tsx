import React from 'react';
import { ImageIcon, Upload } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="mb-6 p-6 rounded-full bg-gradient-muted">
        <ImageIcon className="w-12 h-12 text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-foreground">
        No images in gallery
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-sm">
        Upload your first images to get started. You can drag and drop files 
        or use the upload button above.
      </p>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Upload className="w-4 h-4" />
        <span>Ready to upload images</span>
      </div>
    </div>
  );
}
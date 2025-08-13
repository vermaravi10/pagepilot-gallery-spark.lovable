import React from 'react';
import { useFileUpload } from '@/hooks/useFileUpload';
import { DropZone } from '@/components/FileUpload/DropZone';
import { UploadQueue } from '@/components/FileUpload/UploadQueue';
import { ImageGallery } from '@/components/Gallery/ImageGallery';

export function PagePilot() {
  const { files, uploadQueue, addFiles, removeFile, clearAllFiles } = useFileUpload();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            PagePilot Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload, organize, and showcase your images with our beautiful gallery system. 
            Drag and drop multiple files or click to browse.
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-12">
          <DropZone 
            onFilesSelected={addFiles}
            className="mb-8"
          />
          
          <UploadQueue queue={uploadQueue} />
        </div>

        {/* Gallery Section */}
        <ImageGallery
          files={files}
          onRemoveFile={removeFile}
          onClearAll={clearAllFiles}
        />
      </div>
    </div>
  );
}
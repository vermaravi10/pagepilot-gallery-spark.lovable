import { useState, useCallback } from 'react';
import { FileItem, UploadProgress } from '@/types/file';
import { validateFile } from '@/utils/fileValidation';
import { saveFiles, loadFiles } from '@/utils/storage';
import { toast } from '@/hooks/use-toast';

export function useFileUpload() {
  const [files, setFiles] = useState<FileItem[]>(() => loadFiles());
  const [uploadQueue, setUploadQueue] = useState<UploadProgress[]>([]);

  const simulateUpload = useCallback(async (fileItem: FileItem): Promise<void> => {
    const progressId = fileItem.id;
    
    setUploadQueue(prev => [...prev, { 
      id: progressId, 
      progress: 0, 
      status: 'uploading' 
    }]);

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      setUploadQueue(prev => prev.map(item => 
        item.id === progressId 
          ? { ...item, progress }
          : item
      ));
    }

    // Complete upload
    setUploadQueue(prev => prev.map(item => 
      item.id === progressId 
        ? { ...item, status: 'completed' as const }
        : item
    ));

    // Add to files after a brief delay
    setTimeout(() => {
      setFiles(prev => {
        const newFiles = [fileItem, ...prev];
        saveFiles(newFiles);
        return newFiles;
      });
      
      setUploadQueue(prev => prev.filter(item => item.id !== progressId));
    }, 500);
  }, []);

  const addFiles = useCallback(async (newFiles: File[]) => {
    const validFiles: FileItem[] = [];
    
    for (const file of newFiles) {
      const validation = validateFile(file);
      
      if (!validation.isValid) {
        toast({
          title: "Upload Error",
          description: validation.error,
          variant: "destructive"
        });
        continue;
      }

      const fileItem: FileItem = {
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        src: URL.createObjectURL(file),
        createdAt: new Date(),
        file
      };

      validFiles.push(fileItem);
    }

    // Start uploads
    validFiles.forEach(fileItem => {
      simulateUpload(fileItem);
    });

    if (validFiles.length > 0) {
      toast({
        title: "Upload Started",
        description: `${validFiles.length} file(s) are being uploaded.`
      });
    }
  }, [simulateUpload]);

  const removeFile = useCallback((id: string) => {
    setFiles(prev => {
      // Find the file to clean up the object URL
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.src);
      }
      
      const newFiles = prev.filter(f => f.id !== id);
      saveFiles(newFiles);
      return newFiles;
    });

    toast({
      title: "File Removed",
      description: "File has been removed from gallery."
    });
  }, []);

  const clearAllFiles = useCallback(() => {
    // Clean up object URLs
    files.forEach(file => {
      URL.revokeObjectURL(file.src);
    });
    
    setFiles([]);
    saveFiles([]);
    
    toast({
      title: "Gallery Cleared",
      description: "All files have been removed."
    });
  }, [files]);

  return {
    files,
    uploadQueue,
    addFiles,
    removeFile,
    clearAllFiles
  };
}
export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  src: string;
  createdAt: Date;
  file: File;
}

export interface UploadProgress {
  id: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
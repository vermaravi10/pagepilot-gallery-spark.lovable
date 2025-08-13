import { FileItem } from '@/types/file';

const STORAGE_KEY = 'pagepilot_gallery';

export function saveFiles(files: FileItem[]): void {
  try {
    const serializedFiles = files.map(file => ({
      ...file,
      createdAt: file.createdAt.toISOString()
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializedFiles));
  } catch (error) {
    console.error('Failed to save files to localStorage:', error);
  }
}

export function loadFiles(): FileItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt)
    }));
  } catch (error) {
    console.error('Failed to load files from localStorage:', error);
    return [];
  }
}

export function clearFiles(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear files from localStorage:', error);
  }
}
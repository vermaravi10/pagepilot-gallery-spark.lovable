import React from 'react';
import { Check, AlertCircle, Loader2 } from 'lucide-react';
import { UploadProgress } from '@/types/file';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface UploadQueueProps {
  queue: UploadProgress[];
}

export function UploadQueue({ queue }: UploadQueueProps) {
  if (queue.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">Upload Progress</h3>
      
      <div className="space-y-2">
        {queue.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex items-center gap-3 p-4 rounded-lg border transition-all duration-300",
              "bg-gradient-surface shadow-card",
              item.status === 'completed' && "border-success/50 bg-success/5",
              item.status === 'error' && "border-destructive/50 bg-destructive/5"
            )}
          >
            <div className="flex-shrink-0">
              {item.status === 'uploading' && (
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              )}
              {item.status === 'completed' && (
                <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
                  <Check className="w-3 h-3 text-success-foreground" />
                </div>
              )}
              {item.status === 'error' && (
                <AlertCircle className="w-5 h-5 text-destructive" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground truncate">
                  {item.status === 'uploading' && 'Uploading...'}
                  {item.status === 'completed' && 'Upload complete'}
                  {item.status === 'error' && 'Upload failed'}
                </span>
                <span className="text-sm text-muted-foreground">
                  {item.progress}%
                </span>
              </div>
              
              {item.status !== 'error' && (
                <Progress
                  value={item.progress}
                  className="h-2"
                />
              )}
              
              {item.error && (
                <p className="text-sm text-destructive mt-1">{item.error}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
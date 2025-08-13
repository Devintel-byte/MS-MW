'use client';
import { useCallback, useState } from 'react';

import { useUploadThing } from '@/lib/uploadthing';
import { toast } from 'sonner';
import { useDropzone } from '@uploadthing/react';

type UploadZoneProps = {
  onUploadComplete: (url: string) => void;
  className?: string;
};

export function UploadZone({ onUploadComplete, className }: UploadZoneProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { startUpload } = useUploadThing('memoryImage');

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true);
      try {
        const res = await startUpload(acceptedFiles);
        if (res?.[0]?.url) {
          onUploadComplete(res[0].url);
          toast.success('Upload completed!');
        }
      } catch (error) {
        toast.error('Upload failed');
      } finally {
        setIsUploading(false);
      }
    },
    [startUpload, onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxSize: 4 * 1024 * 1024, // 4MB
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive
          ? 'border-orange-600 bg-orange-50'
          : 'border-orange-400 hover:border-orange-500'
      } ${className}`}
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-orange-500">Uploading...</p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-orange-500 font-medium">
            {isDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
          </p>
          <p className="text-gray-500 text-sm">or click to select</p>
          <p className="text-gray-400 text-xs">Max 4MB (JPEG, PNG)</p>
        </div>
      )}
    </div>
  );
}
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
  previewUrl: string | null;
  error?: string | null;
}

export function ImageUploader({ onFileSelect, previewUrl, error }: ImageUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"]
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false
  });

  return (
    <div className="w-full">
      {!previewUrl ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center min-h-[360px] cursor-pointer transition-all duration-200
            ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400"}
            ${error ? "border-red-400 bg-red-50" : ""}
          `}
        >
          <input {...getInputProps()} />
          
          <div className={`p-4 rounded-full mb-4 ${isDragActive ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-400 shadow-sm'}`}>
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {isDragActive ? "Drop image here" : "Upload retinal image"}
          </h3>
          <p className="text-sm text-gray-500 text-center max-w-xs">
            Drag and drop a clear fundus photograph, or click to select from your files.
          </p>
          <p className="text-xs text-gray-400 mt-4 font-medium">JPEG or PNG up to 10MB</p>
          
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white relative">
          <div className="relative w-full aspect-square max-h-[400px] bg-black">
            <Image 
              src={previewUrl} 
              alt="Fundus preview" 
              fill
              className="object-contain"
            />
          </div>
          
          <div className="p-4 bg-gray-50 flex items-center justify-between border-t border-gray-200">
            <div className="flex items-center text-sm font-medium text-gray-700">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Image ready for analysis
            </div>
            
            <button 
              {...getRootProps()}
              className="text-sm text-blue-600 font-semibold hover:text-blue-800 transition-colors"
            >
              <input {...getInputProps()} />
              Change image
            </button>
          </div>
        </div>
      )}
      
      {error && <p className="mt-3 text-sm text-red-500 font-medium">{error}</p>}
    </div>
  );
}

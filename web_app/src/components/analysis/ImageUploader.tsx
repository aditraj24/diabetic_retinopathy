"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { motion } from "framer-motion";
import { Upload, CheckCircle, RefreshCw } from "lucide-react";

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
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {!previewUrl ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center min-h-[360px] cursor-pointer transition-colors duration-200
            ${isDragActive ? "border-gray-400 bg-gray-50" : "border-gray-300 bg-white hover:border-gray-400"}
            ${error ? "border-red-400 bg-red-50" : ""}
          `}
        >
          <input {...getInputProps()} />
          
          <div className={`p-3 rounded-md mb-4 transition-colors duration-200 ${
            isDragActive ? 'bg-gray-100 text-gray-700' : 'bg-gray-50 text-gray-500'
          }`}>
            <Upload className="w-8 h-8" />
          </div>
          
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            {isDragActive ? "Drop image here" : "Upload retinal image"}
          </h3>
          <p className="text-xs text-gray-500 text-center max-w-xs">
            Drag and drop a clear fundus photograph, or click to select from your files.
          </p>
          <p className="text-xs text-gray-400 mt-3">JPEG or PNG up to 10MB</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
          <div className="relative w-full aspect-square max-h-[400px] bg-gray-50">
            <Image 
              src={previewUrl} 
              alt="Fundus preview" 
              fill
              className="object-contain"
            />
          </div>
          
          <div className="p-3 bg-white border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center text-xs font-medium text-gray-700">
              <CheckCircle className="w-4 h-4 mr-1.5 text-green-600" />
              Image ready for analysis
            </div>
            
            <button 
              {...getRootProps()}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
            >
              <input {...getInputProps()} />
              <RefreshCw size={12} />
              Change image
            </button>
          </div>
        </div>
      )}
      
      {error && (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      )}
    </motion.div>
  );
}
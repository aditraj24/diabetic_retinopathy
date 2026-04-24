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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!previewUrl ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-[20px] p-10 flex flex-col items-center justify-center min-h-[360px] cursor-pointer transition-all duration-300
            ${isDragActive ? "border-teal bg-teal/5 shadow-glow-sm" : "border-gray-200 bg-white hover:bg-teal-mist/30 hover:border-teal/30"}
            ${error ? "border-red-400 bg-red-50" : ""}
          `}
        >
          <input {...getInputProps()} />
          
          <div className={`p-4 rounded-2xl mb-4 transition-all duration-300 ${isDragActive ? 'bg-teal/10 text-teal-dark' : 'bg-gray-50 text-secondary'}`}>
            <Upload className="w-10 h-10" />
          </div>
          
          <h3 className="text-xl font-bold text-primary mb-2 tracking-tight">
            {isDragActive ? "Drop image here" : "Upload retinal image"}
          </h3>
          <p className="text-sm text-secondary text-center max-w-xs font-medium">
            Drag and drop a clear fundus photograph, or click to select from your files.
          </p>
          <p className="text-xs text-gray-400 mt-4 font-semibold">JPEG or PNG up to 10MB</p>
          
        </div>
      ) : (
        <div className="white-card overflow-hidden">
          <div className="relative w-full aspect-square max-h-[400px] bg-gray-50 border-b border-gray-100">
            <Image 
              src={previewUrl} 
              alt="Fundus preview" 
              fill
              className="object-contain"
            />
          </div>
          
          <div className="p-4 bg-white flex items-center justify-between">
            <div className="flex items-center text-sm font-bold text-teal-dark">
              <CheckCircle className="w-5 h-5 mr-2 text-teal" />
              Image ready for analysis
            </div>
            
            <button 
              {...getRootProps()}
              className="flex items-center gap-1.5 text-sm text-secondary font-semibold hover:text-primary transition-colors focus:outline-none"
            >
              <input {...getInputProps()} />
              <RefreshCw size={14} />
              Change image
            </button>
          </div>
        </div>
      )}
      
      {error && <p className="mt-3 text-sm text-red-500 font-bold">{error}</p>}
    </motion.div>
  );
}

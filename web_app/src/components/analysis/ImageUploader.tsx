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
            ${isDragActive ? "border-neon-blue bg-neon-blue/5 shadow-glow" : "border-white/20 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/30"}
            ${error ? "border-red-500/40 bg-red-500/5" : ""}
          `}
        >
          <input {...getInputProps()} />
          
          <div className={`p-4 rounded-2xl mb-4 transition-all duration-300 ${isDragActive ? 'bg-neon-blue/10 text-neon-blue' : 'bg-white/5 text-muted'}`}>
            <Upload className="w-10 h-10" />
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-2">
            {isDragActive ? "Drop image here" : "Upload retinal image"}
          </h3>
          <p className="text-sm text-muted text-center max-w-xs">
            Drag and drop a clear fundus photograph, or click to select from your files.
          </p>
          <p className="text-xs text-white/30 mt-4 font-medium">JPEG or PNG up to 10MB</p>
          
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="relative w-full aspect-square max-h-[400px] bg-navy">
            <Image 
              src={previewUrl} 
              alt="Fundus preview" 
              fill
              className="object-contain"
            />
          </div>
          
          <div className="p-4 bg-white/[0.03] flex items-center justify-between border-t border-white/10">
            <div className="flex items-center text-sm font-medium text-success-green">
              <CheckCircle className="w-5 h-5 mr-2" />
              Image ready for analysis
            </div>
            
            <button 
              {...getRootProps()}
              className="flex items-center gap-1.5 text-sm text-neon-blue font-semibold hover:text-cyan transition-colors"
            >
              <input {...getInputProps()} />
              <RefreshCw size={14} />
              Change image
            </button>
          </div>
        </div>
      )}
      
      {error && <p className="mt-3 text-sm text-red-400 font-medium">{error}</p>}
    </motion.div>
  );
}

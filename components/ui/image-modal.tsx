'use client';

import { X } from 'lucide-react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';

interface ImageModalProps {
  src: string;
  onClose: () => void;
  onDownload: () => void;
}

export const ImageModal = ({ src, onClose, onDownload }: ImageModalProps) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = src;
    link.download = "generated-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onDownload?.();
  };

  return (
    <div className="fixed inset-0 overflow-auto bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-lg ">
        <Button 
          variant="ghost" 
          className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <Button
          className="absolute bottom-1 left-1/2 -translate-x-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4 mr-2" />
          Save Image
        </Button>
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt="Generated Image"
            className="object-contain w-full h-full"
            width={1024}
            height={1024}
          />
        </div>
      </div>
    </div>
  );
};


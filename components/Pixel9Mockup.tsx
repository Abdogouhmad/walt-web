import React from "react";
import Image from "next/image";

interface Pixel9MockupProps {
  children?: React.ReactNode;
  className?: string;
  screenshot?: string;
}

const Pixel9Mockup = ({ children, className = "", screenshot }: Pixel9MockupProps) => {
  return (
    <div className={`relative mx-auto ${className}`}>
      {/* Outer Frame */}
      <div className="relative aspect-[9/19.5] w-full bg-zinc-900 rounded-[1.5rem] border-[6px] border-zinc-800 shadow-2xl overflow-hidden ring-1 ring-white/10">
        
        {/* Screen Content */}
        <div className="absolute inset-0 bg-black overflow-hidden rounded-[1.2rem]">
          {screenshot ? (
            <Image 
              src={screenshot} 
              alt="App Screenshot" 
              fill
              className="object-cover [image-rendering:auto] brightness-[1.02] contrast-[1.02]"
              priority
            />
          ) : (
            children
          )}
        </div>

        {/* Punch Hole Camera */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-900 rounded-full border border-white/5 z-20" />
        
        {/* Bottom Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/20 rounded-full z-20" />
      </div>

      {/* Frame Buttons (Volume & Power) */}
      <div className="absolute right-[-10px] top-32 w-[3px] h-12 bg-zinc-700 rounded-l-md" />
      <div className="absolute right-[-10px] top-48 w-[3px] h-20 bg-zinc-700 rounded-l-md" />
    </div>
  );
};

export default Pixel9Mockup;

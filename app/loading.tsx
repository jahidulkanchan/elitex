import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-stone-900">
      {/* Container for the loader */}
      <div className="flex flex-col items-center gap-4">
        {/* Animated Spinner */}
        <BiLoaderAlt className="w-10 h-10 animate-spin text-stone-800" />
        
        {/* Subtle Text */}
        <p className="text-sm font-medium tracking-widest uppercase opacity-60">
          Loading...
        </p>
      </div>

      {/* Decorative Brand Accent (Optional) */}
      <div className="absolute bottom-10 text-xs font-bold tracking-tighter uppercase">
        BRAND.
      </div>
    </div>
  );
}
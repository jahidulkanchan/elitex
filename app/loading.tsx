import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-stone-900">
      <div className="flex flex-col items-center gap-4">
        <BiLoaderAlt className="w-10 h-10 animate-spin text-stone-800" />
        <p className="text-sm font-medium tracking-widest uppercase opacity-60">
          Loading...
        </p>
      </div>
      <div className="absolute bottom-10 text-xs font-bold tracking-tighter uppercase">
        BRAND.
      </div>
    </div>
  );
}
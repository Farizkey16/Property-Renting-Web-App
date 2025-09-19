"use client";

import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
      <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
    </div>
  );
}

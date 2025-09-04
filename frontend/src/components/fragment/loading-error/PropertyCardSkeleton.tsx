"use client";

import { Badge } from "@/components/ui/badge";

export function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full animate-pulse">
      <div className="relative">
        <div className="w-full h-40 sm:h-48 bg-gray-200" />
        <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gray-300 text-transparent border-0 text-xs">
          ----
        </Badge>
      </div>

      <div className="p-3 sm:p-4 space-y-3">
        {/* Title */}
        <div className="h-4 sm:h-5 bg-gray-200 rounded w-3/4" />

        <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2" />

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-2">
            <div className="h-5 sm:h-6 bg-gray-200 rounded w-16 sm:w-20" />
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-10" />
          </div>
          <div className="h-3 sm:h-4 bg-gray-200 rounded w-14 sm:w-16" />
        </div>
      </div>
    </div>
  );
}

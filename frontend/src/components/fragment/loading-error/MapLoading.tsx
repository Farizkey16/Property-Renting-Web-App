import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { PropertyCardSkeleton } from "./PropertyCardSkeleton";

const MapLoading = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-full overflow-x-hidden">
      <div className="w-full lg:flex-1 relative p-2">
        <div className="h-[220px] lg:h-[500px] rounded-xl overflow-hidden shadow relative animate-pulse">
          <Skeleton className="w-full h-full" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-5 h-5 bg-red-300 rounded-full opacity-75 animate-ping"></div>
            <div className="w-5 h-5 bg-red-400 rounded-full absolute top-0 left-0"></div>
          </div>

          <div className="absolute top-1/3 left-1/4">
            <div className="w-7 h-7 bg-blue-300 rounded-full"></div>
          </div>
          <div className="absolute bottom-1/4 right-1/4">
            <div className="w-7 h-7 bg-blue-300 rounded-full"></div>
          </div>
        </div>
      </div>

      <div
        className="w-full lg:w-[420px] bg-white border-t lg:border-t-0 lg:border-l 
              flex flex-col lg:h-[500px] max-w-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {[...Array(3)].map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapLoading;

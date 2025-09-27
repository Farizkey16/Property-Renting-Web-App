"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CardBookingSkeleton() {
  return (
    <>
      {/* Mobile Fixed Booking Bar Skeleton */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t shadow-lg z-40 lg:hidden">
        <div className="flex justify-between items-center mt-4">
          {/* Price skeleton */}
          <div>
            <Skeleton className="h-4 w-12 mb-1" /> {/* "From" */}
            <Skeleton className="h-8 w-24" /> {/* Price */}
          </div>
          <Skeleton className="h-5 w-20" /> {/* Reserve now */}
        </div>
      </div>

      {/* Desktop Booking Card Skeleton */}
      <div className="hidden lg:block lg:col-span-1">
        <div className="sticky top-[80px]">
          <Card>
            <CardContent className="p-6 space-y-4">
              {/* DatePicker skeleton */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-12 w-full" />

              {/* Room availability skeleton */}
              <Skeleton className="h-5 w-32" />

              {/* Guest picker skeleton */}
              <div className="flex items-center gap-2 mt-2">
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-12 w-full" />

              {/* Price skeleton */}
              <div className="flex justify-between items-center mt-4">
                <div>
                  <Skeleton className="h-4 w-12 mb-1" />
                  <Skeleton className="h-8 w-24" />
                </div>
                <Skeleton className="h-5 w-20" />
              </div>

              {/* Reserve button skeleton */}
              <Skeleton className="h-10 w-full mt-4" />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

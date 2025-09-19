"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CardBookingSkeleton() {
  return (
    <>
      {/* Mobile Fixed Booking Bar Skeleton */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t shadow-lg z-40 lg:hidden">
        <div className="flex justify-between items-center mt-4">
          <div>
            <Skeleton className="h-4 w-12 mb-1" /> {/* "From" */}
            <Skeleton className="h-8 w-24" /> {/* Price */}
          </div>
          <div className="text-right">
            <Skeleton className="h-5 w-20" /> {/* Label */}
          </div>
        </div>
      </div>

      {/* Dialog Skeleton (Mobile Modal) */}
      <div className="hidden">
        <div className="space-y-4 p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-20 ml-auto" />
          </div>
          <Skeleton className="h-12 w-full" /> {/* DatePicker */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-12 w-full" /> {/* Guest Picker */}
          <div className="flex justify-between items-center mt-4">
            <div>
              <Skeleton className="h-4 w-12 mb-1" />
              <Skeleton className="h-8 w-24" />
            </div>
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="h-10 w-full" /> {/* Reserve now */}
          <Skeleton className="h-4 w-3/4 mx-auto" />
          <Skeleton className="h-10 w-full" /> {/* Request free tour */}
        </div>
      </div>

      {/* Desktop Booking Card Skeleton */}
      <div className="hidden lg:block lg:col-span-1">
        <div className="sticky top-[80px]">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-20 ml-auto" />
              </div>
              <Skeleton className="h-12 w-full" /> {/* DatePicker */}
              <div className="flex items-center gap-2 mt-4">
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-12 w-full" /> {/* Guest Picker */}
              <div className="flex justify-between items-center mt-4">
                <div>
                  <Skeleton className="h-4 w-12 mb-1" />
                  <Skeleton className="h-8 w-24" />
                </div>
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-10 w-full mt-4" /> {/* Reserve now */}
              <Skeleton className="h-4 w-3/4 mx-auto" />
              <Skeleton className="h-10 w-full mt-2" />{" "}
              {/* Request free tour */}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PropertyDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-4 lg:col-span-3">
                <Skeleton className="w-full h-[400px] rounded-lg" />
              </div>
              <div className="col-span-4 lg:col-span-1 grid gap-2">
                <Skeleton className="w-full h-[195px] rounded-lg" />
                <Skeleton className="w-full h-[195px] rounded-lg" />
              </div>
            </div>

            {/* Title + Rating */}
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </CardContent>
            </Card>

            {/* Opening Hours */}
            <Card>
              <CardContent className="p-6 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>

            {/* Property Information */}
            <Card>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Skeleton className="w-full h-[400px] rounded-lg" />
                <CardContent className="space-y-3">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-4/6" />
                </CardContent>
              </div>
            </Card>
          </div>

          {/* Right Column (Booking) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

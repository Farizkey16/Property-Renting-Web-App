"use client";

import React, { useEffect } from "react";
import { format } from "date-fns";
import { useGetRoomAvailability } from "@/hooks/useRoom";
import { Loader2 } from "lucide-react";

export interface AvailabilityItem {
  id: string;
  date: string;
  is_available: boolean;
  total_rooms: number;
  booked_count: number;
  remaining: number;
}

interface RoomAvailabilityStatusProps {
  roomId: string;
  startDate: string;
  endDate: string;
  onAvailabilityChange?: (isFullyBooked: boolean, isLoading: boolean) => void;
}

export const RoomAvailabilityStatus = ({
  roomId,
  startDate,
  endDate,
  onAvailabilityChange,
}: RoomAvailabilityStatusProps) => {
  const { data, isLoading, isError } = useGetRoomAvailability(
    roomId,
    startDate,
    endDate
  );


  console.log("DEBUG: Availability Data:", data);
  console.log("DEBUG: Start Date:", startDate);
  console.log("DEBUG: End Date:", endDate);
  console.log("DEBUG: Room ID:", roomId);
        
  useEffect(() => {
    if (data?.availability && onAvailabilityChange) {
      const filteredAvailability = data.availability.slice(0, -1);

      const isFullyBooked = filteredAvailability.every(
        (item: AvailabilityItem) => !item.is_available || item.remaining === 0
      );

      onAvailabilityChange(isFullyBooked, isLoading);
    }
  }, [data, isLoading, onAvailabilityChange]);

  if (isLoading)
    return (
      <div className="flex items-center gap-2 p-4 text-gray-500">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Checking availability...</span>
      </div>
    );
  if (isError)
    return <div className="p-4 text-red-500">Failed to load availability.</div>;
  if (!data?.availability || data.availability.length === 0)
    return <div className="p-4 text-gray-500">No availability data.</div>;

  return (
    <div className="p-4 border rounded-2xl space-y-2 bg-gray-50">
      <h3 className="font-medium mb-2">Room Availability</h3>
      {data.availability.slice(0, -1).map((item: AvailabilityItem) => {
        const dateStr = format(new Date(item.date), "yyyy-MM-dd");
        const isFull = !item.is_available || item.remaining === 0;

        return (
          <div key={item.id} className="flex justify-between items-center">
            <span>{dateStr}</span>
            {isFull ? (
              <div className="flex flex-col gap-1 text-right">
                <span className="text-red-500 text-sm">Fully booked,</span>
                <span className="text-red-500 text-sm">
                  choose another date
                </span>
              </div>
            ) : (
              <span className="text-green-600 text-sm">
                {item.remaining} rooms left
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

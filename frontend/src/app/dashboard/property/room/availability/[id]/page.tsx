"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useBlockRoomByTenant, useUnBlockRoomByTenant } from "@/hooks/useRoom";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop() ?? "";

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  // Mutations
  const blockMutation = useBlockRoomByTenant(
    id,
    startDate ? format(startDate, "yyyy-MM-dd") : undefined,
    endDate ? format(endDate, "yyyy-MM-dd") : undefined
  );

  const unblockMutation = useUnBlockRoomByTenant(
    id,
    startDate ? format(startDate, "yyyy-MM-dd") : undefined,
    endDate ? format(endDate, "yyyy-MM-dd") : undefined
  );

  const handleCheckboxChange = (dateId: string) => {
    setSelected((prev) => ({ ...prev, [dateId]: !prev[dateId] }));
  };

  const generateDates = () => {
    if (!startDate || !endDate) return [];
    const dates: Date[] = [];
    const current = new Date(startDate);
    while (current <= endDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const handleSubmit = async (action: "block" | "unblock") => {
    const checkedDates = Object.keys(selected).filter((key) => selected[key]);
    if (!checkedDates.length) {
      alert("Please select at least one date to block/unblock");
      return;
    }

    try {
      if (action === "block") {
        await blockMutation.mutateAsync();
        toast.success("Rooms blocked successfully!");
      } else {
        await unblockMutation.mutateAsync();
        toast.success("Rooms unblocked successfully!");
      }
      router.push("/dashboard/property");
    } catch (error) {
      console.error(error);
      toast.error("Failed to process action");
    }
  };

  return (
    <div className="w-full p-4">
      <Card className="shadow-sm p-8">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            Block / Unblock Room
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Date Pickers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                className="border px-3 py-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                minDate={new Date()}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                className="border px-3 py-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                minDate={startDate || new Date()}
                disabled={!startDate}
              />
            </div>
          </div>

          {/* Date List */}
          <div>
            <h2 className="font-medium mb-2 text-sm">Select Dates:</h2>
            <div className="border rounded-md p-3 max-h-40 overflow-y-auto space-y-2">
              {generateDates().map((date) => {
                const dateId = format(date, "yyyy-MM-dd");
                return (
                  <div key={dateId} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={!!selected[dateId]}
                      onChange={() => handleCheckboxChange(dateId)}
                      className="h-4 w-4"
                    />
                    <span>{dateId}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Info Section */}
          <div className="flex items-start gap-2 rounded-md border border-yellow-300 bg-yellow-50 p-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <p className="text-sm text-yellow-700">
              This feature allows you to block or unblock all rooms for the
              selected dates. Once blocked, rooms will no longer be available
              for booking on those dates. Please use this option carefully to
              avoid unwanted restrictions for tenants.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              disabled={blockMutation.isPending}
              onClick={() => handleSubmit("block")}
              className="bg-red-500 hover:bg-red-600 text-white flex-1 cursor-pointer text-xl p-6">
              {blockMutation.isPending ? "Blocking..." : "Block Rooms"}
            </Button>

            <Button
              type="button"
              disabled={unblockMutation.isPending}
              onClick={() => handleSubmit("unblock")}
              className="bg-green-500 hover:bg-green-600 text-white flex-1 cursor-pointer text-xl p-6">
              {unblockMutation.isPending ? "Unblocking..." : "Unblock Rooms"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;

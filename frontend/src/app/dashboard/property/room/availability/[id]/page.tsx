"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useBlockRoomByTenant, useUnBlockRoomByTenant } from "@/hooks/useRoom";
import { toast } from "sonner";

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
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Block / Unblock Room</h1>

      <div className="flex flex-col gap-4 mb-4">
        <div>
          <label className="block mb-1">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="border px-3 py-2 w-full rounded"
            minDate={new Date()}
          />
        </div>

        <div>
          <label className="block mb-1">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            className="border px-3 py-2 w-full rounded"
            minDate={startDate || new Date()}
            disabled={!startDate}
          />
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-medium mb-2">Select Dates:</h2>
        {generateDates().map((date) => {
          const dateId = format(date, "yyyy-MM-dd");
          return (
            <div key={dateId} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={!!selected[dateId]}
                onChange={() => handleCheckboxChange(dateId)}
              />
              <span>{dateId}</span>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          disabled={blockMutation.isPending}
          onClick={() => handleSubmit("block")}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50">
          {blockMutation.isPending ? "Blocking..." : "Block Rooms"}
        </button>

        <button
          type="button"
          disabled={unblockMutation.isPending}
          onClick={() => handleSubmit("unblock")}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50">
          {unblockMutation.isPending ? "Unblocking..." : "Unblock Rooms"}
        </button>
      </div>
    </div>
  );
};

export default Page;

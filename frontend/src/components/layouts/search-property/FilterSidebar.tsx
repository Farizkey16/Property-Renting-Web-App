"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryRadius = searchParams.get("radius") || "5";
  const queryMinPrice = searchParams.get("minPrice") || "0";
  const queryMaxPrice = searchParams.get("maxPrice") || "5000000";
  const queryCheckIn = searchParams.get("checkIn") || "";
  const queryCheckOut = searchParams.get("checkOut") || "";

  const [tempRadius, setTempRadius] = useState<number[]>([
    parseInt(queryRadius),
  ]);
  const [tempRange, setTempRange] = useState<number[]>([
    parseInt(queryMinPrice),
    parseInt(queryMaxPrice),
  ]);
  const [checkIn, setCheckIn] = useState<string>(queryCheckIn);
  const [checkOut, setCheckOut] = useState<string>(queryCheckOut);
  const [loading, setLoading] = useState(false);

  const applyFilters = () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(searchParams.toString());
      params.set("radius", tempRadius[0].toString());
      params.set("minPrice", tempRange[0].toString());
      params.set("maxPrice", tempRange[1].toString());

      if (checkIn) params.set("checkIn", checkIn);
      else params.delete("checkIn");

      if (checkOut) params.set("checkOut", checkOut);
      else params.delete("checkOut");

      router.replace(`?${params.toString()}`);
      setTimeout(() => setLoading(false), 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Radius */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          Radius ({tempRadius[0]} km)
        </Label>
        <Slider
          value={tempRadius}
          onValueChange={setTempRadius}
          min={1}
          max={20}
          step={1}
        />
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          Price ({tempRange[0].toLocaleString()} –{" "}
          {tempRange[1].toLocaleString()})
        </Label>
        <Slider
          value={tempRange}
          onValueChange={setTempRange}
          min={0}
          max={5_000_000}
          step={500_000}
        />
      </div>

      {/* Date */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Check-in & Check-out</Label>
        <div className="flex gap-2">
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="border rounded p-1"
          />
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="border rounded p-1"
          />
        </div>
      </div>

      {/* Search Button */}
      <Button onClick={applyFilters} className="w-full cursor-pointer">
        {loading ? "Loading..." : "Search"}
      </Button>
    </div>
  );
}

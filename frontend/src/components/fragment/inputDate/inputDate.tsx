"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Loader2, LucideMapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { GuestPicker } from "@/components/ui/GuestPicker";
import { addDays, format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MapboxFeature {
  id: string;
  place_name: string;
  center: [number, number];
}

export default function InputDate({ className }: { className?: string }) {
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const [openCheckOut, setOpenCheckOut] = useState(false);
  const [loading, setLoading] = useState(false);

  const [guests, setGuests] = useState({
    guests: 1,
    rooms: 1,
  });
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);

  const router = useRouter();

  // Handle guests change
  const handleGuestsChange = (newGuests: typeof guests) => {
    setGuests({
      guests: Math.min(newGuests.guests, 4),
      rooms: Math.max(newGuests.rooms, 1),
    });
  };

  // Handle location input
  const handleInputChange = async (value: string) => {
    setLocation(value);
    if (!value) return setSuggestions([]);

    try {
      const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          value
        )}.json?access_token=${token}&autocomplete=true&types=place&country=id`
      );
      if (!res.ok) throw new Error("Mapbox fetch failed");
      const data: { features: MapboxFeature[] } = await res.json();
      setSuggestions(data.features);
      setShowSuggestions(true);
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (place: MapboxFeature) => {
    setLocation(place.place_name);
    const [lng, lat] = place.center;
    setCoords({ lat, lng });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSelectNearby = () => {
    setLocation("Find Nearby");
    setSuggestions([]);
    setShowSuggestions(false);

    if (!navigator.geolocation) {
      alert("Browser tidak mendukung geolocation.");
      return;
    }

    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoLoading(false);
      },
      (err) => {
        alert("Gagal mendapatkan lokasi.");
        console.error(err);
        setGeoLoading(false);
      }
    );
  };

  // Handle search button
  const handleSearch = () => {
    if (!coords) return alert("Pilih lokasi terlebih dahulu!");
    if (!checkIn) return alert("Pilih tanggal check-in!");
    if (!checkOut) return alert("Pilih tanggal check-out!");

    setLoading(true);

    const params = new URLSearchParams({
      latitude: coords.lat.toString(),
      longitude: coords.lng.toString(),
      radius: "5",
      checkIn: format(checkIn, "yyyy-MM-dd"),
      checkOut: format(checkOut, "yyyy-MM-dd"),
      minPrice: "100000",
      maxPrice: "5000000",
      guests: guests.guests.toString(),
      rooms: guests.rooms.toString(),
    });

    router.push(`/property?${params.toString()}`);
  };

  const canSearch = !!coords && !!checkIn && !!checkOut && !geoLoading;

  return (
    <div className={cn("w-full flex flex-col lg:flex-row items-stretch border-2 rounded-4xl bg-white p-4 lg:p-0 gap-2 lg:gap-0 shadow-md  border-gray-200 ", className)}>
      {/* Location Input */}
      <div className="relative flex-1 px-2 lg:px-4">
        <input
          type="text"
          value={location}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Where are you going?"
          className="w-full px-2 py-2 lg:py-3 focus:outline-none text-gray-600 placeholder-gray-400 font-bold"
          onFocus={() => setShowSuggestions(true)}
        />
        {showSuggestions && (
          <ul className="absolute top-full left-0 right-0 bg-white border rounded-lg mt-1 max-h-60 overflow-auto shadow-md z-50">
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-100  text-blue-600 flex items-center font-bold"
              onMouseDown={handleSelectNearby}>
              <LucideMapPin className="w-4 h-4 mr-1" />
              Find nearby
            </li>
            {suggestions.map((place) => (
              <li
                key={place.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-left"
                onMouseDown={() => handleSelectSuggestion(place)}>
                {place.place_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Check-in */}
      <Popover open={openCheckIn} onOpenChange={setOpenCheckIn}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex-1 flex items-center px-4 py-2 text-left hover:bg-gray-50"
            onClick={() => setOpenCheckIn(!openCheckIn)}>
            <CalendarIcon className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600 font-bold">
              {checkIn ? format(checkIn, "LLL dd") : "Check in"}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Calendar
            mode="single"
            selected={checkIn}
            onSelect={(date) => {
              setCheckIn(date);
              setOpenCheckIn(false);
              setOpenCheckOut(true);
            }}
            disabled={{ before: new Date() }}
          />
        </PopoverContent>
      </Popover>

      {/* Check-out */}
      <Popover open={openCheckOut} onOpenChange={setOpenCheckOut}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex-1 flex items-center px-4 py-2 text-left hover:bg-gray-50"
            onClick={() => setOpenCheckOut(!openCheckOut)}>
            <CalendarIcon className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600 font-bold">
              {checkOut ? format(checkOut, "LLL dd") : "Check out"}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Calendar
            mode="single"
            selected={checkOut}
            onSelect={(date) => {
              setCheckOut(date);
              setOpenCheckOut(false);
            }}
            disabled={{ before: checkIn ? addDays(checkIn, 1) : new Date() }}
          />
        </PopoverContent>
      </Popover>

      {/* Guests Picker */}
      <div className="flex flex-1 flex-col lg:flex-row items-stretch lg:items-center lg:border-l lg:border-gray-200 font-bold">
        <GuestPicker value={guests} onChange={handleGuestsChange} />
      </div>

      {/* Search Button */}
      <div className="flex justify-end lg:flex-none items-center rounded-r-4xl">
        <Button
          className="rounded-full w-full h-full lg:w-auto flex items-center justify-center gap-2 cursor-pointer"
          onClick={handleSearch}
          disabled={!canSearch || loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Search
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

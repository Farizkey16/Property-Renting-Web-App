"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { CalendarIcon, LucideMapPin, Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { GuestPicker } from "@/components/ui/GuestPicker";

interface MapboxFeature {
  id: string;
  type: string;
  place_name: string;
  text: string;
  center: [number, number]; // [lng, lat]
  context?: Array<{ id: string; text: string }>;
}

export default function InputDate() {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [guests, setGuests] = React.useState({
    adults: 1,
    children: 0,
    rooms: 1
  })
  const [location, setLocation] = React.useState("");
  const [coords, setCoords] = React.useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [suggestions, setSuggestions] = React.useState<MapboxFeature[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const router = useRouter();

  const handleInputChange = async (value: string) => {
    setLocation(value);
    if (!value) {
      setSuggestions([]);
      return;
    }
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        value
      )}.json?access_token=${token}&autocomplete=true&types=place&country=id`
    );
    if (!res.ok) return;
    const data: { features: MapboxFeature[] } = await res.json();
    setSuggestions(data.features);
    setShowSuggestions(true);
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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => alert("Gagal mendapatkan lokasi.")
      );
    }
  };

  const handleSearch = () => {

    console.log("EXECUTION: handleSearch is running. The 'guests' state it sees is:", guests);
    if (!coords || !date?.from) {
      alert("Pilih lokasi dan tanggal terlebih dahulu!");
      return;
    }
    const params = new URLSearchParams({
      lat: coords.lat.toString(),
      lng: coords.lng.toString(),
      radius: "5",
      checkIn: format(date.from, "yyyy-MM-dd"),
      checkOut: format(date.to ?? date.from, "yyyy-MM-dd"),
      minPrice: "100000",
      maxPrice: "5000000",
      adults: guests.adults.toString(),
      children: guests.children.toString(),
      rooms: guests.rooms.toString()
    });
    router.push(`/property?${params.toString()}`);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row items-stretch border rounded-4xl bg-white p-4 lg:p-0 gap-2 lg:gap-0 shadow-sm">
      {/* Location Input */}
      <div className="relative flex-1 px-2 lg:px-4">
        <input
          type="text"
          value={location}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Where are you going?"
          className="w-full px-2 py-2 lg:py-3 focus:outline-none text-gray-600 placeholder-gray-400"
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        {showSuggestions && (
          <ul className="absolute top-full left-0 right-0 bg-white border rounded-lg mt-1 max-h-60 overflow-auto shadow-md z-50">
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 font-medium text-blue-600"
              onClick={handleSelectNearby}
            >
              <LucideMapPin className="w-4 h-4 inline mr-1" />
              Find nearby
            </li>
            {suggestions.map((place) => (
              <li
                key={place.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectSuggestion(place)}
              >
                {place.place_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Date pickers */}
      <div className="flex flex-1 flex-col lg:flex-row items-stretch lg:items-center lg:border-l lg:border-gray-200">
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex-1 flex items-center px-4 py-2 text-left hover:bg-gray-50">
              <CalendarIcon className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                {date?.from ? format(date.from, "LLL dd") : "Check in"}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Calendar
              mode="range"
              selected={date}
              onSelect={setDate}
              disabled={{ before: new Date() }}
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <button className="flex-1 flex items-center px-4 py-2 text-left hover:bg-gray-50">
              <CalendarIcon className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                {date?.to ? format(date.to, "LLL dd") : "Check out"}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Calendar mode="range" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
      </div>

      {/* Guests Picker */}
      <div className="flex flex-1 flex-col lg:flex-row items-stretch lg:items-center lg:border-l lg:border-gray-200">
        <GuestPicker value={guests} onChange={setGuests}/>
      </div>

      {/* Search Button */}
      <div className="flex justify-end lg:flex-none  items-center roundered-r-4xl">
        <Button
          className="rounded-full w-full h-full lg:w-auto"
          onClick={handleSearch}
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
}

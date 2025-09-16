"use client";

import {
  Building,
  Home,
  Castle,
  Hotel,
  Tent,
  Users,
  Globe,
} from "lucide-react";
import { PropertyCategory } from "@/types/property/property";
import { useRouter, useSearchParams } from "next/navigation";

interface PropertyTypeNavProps {
  onSelectCategory?: (value: string) => void;
  activeCategory: string;
}

const propertyTypes = [
  { icon: Globe, label: "All", value: "" },
  { icon: Building, label: "Apartment", value: PropertyCategory.apartment },
  { icon: Home, label: "House", value: PropertyCategory.house },
  { icon: Castle, label: "Villa", value: PropertyCategory.villa },
  { icon: Hotel, label: "Hotel", value: PropertyCategory.hotel },
  { icon: Tent, label: "Hostel", value: PropertyCategory.hostel },
  { icon: Users, label: "Guesthouse", value: PropertyCategory.guesthouse },
];

export function PropertyTypeNav({ activeCategory }: PropertyTypeNavProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sm:px-4 py-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 lg:justify-center lg:gap-6 lg:overflow-x-visible">
          {propertyTypes.map((type, index) => {
            const isActive = activeCategory === type.value;
            return (
              <div
                key={index}
                onClick={() => handleSelect(type.value)}
                className={`flex flex-col items-center space-y-1 sm:space-y-2 min-w-0 flex-shrink-0 px-2 sm:px-4 cursor-pointer rounded-lg py-2 transition-colors 
                   hover:bg-blue-50`}>
                <type.icon
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    isActive ? "text-blue-600" : "text-gray-600"
                  }`}
                />
                <span
                  className={`text-xs font-bold whitespace-nowrap text-center ${
                    isActive ? "text-blue-600 font-medium" : "text-gray-600"
                  }`}>
                  {type.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

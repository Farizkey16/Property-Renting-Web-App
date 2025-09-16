import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X } from "lucide-react";

interface PropertySearchProps {
  onFilterChange?: (filters: { name?: string }) => void;
}

export function FilterSection({ onFilterChange }: PropertySearchProps) {
  const [name, setName] = useState("");

  const handleSearchClick = () => {
    onFilterChange?.({ name });
  };

  const handleClear = () => {
    setName("");
    onFilterChange?.({ name: undefined });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="flex items-center gap-2 mb-6 w-full">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Find a property name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border rounded-3xl bg-white p-2 lg:p-3 text-sm w-full shadow-sm pr-8 font-bold"
        />

        {name && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white rounded-full cursor-pointer bg-gray-400
             w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 p-0">
            <X className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </Button>
        )}
      </div>

      <Button
        variant="default"
        size="lg"
        onClick={handleSearchClick}
        className="bg-blue-600 text-white rounded-4xl cursor-pointer">
        Search
      </Button>
    </div>
  );
}

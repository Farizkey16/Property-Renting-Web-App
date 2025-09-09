import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PropertySearchProps {
  onFilterChange?: (filters: { name?: string }) => void;
}

export function FilterSection({ onFilterChange }: PropertySearchProps) {
  const [name, setName] = useState("");

  const handleSearchClick = () => {
    onFilterChange?.({ name });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="flex items-center gap-2 mb-6">
      <input
        type="text"
        placeholder="Find a property..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border rounded-3xl bg-white p-2 lg:p-3  text-sm flex-grow shadow-sm"
      />
      <Button
        variant="default"
        size="sm"
        onClick={handleSearchClick}
        className="bg-blue-600 text-white rounded-2xl">
        Search
      </Button>
    </div>
  );
}

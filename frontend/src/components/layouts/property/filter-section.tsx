import { Button } from "@/components/ui/button";

const filterOptions = [
  { label: "All", active: true },
  { label: "Price: Low to High", active: false },
  { label: "Price: High to Low", active: false },
  { label: "Top Rating", active: false },
];

export function FilterSection() {
  return (
    <div className="space-y-4 mb-6">
      {/* Mobile Filter Options - Horizontal Scroll */}
      <div className="flex items-center gap-2 overflow-x-auto md:overflow-x-visible scrollbar-hide pb-2 md:pb-0 w-full max-w-full">
        {filterOptions.map((option, index) => (
          <Button
            key={index}
            variant={option.active ? "default" : "ghost"}
            size="sm"
            className={`${
              option.active ? "bg-black text-white" : "text-gray-600"
            } whitespace-nowrap flex-shrink-0`}>
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

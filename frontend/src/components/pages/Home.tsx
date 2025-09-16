"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { PropertyTypeNav } from "../layouts/property/property-type-nav";
import { FilterSection } from "../layouts/property/filter-section";
import { PropertyGrid } from "../layouts/property/property-grid";
import { useState, useEffect } from "react";
import { PropertyFilters } from "@/types/property/property";

const HomePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category") || "";

  const [filters, setFilters] = useState<PropertyFilters>({
    property_category: category || undefined,
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      property_category: category || undefined,
    }));
  }, [category]);

  useEffect(() => {
    if (category) {
      const el = document.getElementById("properties");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [category]);

  return (
    <section
      className="min-h-screen bg-gray-50 overflow-x-hidden"
      id="properties">
      <PropertyTypeNav
        activeCategory={category}
        onSelectCategory={(value) => {
          const params = new URLSearchParams(searchParams.toString());
          if (value) {
            params.set("category", value);
          } else {
            params.delete("category");
          }
          router.push(`?${params.toString()}`, { scroll: false });
        }}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <FilterSection
          onFilterChange={(newFilters) =>
            setFilters((prev) => ({ ...prev, ...newFilters }))
          }
        />

        <PropertyGrid filters={filters} />
      </div>
    </section>
  );
};

export default HomePage;

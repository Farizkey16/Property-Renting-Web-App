"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { PropertyTypeNav } from "../layouts/property/property-type-nav";
import { FilterSection } from "../layouts/property/filter-section";
import { PropertyGrid } from "../layouts/property/property-grid";

const HomePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category") || "";

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <PropertyTypeNav
        activeCategory={category}
        onSelectCategory={(value) => {
          const params = new URLSearchParams(searchParams.toString());
          if (value) {
            params.set("category", value);
          } else {
            params.delete("category");
          }
          router.push(`?${params.toString()}`);
        }}
      />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <FilterSection />
        <PropertyGrid category={category} />
      </div>
    </div>
  );
};

export default HomePage;

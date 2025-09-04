"use client";
import { PropertyTypeNav } from "../layouts/property/property-type-nav";
import PropertyDiscovery from "../layouts/search-property/Search";
import { useRouter, useSearchParams } from "next/navigation";

const SerachPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categories = searchParams.get("category") || "";
  return (
    <div className="min-h-auto bg-gray-50">
      <PropertyTypeNav
        activeCategory={categories}
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
      <PropertyDiscovery category={categories} />
    </div>
  );
};

export default SerachPage;

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { PropertyTypeNav } from "./property-type-nav";
import { PropertyGrid } from "./property-grid";

export function PropertyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category") || "";

  return (
    <div>
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
      <PropertyGrid category={category} />
    </div>
  );
}

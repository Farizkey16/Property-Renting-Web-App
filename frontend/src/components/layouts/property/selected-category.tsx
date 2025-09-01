"use client";

import { useState } from "react";
import { PropertyTypeNav } from "./property-type-nav";
import { PropertyGrid } from "./property-grid";

export function PropertyPage() {
  const [category, setCategory] = useState<string>("");

  return (
    <div>
      <PropertyTypeNav
        onSelectCategory={setCategory}
        activeCategory={category}
      />
      <PropertyGrid category={category} />
    </div>
  );
}

"use client";

import { useState } from "react";
import { PropertyTypeNav } from "./property-type-nav";
import { PropertyGrid } from "./property-grid";

export function PropertyPage() {
  const [category, setCategory] = useState<string>("");

  return (
    <div>
<<<<<<< HEAD
      <PropertyTypeNav
        onSelectCategory={setCategory}
        activeCategory={category}
      />
=======
      <PropertyTypeNav onSelectCategory={setCategory} />
>>>>>>> main
      <PropertyGrid category={category} />
    </div>
  );
}

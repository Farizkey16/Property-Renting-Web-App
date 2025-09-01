"use client";

import React, { useState } from "react";
import { PropertyTypeNav } from "../layouts/property/property-type-nav";
import { FilterSection } from "../layouts/property/filter-section";
import { PropertyGrid } from "../layouts/property/property-grid";

const HomePage = () => {
  const [category, setCategory] = useState("");
  return (
    <div className="min-h-screen bg-gray-50">
      <PropertyTypeNav
        onSelectCategory={setCategory}
        activeCategory={category}
      />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <FilterSection />
        <PropertyGrid category={category} />
      </div>
    </div>
  );
};

export default HomePage;

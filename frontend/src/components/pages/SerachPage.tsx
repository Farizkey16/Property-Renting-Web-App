"use client";
import React, { useState } from "react";
import { PropertyTypeNav } from "../layouts/property/property-type-nav";
import PropertyDiscovery from "../layouts/search-property/Search";

const SerachPage = () => {
  const [category, setCategory] = useState("");
  return (
    <div className="min-h-auto bg-gray-50">
      <PropertyTypeNav
        onSelectCategory={setCategory}
        activeCategory={category}
      />
      <PropertyDiscovery category={category} />
    </div>
  );
};

export default SerachPage;

"use client";
import InputDate from "../fragment/inputDate/inputDate";
import { PropertyTypeNav } from "../layouts/property/property-type-nav";
import PropertyDiscovery from "../layouts/search-property/Search";
import { useRouter, useSearchParams } from "next/navigation";

const SerachPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categories = searchParams.get("category") || "";
  return (
    <div className="min-h-auto  ">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-6xl p-2">
          <InputDate />
        </div>
      </div>
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

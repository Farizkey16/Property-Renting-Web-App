import InputDate from "@/components/fragment/inputDate/inputDate";
import MapLoading from "@/components/fragment/loading-error/MapLoading";
import { PropertyTypeNav } from "@/components/layouts/property/property-type-nav";
import PropertyDiscovery from "@/components/layouts/search-property/Search";
import React, { Suspense } from "react";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function SearchPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const categories = searchParams.category || "";
  return (
    <main className="min-h-screen flex flex-col">
      <div className="relative h-[70px] bg-cover bg-center "></div>
      {/* Content */}
      <div className="min-h-auto">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-full max-w-6xl p-2">
            <InputDate />
          </div>
        </div>
        <PropertyTypeNav activeCategory={categories} />
        <Suspense fallback={MapLoading()}>
          <PropertyDiscovery
            searchParams={searchParams}
            category={categories}
          />
        </Suspense>
      </div>
    </main>
  );
}

import { HeroSection } from "@/components/layouts/hero/hero";
import DestinationCard from "@/components/layouts/destination-carousel/DestinationCard";
import { Suspense } from "react";
import { PropertyCardSkeleton } from "@/components/fragment/loading-error/PropertyCardSkeleton";
import PropertySection from "@/components/pages/PropertySection";
import { Banner } from "@/components/layouts/banner/Banner";

const ITEMS_PER_PAGE = 8;

type SearchParams = Promise<{ [key: string]: string | undefined }>;
export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const category = searchParams.category;
  const name = searchParams.name;
  const page = Number(searchParams.page) || 1;

  return (
    <>
      <HeroSection />
      <DestinationCard />

      <Suspense
        key={page + category! + name}
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-4 md:p-8 lg:p-24">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        }>
        <PropertySection category={category} name={name} page={page} />
      </Suspense>
      <Banner />
    </>
  );
}

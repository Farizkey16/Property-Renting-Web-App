import { HeroSection } from "@/components/layouts/hero/hero";
import HomePage from "@/components/pages/Home";
import DestinationCard from "@/components/layouts/destination-carousel/DestinationCard";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <DestinationCard />
      <HomePage />
    </>
  );
}

import PromoCard from "@/components/layouts/promo-carousel/PromoCard";
import HomePage from "@/components/pages/Home";

export default function Home() {
  return (
    <div>
      <div id="property">
        <HomePage />
      </div>
      <div id="promo">
        <PromoCard />
      </div>
    </div>
  );
}

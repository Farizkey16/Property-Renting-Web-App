import InputDate from "@/components/fragment/inputDate/inputDate";

export function HeroSection() {
  return (
    <section
      className="relative w-full h-[650px] bg-cover bg-center"
      style={{ backgroundImage: "url(/hero.jpg)" }}>
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        {/* Headline */}
        <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight mb-4">
          Temukan Properti Impianmu. <br className="hidden md:block" />
          <span className="text-amber-400">Sewa dengan Mudah.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-white text-lg italic leading-relaxed max-w-xl mx-auto mb-8">
          Cari apartemen, rumah, atau villa terbaik sesuai kebutuhanmu – cepat
          dan praktis.
        </p>

        {/* Input Date */}
        <div className="w-full max-w-6xl">
          <InputDate />
        </div>
      </div>
    </section>
  );
}

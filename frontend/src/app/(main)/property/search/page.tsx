import PropertyDetailPage from "@/components/pages/Detail";
import React from "react";

const page = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="relative h-[70px] bg-cover bg-center "></div>
      {/* Content */}
      <PropertyDetailPage />
    </main>
  );
};

export default page;

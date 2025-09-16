import SerachPage from "@/components/pages/SerachPage";
import React from "react";

const page = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="relative h-[70px] bg-cover bg-center "></div>
      {/* Content */}
      <SerachPage />
    </main>
  );
};

export default page;

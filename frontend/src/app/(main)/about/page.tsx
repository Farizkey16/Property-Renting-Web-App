import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "About Us | Homz",
};

const About = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <div
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage: "url(/hero.jpg)",
        }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10">
          <div className="flex items-center text-white/80 text-sm">
            <span>About Us</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            ABOUT US.
          </h1>
        </div>

        {/* Grid: Sidebar + Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="md:col-span-1">
            <nav className="space-y-2 text-sm">
              <div className="font-medium text-gray-800">Company Profile</div>
              <div className="font-medium text-gray-800">Our Team</div>
              <div className="font-medium text-gray-800">Media</div>
            </nav>
          </div>

          <div className="md:col-span-3 p-2">
            <div className="max-w-3xl">
              <p className="text-sm mb-6">
                Homz adalah aplikasi penyewaan properti modern yang memudahkan
                masyarakat Indonesia menemukan hunian impian mereka. Sejak
                diluncurkan, Homz telah membantu ribuan penyewa dan pemilik
                properti untuk terhubung dengan cepat, aman, dan nyaman.
              </p>
              <p className="text-sm mb-6">
                Di Homz, kami percaya bahwa rumah lebih dari sekadar tempat
                tinggal — rumah adalah bagian dari kehidupan. Karena itu, kami
                terus berinovasi menghadirkan teknologi yang membuat pencarian
                dan penyewaan properti menjadi lebih mudah, transparan, dan
                terjangkau bagi semua orang.
              </p>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="flex flex-col justify-center">
            <div className="text-4xl font-serif italic">
              <span className="text-5xl">“</span>
              <p className="my-4">
                Kami tidak hanya menyediakan properti — kami membantu orang
                menemukan tempat di mana mereka merasa benar-benar pulang.
              </p>
              <div className="text-right">
                <span className="text-5xl">”</span>
              </div>
            </div>
            <p className="text-sm mt-2">— CEO, Homz</p>
          </div>
          <div>
            <Image
              src="/malang.jpg"
              alt="Homz Vision"
              width={600}
              height={400}
              className="w-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Team Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
          <div className="flex justify-center">
            <Image
              src="/jakarta.jpg"
              alt="Homz Team"
              width={500}
              height={500}
              className="w-full max-w-sm md:max-w-lg object-cover rounded-xl"
            />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">
              OUR TEAM.
            </h2>
            <div className="space-y-6 max-w-lg">
              <p className="text-sm text-gray-600">
                Kami adalah tim yang bersemangat dalam membangun solusi properti
                terbaik di Indonesia. Dari developer, desainer, hingga customer
                support, semua bekerja bersama untuk menghadirkan pengalaman
                penyewaan properti yang lebih mudah dan menyenangkan.
              </p>
              <p className="text-sm text-gray-600">
                Budaya kerja kami menggabungkan inovasi teknologi, empati
                terhadap pengguna, dan nilai customer-first — memastikan setiap
                orang merasa didukung dalam menemukan hunian terbaik.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold">10,000+</div>
                <div className="text-xs text-gray-500">Properti Tersedia</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">500K+</div>
                <div className="text-xs text-gray-500">Pengguna Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">95%</div>
                <div className="text-xs text-gray-500">
                  Tingkat Kepuasan Pengguna
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">200+</div>
                <div className="text-xs text-gray-500">
                  Mitra & Pemilik Properti
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;

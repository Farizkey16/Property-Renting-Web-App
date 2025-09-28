import { BsFillCalendarDateFill } from "react-icons/bs";
import { MdPayment, MdOutlineTravelExplore } from "react-icons/md";

export function Banner() {
  const features = [
    {
      icon: BsFillCalendarDateFill,
      title: "Atur jadwal mudah",
      description: "Atur jadwal perjalanan dengan fleksibel.",
    },
    {
      icon: MdPayment,
      title: "Pembayaran online",
      description: "Dukung berbagai metode pembayaran online yang aman.",
    },
    {
      icon: MdOutlineTravelExplore,
      title: "Banyak destinasi",
      description: "Pilihan destinasi populer di seluruh Indonesia.",
    },
  ];

  return (
    <section className="w-full py-12 px-4  ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
          Kenapa pilih Homz?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 ">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center md:items-start md:text-left  border-2 border-gray-200 rounded-2xl p-4 shadow-md">
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-gray-100 rounded-lg">
                  <IconComponent className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

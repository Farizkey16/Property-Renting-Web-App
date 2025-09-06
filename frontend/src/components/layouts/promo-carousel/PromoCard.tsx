"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";

type DummyVoucher = {
  id: number;
  code: string;
  discount: number;
  discountType: "PERCENTAGE" | "AMOUNT";
  quota: number;
  used: number;
  startDate: string;
  endDate: string;
  event: {
    id: number;
    title: string;
    category: string;
    location: string;
    picture: string;
  };
};

const dummyVoucher: DummyVoucher[] = [
  {
    id: 1,
    code: "RENT50",
    discount: 50,
    discountType: "PERCENTAGE",
    quota: 100,
    used: 25,
    startDate: "2025-09-01",
    endDate: "2025-09-30",
    event: {
      id: 1,
      title: "Luxury Apartment Promo",
      category: "Apartment",
      location: "Jakarta, Indonesia",
      picture: "https://picsum.photos/seed/apartment1/600/400",
    },
  },
  {
    id: 2,
    code: "STAY100K",
    discount: 100000,
    discountType: "AMOUNT",
    quota: 50,
    used: 10,
    startDate: "2025-09-05",
    endDate: "2025-10-05",
    event: {
      id: 2,
      title: "Studio Room Special",
      category: "Studio",
      location: "Bandung, Indonesia",
      picture: "https://picsum.photos/seed/studio1/600/400",
    },
  },
  {
    id: 3,
    code: "FAMILY20",
    discount: 20,
    discountType: "PERCENTAGE",
    quota: 80,
    used: 40,
    startDate: "2025-09-10",
    endDate: "2025-09-25",
    event: {
      id: 3,
      title: "Family Suite Deal",
      category: "Family Room",
      location: "Surabaya, Indonesia",
      picture: "https://picsum.photos/seed/family1/600/400",
    },
  },
  {
    id: 4,
    code: "FAMILY20",
    discount: 20,
    discountType: "PERCENTAGE",
    quota: 80,
    used: 40,
    startDate: "2025-09-10",
    endDate: "2025-09-25",
    event: {
      id: 3,
      title: "Family Suite Deal",
      category: "Family Room",
      location: "Surabaya, Indonesia",
      picture: "https://picsum.photos/seed/family1/600/400",
    },
  },
  {
    id: 5,
    code: "FAMILY20",
    discount: 20,
    discountType: "PERCENTAGE",
    quota: 80,
    used: 40,
    startDate: "2025-09-10",
    endDate: "2025-09-25",
    event: {
      id: 3,
      title: "Family Suite Deal",
      category: "Family Room",
      location: "Surabaya, Indonesia",
      picture: "https://picsum.photos/seed/family1/600/400",
    },
  },
];

export default function PromoCard() {
  const [api, setApi] = useState<CarouselApi>();
  const [voucher] = useState<DummyVoucher[]>(dummyVoucher);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Best deals for you
      </h2>

      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: voucher.length >= 4,
        }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {voucher.map((card) => (
            <CarouselItem
              key={card.id}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="h-full">
                <Link href={`/event/${card.event.id}`} target="_blank">
                  <Card className="relative border-0 overflow-hidden h-full min-h-[15rem]">
                    <div className="relative w-full h-full hover:scale-105 transition-all duration-200">
                      <Image
                        src={card.event.picture}
                        alt={card.event.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/70 z-[1]" />
                      <CardContent className="relative z-20 h-full flex flex-col justify-between p-6 text-white">
                        <div>
                          <div className="flex justify-between mb-6">
                            <div className="text-sm font-medium opacity-90">
                              {card.event.category}
                            </div>
                            <Badge variant="secondary" className="font-bold">
                              #{card.code}
                            </Badge>
                          </div>

                          <div className="text-xs mb-1 opacity-80 truncate">
                            {card.event.location}
                          </div>
                          <h3 className="text-lg font-bold truncate mb-1">
                            {card.event.title}
                          </h3>
                          <Badge
                            variant="secondary"
                            className="font-bold rounded-full bg-amber-500 text-white">
                            {card.quota - card.used} left
                          </Badge>

                          {card.discount && (
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xl">Discount up to</span>
                              <span className="text-2xl font-bold text-green-500">
                                {card.discountType === "PERCENTAGE"
                                  ? `${card.discount}%`
                                  : `${formatCurrency(card.discount)}`}
                              </span>
                            </div>
                          )}
                          <p className="text-sm opacity-90">
                            {formatDate(card.startDate)} available until{" "}
                            {formatDate(card.endDate)}
                          </p>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {voucher.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              current === index ? "bg-gray-800" : "bg-gray-300"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
          See more promos
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

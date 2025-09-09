"use client";

import Image from "next/image";
import { Heart, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRoomSearch } from "@/hooks/useRoom";
import { formatCurrency } from "@/lib/utils";
import { PropertyDetailSkeleton } from "../fragment/loading-error/PropertyDetailSkeleton";
import { DateRange } from "react-day-picker";
import { ReviewList } from "../reviews/reviews-card";

interface Review {
  id: string
  userName: string
  userAvatar: string
  yearsOnPlatform: number
  rating: number
  date: string
  content: string
  isExpanded?: boolean
}

interface ReviewsCardProps {
  reviews: Review[]
  reviewsPerPage?: number
}

import { DatePickerWithRange } from "../ui/DatePickerPopover";
import { GuestPicker } from "../ui/GuestPicker";
import { addDays, format, startOfDay } from "date-fns";


export default function PropertyDetailPage() {

  const router = useRouter();
  const params = useSearchParams();

  const propertyname = params.get("propertyname") || undefined;
  const roomname = params.get("roomname") || undefined;
  const todayDefault = startOfDay(new Date());
  const tomorrowDefault = addDays(todayDefault, 1);

  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const checkInParam = params.get("checkIn");
    const checkOutParam = params.get("checkOut");

    if (checkInParam && checkOutParam) {
      return {
        from: new Date(checkInParam),
        to: new Date(checkOutParam),
      };
    }

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return { from: today, to: tomorrow };
  });

  const [guests, setGuests] = useState({
    guests: 1,
    rooms: 1,
  });

  useEffect(() => {
    const guestsParam = params.get("guests");
    const roomsParam = params.get("rooms");

    if (guestsParam) {
      const totalGuests = parseInt(guestsParam, 10);

      setGuests((prev) => ({
        ...prev,
        guests: totalGuests,
        rooms: roomsParam ? parseInt(roomsParam, 10) : prev.rooms,
      }));
    }
  }, [params]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (params.get("checkIn") && params.get("checkOut")) {
      setOpen(true);
    }
  }, [params]);
  const checkInParam =
    params.get("checkIn") ?? format(todayDefault, "yyyy-MM-dd");
  const checkOutParam =
    params.get("checkOut") ?? format(tomorrowDefault, "yyyy-MM-dd");

  const { data, isLoading, isError } = useRoomSearch(
    propertyname,
    roomname,
    checkInParam,
    checkOutParam
  );

  const handleSearchDate = () => {
    if (!dateRange?.from || !dateRange?.to) {
      alert("Please select a date range.");
      return;
    }

    const checkIn = format(dateRange.from, "yyyy-MM-dd");
    const checkOut = format(dateRange.to, "yyyy-MM-dd");

    const paramsObj = new URLSearchParams(Array.from(params.entries()));
    paramsObj.set("checkIn", checkIn);
    paramsObj.set("checkOut", checkOut);

    router.replace(`?${paramsObj.toString()}`, { scroll: false });
  };

  const propertyId = data?.property?.id;
  const roomId = data?.id;

  const totalGuests = guests.toString();
  const rooms = guests.rooms.toString();

  if (isLoading) return <PropertyDetailSkeleton />;
  if (isError) return <div className="p-8">Something went wrong</div>;

  const handleReserveNow = () => {
    if (!dateRange?.from || !dateRange?.to) {
      alert("Please select a date range.");
      return;
    }

    const checkIn = format(dateRange.from, "yyyy-MM-dd");
    const checkOut = format(dateRange.to, "yyyy-MM-dd");

    router.push(
      `/dashboard/booking-detail?propertyId=${propertyId}&roomId=${roomId}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${totalGuests}&rooms=${rooms}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-4 lg:col-span-3">
                <Image
                  src={data?.image || "/placeholder.svg"}
                  alt="Main workspace area"
                  width={800}
                  height={500}
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              </div>
              <div className="col-span-4 lg:col-span-1 grid gap-2">
                <Image
                  src={data?.room_images?.[1]?.image_url || "/placeholder.svg"}
                  alt="Bedroom area"
                  width={300}
                  height={195}
                  className="w-full h-[195px] object-cover rounded-lg"
                />
                <Image
                  src={data?.room_images?.[2]?.image_url || "/placeholder.svg"}
                  alt="Kitchen area"
                  width={300}
                  height={195}
                  className="w-full h-[195px] object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Property Info */}
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {data.name || "Property Name"}
                  </h1>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    <span className="text-sm font-medium">4.6</span>
                    <span className="text-sm text-gray-500">(241 ratings)</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" aria-label="Add to wishlist">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Description</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {data.description}
                  </p>
                </CardContent>
              </Card>

              {/* Opening Hours */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Opening hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Mon – Fri</span>
                      <span className="text-sm">8:00 am – 9:00 pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Sat</span>
                      <span className="text-sm">9:00 am – 9:00 pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Sun</span>
                      <span className="text-sm">10:00 am – 7:00 pm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="px-4 py-6">
                <h3 className="text-lg font-medium ">Reviews & Ratings</h3>
                <ReviewList propertyId={propertyId}/>
              </Card>

              <Card>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center items-center">
                  <div>
                    <Image
                      src={data.property.main_image || "/placeholder.svg"}
                      alt={data.property.name || "Property Image"}
                      width={600}
                      height={400}
                      className="w-full h-[400px] object-cover rounded-lg"
                    />
                  </div>
                  <CardContent className="space-y-2">
                    <h3 className="text-lg font-medium mb-2">
                      Property Information
                    </h3>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div>
                        <strong>Name:</strong> {data.property.name}
                      </div>
                      <div>
                        <strong>Address:</strong> {data.property.address}
                      </div>
                      <div>
                        <strong>City:</strong> {data.property.city}
                      </div>
                      <div>
                        <strong>Province:</strong> {data.property.province}
                      </div>
                      <div>
                        <strong>Property Type:</strong>{" "}
                        {data.property.property_category}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>

          {/* Mobile Fixed Booking Bar */}
          {!open && (
            <div
              onClick={() => setOpen(true)}
              className="fixed bottom-0 left-0 w-full p-4 bg-white border-t shadow-lg z-40 lg:hidden cursor-pointer">
              <div className="flex justify-between items-center mt-4">
                <div>
                  <span className="text-sm text-gray-600">From</span>
                  {data.pricing?.total ? (
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 line-through">
                        {formatCurrency(data.base_price)}
                      </span>
                      <span className="text-2xl font-bold text-gray-900">
                        {formatCurrency(data.pricing.total)}
                      </span>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(data.base_price)}
                    </div>
                  )}
                </div>

                <div className="text-right">
                  {data.pricing?.total ? (
                    <span className="text-lg font-semibold text-green-600">
                      Total Price
                    </span>
                  ) : data.peak_season_rates?.length > 0 ? (
                    <span className="text-lg font-semibold text-orange-500">
                      Peak Rate
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          {/* Modal Booking Detail (Mobile) */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book this space</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 ">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm text-gray-600">Choose a date</span>
                  {/* 🔥 tombol search date untuk mobile modal */}
                  <Button
                    onClick={handleSearchDate}
                    className="ml-auto rounded-4xl">
                    Search Date
                  </Button>
                </div>
                <DatePickerWithRange
                  date={dateRange}
                  onDateChange={setDateRange}
                  className="mt-4"
                />

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Guests & Rooms</span>
                </div>
                <GuestPicker value={guests} onChange={setGuests} />

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <span className="text-sm text-gray-600">From</span>
                    {data.pricing?.total ? (
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500 line-through">
                          {formatCurrency(data.base_price)}
                        </span>
                        <span className="text-2xl font-bold text-gray-900">
                          {formatCurrency(data.pricing.total)}
                        </span>
                      </div>
                    ) : (
                      <div className="text-2xl font-bold text-gray-900">
                        {formatCurrency(data.base_price)}
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    {data.pricing?.total ? (
                      <span className="text-lg font-semibold text-green-600">
                        Total Price
                      </span>
                    ) : data.peak_season_rates?.length > 0 ? (
                      <span className="text-lg font-semibold text-orange-500">
                        Peak Rate
                      </span>
                    ) : null}
                  </div>
                </div>

                <Button
                  onClick={handleReserveNow}
                  className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Reserve now
                </Button>
                <div className="text-xs text-gray-500 text-center">
                  You won&apos;t be charged until after your reservation begins.
                  Cancellations are free up to 2 hours before.
                </div>
                <Button variant="outline" className="w-full">
                  Request free tour
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Desktop Booking Column */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm text-gray-600">Choose a date</span>
                    {/* tombol search date untuk cari tanggal tersedia */}
                    <Button
                      onClick={handleSearchDate}
                      className="ml-auto rounded-4xl">
                      search date
                    </Button>
                  </div>
                  <DatePickerWithRange
                    date={dateRange}
                    onDateChange={setDateRange}
                  />

                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-sm text-gray-600">
                      Guests & Rooms
                    </span>
                  </div>
                  <GuestPicker value={guests} onChange={setGuests} />
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <span className="text-sm text-gray-600">From</span>

                      {data.pricing?.total ? (
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500 line-through">
                            {formatCurrency(data.base_price)}
                          </span>
                          <span className="text-2xl font-bold text-gray-900">
                            {formatCurrency(data.pricing.total)}
                          </span>
                        </div>
                      ) : (
                        <div className="text-2xl font-bold text-gray-900">
                          {formatCurrency(data.base_price)}
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      {data.pricing?.total ? (
                        <span className="text-lg font-semibold text-green-600">
                          Total Price
                        </span>
                      ) : data.peak_season_rates?.length > 0 ? (
                        <span className="text-lg font-semibold text-orange-500">
                          Peak Rate
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <Button
                    onClick={handleReserveNow}
                    className="w-full bg-green-500 hover:bg-green-600 text-white mt-4">
                    Reserve now
                  </Button>
                  <div className="text-xs text-gray-500 text-center">
                    You won&apos;t be charged until after your reservation
                    begins. Cancellations are free up to 2 hours before.
                  </div>
                  <Button variant="outline" className="w-full mt-2">
                    Request free tour
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

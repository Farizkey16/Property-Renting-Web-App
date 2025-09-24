"use client";

import { Calendar } from "lucide-react";
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
import { useRoomPricing, useRoomSearch } from "@/hooks/useRoom";
import { DateRange } from "react-day-picker";
import { addDays, format, startOfDay } from "date-fns";
import { CardBookingSkeleton } from "@/components/fragment/loading-error/PropertyDetailSkeleton";
import { DatePickerWithRange } from "@/components/fragment/date-picker/DatePickerPopover";
import { GuestPicker } from "@/components/ui/GuestPicker";
import { PriceSection } from "./PriceSection";

export default function BookingSectionPage() {
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

  const [hasSelectedDate, setHasSelectedDate] = useState(false);
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

  const { data: priceData, isLoading: priceLoading } = useRoomPricing(
    propertyname,
    roomname,
    hasSelectedDate ? format(dateRange!.from as Date, "yyyy-MM-dd") : undefined,
    hasSelectedDate ? format(dateRange!.to as Date, "yyyy-MM-dd") : undefined
  );

  useEffect(() => {
    if (hasSelectedDate && dateRange?.from && dateRange?.to) {
      const timeoutId = setTimeout(() => {
        const checkIn = format(dateRange.from as Date, "yyyy-MM-dd");
        const checkOut = format(dateRange.to as Date, "yyyy-MM-dd");

        const paramsObj = new URLSearchParams(window.location.search);
        paramsObj.set("checkIn", checkIn);
        paramsObj.set("checkOut", checkOut);

        router.replace(`?${paramsObj.toString()}`, { scroll: false });
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [dateRange, hasSelectedDate, router]);

  if (isLoading) return <CardBookingSkeleton />;
  if (isError) return <div className="p-8">Something went wrong</div>;

  const propertyId = data?.property?.id;
  const roomId = data?.id;

  const totalGuests = guests.guests.toString();
  const rooms = guests.rooms.toString();

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

  const handleReserveNow = () => {
    if (!dateRange?.from || !dateRange?.to) {
      alert("Please select a date range.");
      return;
    }

    const checkIn = format(dateRange.from, "yyyy-MM-dd");
    const checkOut = format(dateRange.to, "yyyy-MM-dd");

    router.push(
      `/dashboard/booking-detail?propertyId=${propertyId}&roomId=${roomId}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${totalGuests}&rooms=${rooms}&total=${priceData?.total}`
    );
  };

  return (
    <>
      {/* Mobile Fixed Booking Bar */}
      {!open && (
        <div
          onClick={() => setOpen(true)}
          className="fixed bottom-0 left-0 w-full p-4 bg-white border-t shadow-lg z-40 lg:hidden cursor-pointer">
          <div className="flex justify-between items-center mt-4">
            <PriceSection
              basePrice={priceData?.base_price ?? data.base_price}
              total={priceData?.total}
              peakRates={priceData?.peak_season_rates}
              loading={priceLoading}
            />
          </div>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book this space</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 ">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm text-gray-600">Choose a date</span>
              <Button
                onClick={handleSearchDate}
                className="ml-auto rounded-4xl">
                Search Date
              </Button>
            </div>
            <DatePickerWithRange
              date={dateRange}
              onDateChange={(range) => {
                if (!range?.from || !range?.to) {
                  setDateRange(undefined);
                  setHasSelectedDate(false);
                  return;
                }

                setDateRange(range);
                setHasSelectedDate(true);
              }}
            />

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Guests & Rooms</span>
            </div>
            <GuestPicker value={guests} onChange={setGuests} />

            <div className="flex justify-between items-center mt-4">
              <PriceSection
                basePrice={priceData?.base_price ?? data.base_price}
                total={priceData?.total}
                peakRates={priceData?.peak_season_rates}
                loading={priceLoading}
              />
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
          </div>
        </DialogContent>
      </Dialog>

      <div className="hidden lg:block lg:col-span-1 ">
        <div className="sticky top-[80px]">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm text-gray-600">Choose a date</span>

                <Button
                  onClick={handleSearchDate}
                  className="ml-auto rounded-4xl">
                  search date
                </Button>
              </div>
              <DatePickerWithRange
                date={dateRange}
                onDateChange={(range) => {
                  if (!range?.from || !range?.to) {
                    setDateRange(undefined);
                    setHasSelectedDate(false);
                    return;
                  }

                  setDateRange(range);
                  setHasSelectedDate(true);
                }}
              />

              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm text-gray-600">Guests & Rooms</span>
              </div>
              <GuestPicker value={guests} onChange={setGuests} />

              <div className="flex justify-between items-center mt-4">
                <PriceSection
                  basePrice={priceData?.base_price ?? data.base_price}
                  total={priceData?.total}
                  peakRates={priceData?.peak_season_rates}
                  loading={priceLoading}
                />
              </div>

              <Button
                onClick={handleReserveNow}
                className="w-full bg-green-500 hover:bg-green-600 text-white mt-4">
                Reserve now
              </Button>
              <div className="text-xs text-gray-500 text-center">
                You won&apos;t be charged until after your reservation begins.
                Cancellations are free up to 2 hours before.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Wifi, Coffee } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePropertyById } from "@/hooks/useProperty";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";

import { usePriceQuote } from "@/hooks/usePriceQuote";
import { formatCurrency } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { createBooking } from "@/services/transactions.services";
import { useRoomAvailability } from "@/hooks/useRoom";
import Image from "next/image";
import { Spinner } from "@/components/ui/shadcn-io/spinner";


export default function BookingDetailsForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+62",
    mobileNumber: "",
  });
  const router = useRouter();

  const { mutate: createNewBooking, isPending } = useMutation({
    mutationFn: createBooking,

    onSuccess: (data) => {
      const bookingId = data.data.id;

      console.log("Booking created successfully!", data);
      console.log("ID is:", bookingId);

      toast.success("Your booking has been made! Please proceed to payment.");
      router.push(`/dashboard/payment-page/${bookingId}`);
    },

    onError: (error) => {
      console.error("Failed to create booking:", error);
      toast.error(error.message);
    },
  });

  // Fetch Booking Details
  const searchParams = useSearchParams();

  const startDateString = searchParams.get("checkIn");
  const endDateString = searchParams.get("checkOut");
  const property_id = searchParams.get("propertyId") ?? undefined;
  const total = searchParams.get("total");
  const room_id = searchParams.get("roomId");
  const guests = searchParams.get("guests");
  const rooms = searchParams.get("rooms");

  if (
    !startDateString ||
    !endDateString ||
    !property_id ||
    !room_id ||
    !guests ||
    !rooms
  ) {
    throw new Error("Query does not exist.");
  }

  // Parse for Display
  const startDate = startDateString ? parseISO(startDateString) : new Date();
  const endDate = endDateString ? parseISO(endDateString) : new Date();
  const startDateDisplay = format(startDate, "eee, d MMM yyyy");
  const endDateDisplay = format(endDate, "eee, d MMM yyyy");

  const { data: property} =
    usePropertyById(property_id);

  const { data: priceDetails} = usePriceQuote(
    room_id!,
    startDateString!,
    endDateString!,
    total!
  );

  console.log("DEBUG: Price Details:", priceDetails);

  const checkIn = startDateString;
  const checkOut = endDateString;

  const {
    data: availableCount,
    status,
    isLoading,
    isError,
    error,
  } = useRoomAvailability({
    roomId: room_id,
    checkIn,
    checkOut: checkOut,
  });
  console.log("DEBUG: Query Status:", {
    status,
    isLoading,
    isError,
    error,
    availableCount,
  });

  const selectedRoom = property?.rooms?.find((r) => r.id === room_id);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    const checkInDate = searchParams.get("checkIn");
    const checkOutDate = searchParams.get("checkOut");
    const propertyId = searchParams.get("propertyId") ?? undefined;
    const roomId = searchParams.get("roomId");
    const guests = searchParams.get("guests");
    const quantity = searchParams.get("rooms");

    if (
      !propertyId ||
      !roomId ||
      !checkInDate ||
      !checkOutDate ||
      !guests ||
      !quantity
    ) {
      alert(
        "Error: Booking information is incomplete in the URL. Cannot proceed."
      );
      return;
    }

    const finalBookingPayload = {
      propertyId: propertyId,
      roomId: roomId,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      guests: Number(guests),
      quantity: Number(quantity),

      ...formData,

      totalPrice: priceDetails?.totalPrice,
      nights: priceDetails?.nights,
      subtotal: priceDetails?.subtotal,
      taxesAndFees: priceDetails?.taxesAndFees,
    };

    createNewBooking(finalBookingPayload);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Details */}
            <Card className="py-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Contact Details (for E-voucher)
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Please fill in all fields correctly to ensure you receive the
                  booking confirmation voucher in your email.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Full Name (as in Passport/Official ID Card)
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="e.g John Maeda"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Please use only alphabet (A-Z), without title, special
                    characters, and punctuation.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="e.g email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We will send the e-voucher to this email.
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Mobile Number</Label>
                    <div className="flex gap-2 mt-2">
                      <Select
                        value={formData.countryCode}
                        onValueChange={(value) =>
                          handleInputChange("countryCode", value)
                        }>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+62">+62</SelectItem>
                          <SelectItem value="+1">+1</SelectItem>
                          <SelectItem value="+44">+44</SelectItem>
                          <SelectItem value="+65">+65</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Mobile number"
                        value={formData.mobileNumber}
                        onChange={(e) =>
                          handleInputChange("mobileNumber", e.target.value)
                        }
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      e.g. +6212345678, for Country Code (+62) and Mobile No.
                      12345678.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Summary */}
            <Card className="py-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Price Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* A single parent container for all price rows */}
                <div className="space-y-3">
                  {/* --- Room Price Row --- */}
                  <div className="flex justify-between items-center text-gray-600">
                    <p>Room Price</p>
                    <p>{formatCurrency(priceDetails?.subtotal)}</p>
                  </div>

                  {/* --- Taxes & Fees Row --- */}
                  <div className="flex justify-between items-center text-gray-600">
                    <p>Taxes & Fees</p>
                    <p>{formatCurrency(priceDetails?.taxesAndFees)}</p>
                  </div>

                  {/* --- Total Price Row --- */}
                  {/* We add extra top padding to this row for separation */}
                  <div className="relative flex justify-between items-center pt-4">
                    {/* The full-width line */}
                    <div className="absolute left-0 top-0 w-full h-px bg-gray-200"></div>

                    <span className="relative bg-white pr-3 font-bold text-gray-900">
                      Total Price
                    </span>
                    <span className="relative bg-white pl-3 font-bold text-lg text-orange-500">
                      {formatCurrency(priceDetails?.totalPrice)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleContinue}
              disabled={isPending}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base font-medium"
              size="lg"
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner className="h-5 w-5" />
                  <span>Processing...</span>
                </div>
              ) : (
                "Continue to Payment"
              )}

            </Button>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="space-y-4">
            {/* Hotel Images */}
            <Card className="overflow-hidden h-full">
              <div className="relative">
                {typeof property?.main_image === "string" &&
                property.main_image ? (
                  <Image
                    src={property.main_image}
                    alt={property?.name || "Property"}
                    className="w-full h-48 object-cover"
                    width={500}
                    height={300}
                  />
                ) : null}
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="flex flex-col mb-2">
                  <h3 className="font-semibold text-lg">{property?.name} - </h3>
                  <h4 className="font-semibold mb-2">{selectedRoom?.name}</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Check-in</p>
                    <p className="font-medium">{startDateDisplay}</p>
                    <p className="text-gray-500">From 14:00</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Check-out</p>
                    <p className="font-medium">{endDateDisplay}</p>
                    <p className="text-gray-500">Before 12:00</p>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="text-gray-600">{`${priceDetails?.nights} night(s)`}</p>
                </div>
                <div>
                  <p className="text-red-600 text-sm font-medium mb-3">
                    {`${availableCount} room(s) left!`}
                  </p>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{`${guests} guest(s)`} </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4" />
                      <span>Breakfast not Included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4" />
                      <span>Free WiFi</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Room Price</span>
                    <div className="text-right">
                      <p className="text-gray-500 line-through text-sm">
                        {formatCurrency(priceDetails?.subtotal)}
                      </p>
                      <p className="text-red-600 font-bold text-lg">
                        {formatCurrency(priceDetails?.subtotal)}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {`${availableCount}`} room(s),{" "}
                    {`${priceDetails?.nights} night(s)`}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
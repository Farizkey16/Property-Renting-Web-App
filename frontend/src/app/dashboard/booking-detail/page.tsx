"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-select";
import { Users, Bed, Wifi, Coffee, Shield, Clock, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { usePropertyById } from "@/hooks/useProperty";
import { format, parseISO } from "date-fns";
import { useBookings } from "@/hooks/useBookings";
import { usePriceQuote } from "@/hooks/usePriceQuote";
import { formatCurrency } from "@/lib/utils";

export default function BookingDetailsForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+62",
    mobileNumber: "",
    requests: {
      nonSmoking: false,
      highFloor: false,
      checkInTime: false,
      connectingRooms: false,
      bedType: false,
      checkOutTime: false,
      others: false,
    },
  });

  // Fetch Booking Details
  const searchParams = useSearchParams()

  const startDateString = searchParams.get("checkIn")
  const endDateString = searchParams.get("checkOut") 
  const property_id = searchParams.get("propertyId") ?? undefined
  const room_id = searchParams.get("roomId")

  // Parse for Display
  const startDate = startDateString ? parseISO(startDateString) : new Date()
  const endDate = endDateString ? parseISO(endDateString) : new Date()
  const startDateDisplay = format(startDate, 'eee, d MMM yyyy')
  const endDateDisplay = format(endDate, 'eee, d MMM yyyy')


  

  const {data: property, isLoading: isLoadingProperty} = usePropertyById(property_id)
  const {data: priceDetails, isLoading: isLoadingPrice} = usePriceQuote(room_id!, startDateString!, endDateString!)

  

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRequestChange = (request: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      requests: { ...prev.requests, [request]: checked },
    }));
  };

  const handleContinue = () => {
    console.log("Booking form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">h</span>
            </div>
            <span className="font-semibold text-lg">hide</span>
          </div>
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
                        }
                      >
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

            {/* Special Requests */}
            <Card className="py-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Let us know if you have any request
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  You will know the availability of your additional request
                  during check-in. Extra charges may incur but you can still
                  cancel your request later.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="nonSmoking"
                        checked={formData.requests.nonSmoking}
                        onCheckedChange={(checked) =>
                          handleRequestChange("nonSmoking", checked as boolean)
                        }
                      />
                      <Label htmlFor="nonSmoking" className="text-sm">
                        Non-smoking Room
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="highFloor"
                        checked={formData.requests.highFloor}
                        onCheckedChange={(checked) =>
                          handleRequestChange("highFloor", checked as boolean)
                        }
                      />
                      <Label htmlFor="highFloor" className="text-sm">
                        High Floor
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="checkInTime"
                        checked={formData.requests.checkInTime}
                        onCheckedChange={(checked) =>
                          handleRequestChange("checkInTime", checked as boolean)
                        }
                      />
                      <Label htmlFor="checkInTime" className="text-sm">
                        Check-in Time
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="others"
                        checked={formData.requests.others}
                        onCheckedChange={(checked) =>
                          handleRequestChange("others", checked as boolean)
                        }
                      />
                      <Label htmlFor="others" className="text-sm">
                        Others
                      </Label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="connectingRooms"
                        checked={formData.requests.connectingRooms}
                        onCheckedChange={(checked) =>
                          handleRequestChange(
                            "connectingRooms",
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor="connectingRooms" className="text-sm">
                        Connecting Rooms
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bedType"
                        checked={formData.requests.bedType}
                        onCheckedChange={(checked) =>
                          handleRequestChange("bedType", checked as boolean)
                        }
                      />
                      <Label htmlFor="bedType" className="text-sm">
                        Bed Type
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="checkOutTime"
                        checked={formData.requests.checkOutTime}
                        onCheckedChange={(checked) =>
                          handleRequestChange(
                            "checkOutTime",
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor="checkOutTime" className="text-sm">
                        Check-out Time
                      </Label>
                    </div>
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
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base font-medium"
              size="lg"
            >
              Continue to Payment
            </Button>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="space-y-6">
            {/* Hotel Images */}
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src="/luxury-hotel-room.png"
                  alt="Village Hotel Bugis"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Don't miss out! Only 1 room(s) left for the lowest price.
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg">
                   {property?.name}
                  </h3>
                  <div className="flex text-yellow-400">{"★".repeat(4)}</div>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="font-medium">8.5</span>
                  <span className="ml-1">(3183)</span>
                </div>
              </CardContent>
            </Card>

            {/* Booking Details */}
            <Card>
              <CardContent className="p-4 space-y-4">
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
                  <p className="text-gray-600">1 night</p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">
                    (1x) Double Or Twin Superior Room
                  </h4>
                  <p className="text-red-600 text-sm font-medium mb-3">
                    1 room(s) left!
                  </p>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>1 Guest</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4" />
                      <span>1 SUPERIOR ROOM</span>
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

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Room Price</span>
                    <div className="text-right">
                      <p className="text-gray-500 line-through text-sm">
                        Rp 3.156.521
                      </p>
                      <p className="text-red-600 font-bold text-lg">
                        Rp 2.367.391
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">1 room(s), 1 night(s)</p>
                </div>
              </CardContent>
            </Card>

            {/* Policies */}
            {/* <Card className="py-6">
              <CardHeader>
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Cancellation and Reschedule Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <X className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    This reservation is non-refundable.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <X className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Non-reschedulable</span>
                </div>

                <Separator />

                <div>
                  <h5 className="font-medium mb-2">Accommodation Policy</h5>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Facility</h5>
                  <p className="text-gray-600">
                    Outdoor Timber Deck closed temporarily from 21-7-2025 to
                    15-9-2025.
                  </p>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  );
}

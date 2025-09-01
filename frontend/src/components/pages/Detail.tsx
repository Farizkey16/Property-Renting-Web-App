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
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRoomSearch } from "@/hooks/useRoom";
import { formatCurrency } from "@/lib/utils";

export default function PropertyDetailPage() {
  const [open, setOpen] = useState(false);
  const params = useSearchParams();
  const propertyname = params.get("propertyname") || undefined;
  const roomname = params.get("roomname") || undefined;

  const { data, isLoading, isError } = useRoomSearch(propertyname, roomname);

  console.log(data);

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (isError) return <div className="p-8">Something went wrong</div>;

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
          <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t shadow-lg z-50 lg:hidden">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500">From</span>
                <div className="text-lg font-bold">
                  {formatCurrency(data.base_price)}
                </div>
              </div>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => setOpen(true)}>
                Reserve now
              </Button>
            </div>
          </div>

          {/* Modal Booking Detail (Mobile) */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book this space</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Choose a date and time
                </Button>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-600">From</span>
                    <div className="text-2xl font-bold">
                      {formatCurrency(data.base_price)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold">Peak Rate</span>
                  </div>
                </div>

                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Choose a date and time
                  </Button>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-600">From</span>
                      <div className="text-2xl font-bold">
                        {formatCurrency(data.base_price)}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold">Peak Rate</span>
                    </div>
                  </div>

                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                    Reserve now
                  </Button>

                  <div className="text-xs text-gray-500 text-center">
                    You won&apos;t be charged until after your reservation
                    begins. Cancellations are free up to 2 hours before.
                  </div>

                  <Button variant="outline" className="w-full">
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

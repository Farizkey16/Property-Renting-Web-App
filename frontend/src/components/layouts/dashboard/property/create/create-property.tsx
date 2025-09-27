"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProperty } from "@/hooks/useProperty";
import { ViewState } from "react-map-gl/mapbox";
import {
  createPropertySchema,
  CreatePropertySchema,
} from "@/lib/validation/property";
import { createProperty, PropertyCategory } from "@/types/property/property";
import PropertyMap from "../PropertyMap";

export default function CreatePropertyForm() {
  const router = useRouter();
  const createProperty = useCreateProperty();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreatePropertySchema>({
    resolver: zodResolver(createPropertySchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      city: "",
      province: "",
      zip_code: "",
      latitude: "",
      longitude: "",
      property_category: PropertyCategory.apartment,
    },
  });

  const [preview, setPreview] = useState("");
  const [viewState, setViewState] = useState<ViewState>({
    latitude: -6.2088,
    longitude: 106.8456,
    zoom: 12,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const onSubmit = (data: createProperty) => {
    createProperty.mutate(
      { ...data, main_image: data.main_image as File },
      {
        onSuccess: () => {
          toast.success("Property created successfully!");
          router.push("/dashboard/property");
        },
        onError: () => toast.error("Failed to create property."),
      }
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("main_image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setViewState((prev) => ({ ...prev, latitude, longitude }));
          setUserLocation({ latitude, longitude });
          setValue("latitude", latitude.toString());
          setValue("longitude", longitude.toString());
        },
        () => {}
      );
    }
  }, [setValue]);

  return (
    <div className="flex-1 p-4 lg:p-8">
      <Card className="w-full max-w-7xl mx-auto p-8 ">
        <CardHeader className="pb-4 lg:pb-6">
          <CardTitle className="text-xl lg:text-2xl font-semibold">
            Create New Property
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Basic fields */}
            <div>
              <Label className="mb-2">Name</Label>
              <Input {...register("name")} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label className="mb-2">Description</Label>
              <Textarea {...register("description")} />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-2">Address</Label>
              <Input {...register("address")} />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2">City</Label>
                <Input {...register("city")} />
              </div>
              <div>
                <Label className="mb-2">Province</Label>
                <Input {...register("province")} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2">Zip Code</Label>
                <Input {...register("zip_code")} />
              </div>
              <div>
                <Label className="mb-2">Category</Label>
                <select
                  {...register("property_category")}
                  className="w-full border rounded-md p-2">
                  {Object.values(PropertyCategory).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Map */}
            <PropertyMap
              viewState={viewState}
              setViewState={setViewState}
              latitude={watch("latitude")}
              longitude={watch("longitude")}
              userLocation={userLocation}
              onSelect={(lat, lng) => {
                setValue("latitude", lat.toString());
                setValue("longitude", lng.toString());
              }}
            />

            <div className="hidden">
              <div>
                <Label className="mb-2">Latitude</Label>
                <Input {...register("latitude")} readOnly />
              </div>
              <div>
                <Label className="mb-2">Longitude</Label>
                <Input {...register("longitude")} readOnly />
              </div>
            </div>

            {/* Main Image */}
            <div>
              <Label className="mb-2">Main Image</Label>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              {preview && (
                <div className="mt-4">
                  <Image
                    src={preview}
                    alt="Property"
                    width={120}
                    height={120}
                    className="rounded-lg border shadow-sm object-cover"
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  reset();
                  setPreview("");
                }}
                className="flex-1 cursor-pointer">
                Discard
              </Button>
              <Button
                type="submit"
                disabled={createProperty.isPending}
                className="flex-1 bg-orange-500 hover:bg-orange-600 cursor-pointer">
                {createProperty.isPending ? "Saving..." : "Save Property"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FileUpload from "../FileUpload";

import {
  PropertyCategory,
  updateProperty as UpdatePropertyType,
} from "@/types/property/property";
import {
  editPropertySchema,
  EditPropertySchema,
} from "@/lib/validation/property";
import { useUpdateProperty, usePropertyById } from "@/hooks/useProperty";

import { ViewState } from "react-map-gl/mapbox";
import PropertyMap from "../PropertyMap";
import LoadingSpinner from "@/components/fragment/loading-error/LoadingSpinner";

const EditPropertyForm = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data: property, isLoading } = usePropertyById(id as string);
  const updateProperty = useUpdateProperty();

  const [viewState, setViewState] = useState<ViewState>({
    latitude: -6.2088,
    longitude: 106.8456,
    zoom: 12,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      });
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditPropertySchema>({
    resolver: zodResolver(editPropertySchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      city: "",
      province: "",
      zip_code: "",
      latitude: "",
      longitude: "",
      main_image: null,
      property_category: PropertyCategory.apartment,
    },
  });

  useEffect(() => {
    if (property) {
      reset({
        name: property.name,
        description: property.description,
        address: property.address,
        city: property.city,
        province: property.province,
        zip_code: property.zip_code,
        latitude: property.latitude ?? "",
        longitude: property.longitude ?? "",
        main_image: null,
        property_category: property.property_category as PropertyCategory,
      });

      if (property.latitude && property.longitude) {
        setViewState((prev) => ({
          ...prev,
          latitude: parseFloat(property.latitude),
          longitude: parseFloat(property.longitude),
        }));
      }
    }
  }, [property, reset]);

  const handleSelectLocation = (lat: number, lng: number) => {
    setValue("latitude", lat.toString());
    setValue("longitude", lng.toString());
    setViewState((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  const onSubmit = (data: EditPropertySchema) => {
    const payload: Partial<UpdatePropertyType> = { ...data };

    if (!data.main_image) {
      delete payload.main_image;
    }

    updateProperty.mutate(
      { id: id as string, property: payload as UpdatePropertyType },
      {
        onSuccess: () => {
          toast.success("Property updated successfully!");
          router.push("/dashboard/property");
        },
        onError: () => {
          toast.error("Failed to update property!");
        },
      }
    );
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex-1 p-4 lg:p-8">
      <Card className="w-full max-w-7xl mx-auto p-8">
        <CardHeader className="pb-4 lg:pb-6">
          <CardTitle className="text-xl lg:text-2xl font-semibold">
            Edit Property
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Basic fields */}
            <div>
              <Label>Name</Label>
              <Input {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label>Description</Label>
              <Textarea {...register("description")} />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <Label>Address</Label>
              <Input {...register("address")} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>City</Label>
                <Input {...register("city")} />
              </div>
              <div>
                <Label>Province</Label>
                <Input {...register("province")} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Zip Code</Label>
                <Input {...register("zip_code")} />
              </div>
              <div>
                <Label>Category</Label>
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

            {/* Map pakai PropertyMap */}
            <div>
              <Label>Pick Location on Map</Label>
              <PropertyMap
                viewState={viewState}
                setViewState={setViewState}
                latitude={watch("latitude") ?? ""}
                longitude={watch("longitude") ?? ""}
                onSelect={handleSelectLocation}
                userLocation={userLocation}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Latitude</Label>
                <Input {...register("latitude")} readOnly />
              </div>
              <div>
                <Label>Longitude</Label>
                <Input {...register("longitude")} readOnly />
              </div>
            </div>

            {/* Main Image */}
            <div>
              <Label>Main Image</Label>
              <FileUpload
                onChange={(file) => setValue("main_image", file)}
                initialPreview={
                  typeof property?.main_image === "string"
                    ? property.main_image
                    : ""
                }
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (property) {
                    reset({
                      name: property.name,
                      description: property.description,
                      address: property.address,
                      city: property.city,
                      province: property.province,
                      zip_code: property.zip_code,
                      latitude: property.latitude ?? "",
                      longitude: property.longitude ?? "",
                      main_image: null,
                      property_category:
                        property.property_category as PropertyCategory,
                    });
                  }
                }}
                className="flex-1 cursor-pointer">
                Reset
              </Button>
              <Button
                type="submit"
                disabled={updateProperty.isPending}
                className="flex-1 bg-orange-500 hover:bg-orange-600 cursor-pointer">
                {updateProperty.isPending ? "Saving..." : "Update Property"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPropertyForm;

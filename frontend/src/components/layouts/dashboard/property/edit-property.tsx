"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Map, { Marker, MapMouseEvent } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  PropertyCategory,
  updateProperty as UpdatePropertyType,
} from "@/types/property/property";
import { useUpdateProperty, usePropertyById } from "@/hooks/useProperty";
import { ViewState } from "react-map-gl/mapbox";
import { useParams, useRouter } from "next/navigation";

const EditPropertyForm = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data: property, isLoading } = usePropertyById(id as string);

  const [form, setForm] = useState<UpdatePropertyType>({
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
  });

  const [preview, setPreview] = useState<string | null>(null);
  const updateProperty = useUpdateProperty();

  const [viewState, setViewState] = useState({
    latitude: -6.2088,
    longitude: 106.8456,
    zoom: 12,
  });

  // Prefill data property
  useEffect(() => {
    if (property) {
      setForm({
        name: property.name,
        description: property.description,
        address: property.address,
        city: property.city,
        province: property.province,
        zip_code: property.zip_code,
        latitude: property.latitude,
        longitude: property.longitude,
        main_image: null,
        property_category: property.property_category as PropertyCategory,
      });

      setPreview(
        typeof property.main_image === "string" ? property.main_image : null
      );

      if (property.latitude && property.longitude) {
        setViewState((prev) => ({
          ...prev,
          latitude: parseFloat(property.latitude),
          longitude: parseFloat(property.longitude),
        }));
      }
    }
  }, [property]);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setForm((prev) => ({ ...prev, main_image: f }));
      setPreview(URL.createObjectURL(f));
    }
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle map click
  const handleMapClick = (event: MapMouseEvent) => {
    const { lngLat } = event;
    setForm((prev) => ({
      ...prev,
      latitude: lngLat.lat.toString(),
      longitude: lngLat.lng.toString(),
    }));
    setViewState((prev) => ({
      ...prev,
      latitude: lngLat.lat,
      longitude: lngLat.lng,
    }));
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateProperty.mutate(
      { id: id as string, property: form },
      {
        onSuccess: () => {
          alert("Update property successfully!");
          router.push("/dashboard/property");
        },
        onError: () => {
          alert("Failed to update property!");
        },
      }
    );
  };

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="flex-1 p-4 lg:p-8 space-y-8">
      <Card className="w-full max-w-4xl mx-auto p-8">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold">Edit Property</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic fields */}
            <div>
              <Label>Name</Label>
              <Input
                name="name"
                value={form.name || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                name="description"
                value={form.description || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                name="address"
                value={form.address || ""}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>City</Label>
                <Input
                  name="city"
                  value={form.city || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Province</Label>
                <Input
                  name="province"
                  value={form.province || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Zip Code</Label>
                <Input
                  name="zip_code"
                  value={form.zip_code || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Category</Label>
                <select
                  name="property_category"
                  value={form.property_category}
                  onChange={handleChange}
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
            <div className="h-96 w-full">
              <Label>Pick Location on Map</Label>
              <Map
                latitude={viewState.latitude}
                longitude={viewState.longitude}
                zoom={viewState.zoom}
                onMove={(evt: { viewState: ViewState }) =>
                  setViewState(evt.viewState)
                }
                onClick={handleMapClick}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox://styles/ariska-adi/cme5oy58001a501s80a2icsqi"
                style={{ width: "100%", height: "100%" }}>
                {form.latitude && form.longitude && (
                  <Marker
                    latitude={parseFloat(form.latitude)}
                    longitude={parseFloat(form.longitude)}
                    anchor="center">
                    <div className="flex items-center justify-center">
                      <div className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-red-400 opacity-50"></div>
                      <div className="relative inline-flex h-5 w-5 rounded-full bg-red-500 border-2 border-white"></div>
                    </div>
                  </Marker>
                )}
              </Map>
            </div>

            {/* Latitude & Longitude */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Latitude</Label>
                <Input name="latitude" value={form.latitude || ""} readOnly />
              </div>
              <div>
                <Label>Longitude</Label>
                <Input name="longitude" value={form.longitude || ""} readOnly />
              </div>
            </div>

            {/* Main Image */}
            <div>
              <Label>Main Image</Label>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              {preview && (
                <div className="mt-4">
                  <Image
                    src={preview}
                    alt="Property Image"
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
                type="reset"
                variant="outline"
                onClick={() => {
                  if (property) {
                    setForm({
                      name: property.name,
                      description: property.description,
                      address: property.address,
                      city: property.city,
                      province: property.province,
                      zip_code: property.zip_code,
                      latitude: property.latitude,
                      longitude: property.longitude,
                      main_image: null,
                      property_category:
                        property.property_category as PropertyCategory,
                    });
                    setPreview(
                      typeof property.main_image === "string"
                        ? property.main_image
                        : null
                    );
                  }
                }}
                className="flex-1">
                Reset
              </Button>
              <Button
                type="submit"
                disabled={updateProperty.isPending}
                className="flex-1 bg-orange-500 hover:bg-orange-600">
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

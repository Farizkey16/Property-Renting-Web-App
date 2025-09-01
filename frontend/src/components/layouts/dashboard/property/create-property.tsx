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

import { PropertyCategory, createProperty } from "@/types/property/property";
import { useCreateProperty } from "@/hooks/useProperty";
import { ViewState } from "react-map-gl/mapbox";
import { useRouter } from "next/navigation";

const CreatePropertyForm = () => {
  const [form, setForm] = useState<createProperty>({
    name: "",
    description: "",
    address: "",
    city: "",
    province: "",
    zip_code: "",
    latitude: "",
    longitude: "",
    main_image: {} as File,
    property_category: PropertyCategory.apartment,
  });
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const createProperty = useCreateProperty();

  const [viewState, setViewState] = useState({
    latitude: -6.2088,
    longitude: 106.8456,
    zoom: 12,
  });
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // File upload preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setForm((prev) => ({ ...prev, main_image: f }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: createProperty & { main_image: File } = {
      ...form,
      main_image: file as File,
    };

    createProperty.mutate(payload, {
      onSuccess: () => {
        alert("Property created!");
        console.log("Property created!");
        router.push("/dashboard/property");
      },
    });
  };

  // Auto get user location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setViewState((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {}
      );
    }
  }, []);

  return (
    <div className="flex-1 p-4 lg:p-8 space-y-8">
      <Card className="w-full max-w-4xl mx-auto p-8">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold">
            Create New Property
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic fields */}
            <div>
              <Label>Name</Label>
              <Input name="name" value={form.name} onChange={handleChange} />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>City</Label>
                <Input name="city" value={form.city} onChange={handleChange} />
              </div>
              <div>
                <Label>Province</Label>
                <Input
                  name="province"
                  value={form.province}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Zip Code</Label>
                <Input
                  name="zip_code"
                  value={form.zip_code}
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
                {userLocation && (
                  <Marker
                    latitude={userLocation.latitude}
                    longitude={userLocation.longitude}
                    anchor="bottom">
                    <div className="flex flex-col items-center space-y-1">
                      <span className="px-2 py-1 text-xs bg-blue-500 text-white shadow-md rounded-md border font-bold ">
                        Your location here
                      </span>

                      <div className="flex items-center justify-center">
                        <div className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-blue-400 opacity-50"></div>
                        <div className="relative inline-flex h-4 w-4 rounded-full bg-blue-500 border-2 border-white"></div>
                      </div>
                    </div>
                  </Marker>
                )}
              </Map>
            </div>

            {/* Latitude & Longitude Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Latitude</Label>
                <Input
                  name="latitude"
                  value={form.latitude}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div>
                <Label>Longitude</Label>
                <Input
                  name="longitude"
                  value={form.longitude}
                  onChange={handleChange}
                  readOnly
                />
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
                  setForm({
                    name: "",
                    description: "",
                    address: "",
                    city: "",
                    province: "",
                    zip_code: "",
                    latitude: "",
                    longitude: "",
                    main_image: {} as File,
                    property_category: PropertyCategory.apartment,
                  });
                  setFile(null);
                  setPreview("");
                }}
                className="flex-1">
                Discard
              </Button>
              <Button
                type="submit"
                disabled={createProperty.isPending}
                className="flex-1 bg-orange-500 hover:bg-orange-600">
                {createProperty.isPending ? "Saving..." : "Save Property"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePropertyForm;

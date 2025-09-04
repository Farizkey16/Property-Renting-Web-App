"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CreateRoomType } from "@/types/room/room";
import { useCreateRoom } from "@/hooks/useRoom";

const CreateRoom = () => {
  const { property_id } = useParams<{ property_id: string }>();
  const router = useRouter();

  const [form, setForm] = useState<CreateRoomType>({
    property_id,
    name: "",
    description: "",
    base_price: 0,
    capacity: 0,
    total_rooms: 0,
    image: [] as File[],
    weekend_peak: { type: "nominal", value: 0 },
  });

  const [previews, setPreviews] = useState<string[]>([]);
  const createRoom = useCreateRoom();

  useEffect(() => {
    return () => {
      previews.forEach(URL.revokeObjectURL);
    };
  }, [previews]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 3) {
      alert("Maksimal hanya 3 gambar");
      return;
    }
    setForm((prev) => ({ ...prev, image: files }));
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CreateRoomType & { image: File[] } = {
      ...form,
      image: form.image as File[],
    };
    createRoom.mutate(payload, {
      onSuccess: () => {
        alert("Room created!");
        router.push("/dashboard/property");
      },
    });
  };

  const resetForm = () => {
    setForm({
      property_id,
      name: "",
      description: "",
      base_price: 0,
      capacity: 0,
      total_rooms: 0,
      image: [] as File[],
      weekend_peak: { type: "nominal", value: 0 },
    });
    setPreviews([]);
  };

  return (
    <div className="flex-1 p-4 lg:p-8">
      <Card className="w-full max-w-4xl mx-auto p-8">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold">Create Room</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Room Name</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="base_price">Base Price</Label>
              <Input
                id="base_price"
                name="base_price"
                type="number"
                min={0}
                value={form.base_price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min={0}
                  value={form.capacity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="total_rooms">Total Rooms</Label>
                <Input
                  id="total_rooms"
                  name="total_rooms"
                  type="number"
                  min={0}
                  value={form.total_rooms}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="images">Room Images (max 3)</Label>
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
              {previews.length > 0 && (
                <div className="mt-4 flex gap-4 flex-wrap">
                  {previews.map((src, idx) => (
                    <Image
                      key={idx}
                      src={src}
                      alt={`Room Image ${idx + 1}`}
                      width={120}
                      height={120}
                      className="rounded-lg border shadow-sm object-cover"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weekend_peak_type">Weekend Peak Type</Label>
                <select
                  id="weekend_peak_type"
                  name="weekend_peak_type"
                  value={form.weekend_peak?.type || ""}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      weekend_peak: {
                        ...(prev.weekend_peak || { type: "nominal", value: 0 }),
                        type: e.target.value as "percentage" | "nominal",
                      },
                    }))
                  }>
                  <option value="nominal">Nominal</option>
                  <option value="percentage">Percentage</option>
                </select>
              </div>
              <div>
                <Label htmlFor="weekend_peak_value">Value</Label>
                <Input
                  id="weekend_peak_value"
                  name="weekend_peak_value"
                  type="number"
                  min={0}
                  value={form.weekend_peak?.value || 0}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      weekend_peak: {
                        ...(prev.weekend_peak || { type: "nominal", value: 0 }),
                        value: Number(e.target.value),
                      },
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="flex-1">
                Discard Changes
              </Button>
              <Button
                type="submit"
                disabled={createRoom.isPending}
                className="flex-1 bg-orange-500 hover:bg-orange-600">
                {createRoom.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateRoom;

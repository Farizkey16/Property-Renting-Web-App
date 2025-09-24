"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditRoomType } from "@/types/room/room";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, startOfDay } from "date-fns";
import { CalendarIcon, Plus, X } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { editRoomSchema } from "@/lib/validation/room";
import z from "zod";

type EditRoomFormValues = z.infer<typeof editRoomSchema>;
type RoomFormProps = {
  defaultValues: EditRoomType;
  onSubmit: (data: EditRoomType) => void;
  isPending?: boolean;
  cancelHandler?: () => void;
};

const RoomForm: React.FC<RoomFormProps> = ({
  defaultValues,
  onSubmit,
  isPending,
  cancelHandler,
}) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<EditRoomFormValues>({
    defaultValues,
    resolver: zodResolver(editRoomSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "custom_peaks",
  });

  const images = watch("image");
  const oldImages = watch("oldImages");

  useEffect(() => {
    reset(defaultValues);
    setExistingImages(defaultValues.oldImages || []);
  }, [defaultValues, reset]);

  useEffect(() => {
    const urls = images?.map((file) => URL.createObjectURL(file)) || [];
    setPreviews(urls);
    return () => urls.forEach(URL.revokeObjectURL);
  }, [images]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length + existingImages.length > 3) {
      toast.error("Maksimal hanya 3 gambar (lama + baru)");
      return;
    }
    setValue("image", files);
  };

  const handleDeleteOldImage = (url: string) => {
    setExistingImages((prev) => prev.filter((img) => img !== url));
    setValue("oldImages", oldImages?.filter((img) => img !== url) || []);
  };

  return (
    <div className="flex-1 p-4 lg:p-8">
      <Card className="w-full max-w-7xl mx-auto p-8">
        <CardHeader className="pb-4 lg:pb-6">
          <CardTitle className="text-xl lg:text-2xl font-semibold">
            Room Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Room Name */}
            <div>
              <Label htmlFor="name" className="mb-2">
                Room Name
              </Label>
              <Input id="name" {...register("name")} required />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="mb-2">
                Description
              </Label>
              <Textarea id="description" {...register("description")} />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Base Price */}
            <div>
              <Label htmlFor="base_price" className="mb-2">
                Base Price
              </Label>
              <Controller
                name="base_price"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    id="base_price"
                    type="text"
                    value={field.value ? formatNumber(field.value) : ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, "");
                      field.onChange(rawValue ? parseInt(rawValue, 10) : 0);
                    }}
                  />
                )}
              />
              {errors.base_price && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.base_price.message}
                </p>
              )}
            </div>

            {/* Capacity & Total Rooms */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="capacity" className="mb-2">
                  Capacity
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  min={0}
                  {...register("capacity", { valueAsNumber: true })}
                  required
                />
              </div>
              {errors.capacity && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.capacity.message}
                </p>
              )}
              <div>
                <Label htmlFor="total_rooms" className="mb-2">
                  Total Rooms
                </Label>
                <Input
                  id="total_rooms"
                  type="number"
                  min={0}
                  {...register("total_rooms", { valueAsNumber: true })}
                  required
                />
                {errors.total_rooms && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.total_rooms.message}
                  </p>
                )}
              </div>
            </div>

            {/* Existing images */}
            {existingImages.length > 0 && (
              <div>
                <Label className="mb-2">Existing Images</Label>
                <div className="mt-2 flex gap-4 flex-wrap">
                  {existingImages.map((src, idx) => (
                    <div key={idx} className="relative">
                      <Image
                        src={src}
                        alt={`Room Image ${idx + 1}`}
                        width={120}
                        height={120}
                        className="rounded-lg border shadow-sm object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteOldImage(src)}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New upload */}
            <div>
              <Label htmlFor="images" className="mb-2">
                Add New Images (max 3)
              </Label>
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
              {errors.image && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.image.message}
                </p>
              )}
              {previews.length > 0 && (
                <div className="mt-4 flex gap-4 flex-wrap">
                  {previews.map((src, idx) => (
                    <Image
                      key={idx}
                      src={src}
                      alt={`New Room Image ${idx + 1}`}
                      width={120}
                      height={120}
                      className="rounded-lg border shadow-sm object-cover"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Weekend Peak */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weekend_peak_type" className="mb-2">
                  Weekend Peak Type
                </Label>
                <Controller
                  control={control}
                  name="weekend_peak.type"
                  render={({ field }) => (
                    <select {...field}>
                      <option value="nominal">Nominal</option>
                      <option value="percentage">Percentage</option>
                    </select>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="weekend_peak_value" className="mb-2">
                  Value
                </Label>
                <Input
                  type="number"
                  {...register("weekend_peak.value", { valueAsNumber: true })}
                />
                {errors.weekend_peak?.value && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.weekend_peak.value.message}
                  </p>
                )}
              </div>
            </div>

            {/* Custom Peaks */}
            <div className="space-y-4">
              <Label className="mb-2">Custom Peaks</Label>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="border p-4 rounded-lg space-y-3 relative">
                  {/* Date Range */}
                  <div className="flex gap-2 p-2">
                    <Controller
                      control={control}
                      name={`custom_peaks.${index}.start_date`}
                      render={({ field }) => (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-[40%] justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value
                                ? format(new Date(field.value), "PPP")
                                : "Pick Start Date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) =>
                                field.onChange(date?.toISOString())
                              }
                              disabled={(date) => {
                                return date < startOfDay(new Date());
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    />

                    <Controller
                      control={control}
                      name={`custom_peaks.${index}.end_date`}
                      render={({ field }) => {
                        const startDate = watch(
                          `custom_peaks.${index}.start_date`
                        );
                        return (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-[40%] justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value
                                  ? format(new Date(field.value), "PPP")
                                  : "Pick End Date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) =>
                                  field.onChange(date?.toISOString())
                                }
                                disabled={(date) =>
                                  !startDate ||
                                  date < startOfDay(new Date(startDate))
                                }
                              />
                            </PopoverContent>
                          </Popover>
                        );
                      }}
                    />
                  </div>

                  {/* Type & Value */}
                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      control={control}
                      name={`custom_peaks.${index}.type`}
                      render={({ field }) => (
                        <select {...field}>
                          <option value="nominal">Nominal</option>
                          <option value="percentage">Percentage</option>
                        </select>
                      )}
                    />
                    <Input
                      type="number"
                      placeholder="Value"
                      {...register(`custom_peaks.${index}.value`, {
                        valueAsNumber: true,
                      })}
                    />
                    {errors.custom_peaks?.[index]?.start_date && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.custom_peaks[index]?.start_date?.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => remove(index)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    start_date: "",
                    end_date: "",
                    type: "nominal",
                    value: 0,
                  })
                }>
                <Plus className="w-4 h-4 mr-2" /> Add Custom Peak
              </Button>
            </div>

            <div className="flex gap-4 pt-4">
              {cancelHandler && (
                <Button type="button" variant="outline" onClick={cancelHandler}>
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-orange-500 hover:bg-orange-600 cursor-pointer">
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomForm;

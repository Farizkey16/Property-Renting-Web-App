"use client";

import { useRouter, useParams } from "next/navigation";
import { useEditRoom, useRoomById } from "@/hooks/useRoom";
import RoomForm from "../RoomForm";
import { toast } from "sonner";
import LoadingSpinner from "@/components/fragment/loading-error/LoadingSpinner";

const EditRoom = () => {
  const params = useParams();
  const id = params.id as string;

  const router = useRouter();
  const { data, isLoading } = useRoomById(id);
  const editRoom = useEditRoom();

  if (isLoading) return <LoadingSpinner />;

  const fetchedRoomData = {
    id,
    property_id: data?.response?.property_id ?? "",
    name: data?.response?.name ?? "",
    description: data?.response?.description ?? "",
    base_price: data?.response?.base_price
      ? Number(data.response.base_price)
      : 0,
    capacity: data?.response?.capacity ?? 0,
    total_rooms: data?.response?.total_rooms ?? 0,
    image: [],
    oldImages:
      data?.response?.room_images?.map(
        (img: { image_url: string }) => img.image_url
      ) ?? [],
    weekend_peak: data?.response?.weekend_peak ?? { type: "nominal", value: 0 },
    custom_peaks: data?.response?.custom_peaks ?? [],
  };

  return (
    <RoomForm
      defaultValues={fetchedRoomData}
      onSubmit={(formData) =>
        editRoom.mutate(formData, {
          onSuccess: () => {
            toast.success("Room updated!");
            console.log(formData);
            router.push("/dashboard/property");
          },
          onError: (error) => {
            toast.error(error?.message || "Something went wrong");
            console.error(error);
          },
        })
      }
      isPending={editRoom.isPending}
      cancelHandler={() => router.back()}
    />
  );
};

export default EditRoom;

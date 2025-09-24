"use client";

import { useRouter } from "next/navigation";
import { useCreateRoom } from "@/hooks/useRoom";
import RoomForm from "../RoomForm";
import { toast } from "sonner";

const CreateRoom = ({ property_id }: { property_id: string }) => {
  const router = useRouter();
  const createRoom = useCreateRoom();

  return (
    <RoomForm
      defaultValues={{
        id: "",
        property_id,
        name: "",
        description: "",
        base_price: 0,
        capacity: 0,
        total_rooms: 0,
        image: [],
        oldImages: [],
        weekend_peak: { type: "nominal", value: 0 },
        custom_peaks: [],
      }}
      onSubmit={(data) =>
        createRoom.mutate(data, {
          onSuccess: () => {
            toast.success("Room created!");
            router.push("/dashboard/property");
          },
          onError: (error) => toast.error(error.message),
        })
      }
      isPending={createRoom.isPending}
    />
  );
};

export default CreateRoom;

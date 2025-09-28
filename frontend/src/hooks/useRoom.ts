
import {
  blockRoomByTenant,
  createRoom,
  editRoom,
  fetchAllRooms,
  fetchRoomById,
  fetchRoomsByQuery,
  fetchRoomsDetailsByQuery,
  getRoomAvailability,
  softDeleteRoom,
  unBlockRoomByTenant,
} from "@/services/room.service";
import { getRoomAmountAvailable } from "@/services/transactions.services";
import {
  CreateRoomType,
  EditRoomType,
  RoomAvailabilityParams,
} from "@/types/room/room";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRoom = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: fetchAllRooms,
  });
};

export const useRoomById = (id: string) => {
  return useQuery({
    queryKey: ["room", id],
    queryFn: () => fetchRoomById(id),
  });
};

export const useGetRoomAvailability = (
  id: string,
  start_date: string,
  end_date: string
) => {
  return useQuery({
    queryKey: ["room-availability", id, start_date, end_date],
    queryFn: () => getRoomAvailability(id, start_date, end_date),
  });
};

export const useRoomSearch = (
  propertyname?: string,
  roomname?: string,
  checkIn?: string,
  checkOut?: string
) => {
  return useQuery({
    queryKey: ["rooms", propertyname, roomname, checkIn, checkOut],
    queryFn: () => fetchRoomsByQuery(propertyname, roomname, checkIn, checkOut),
    enabled: !!propertyname && !!roomname && !!checkIn && !!checkOut,
  });
};

export const useRoomPricing = (
  propertyname?: string,
  roomname?: string,
  checkIn?: string,
  checkOut?: string
) => {
  return useQuery({
    queryKey: ["roomPricing", propertyname, roomname, checkIn, checkOut],
    queryFn: () => fetchRoomsByQuery(propertyname, roomname, checkIn, checkOut),
    enabled: !!propertyname && !!roomname && !!checkIn && !!checkOut,
    select: (data) => {
      if (!data) return null;
      return {
        base_price: data.base_price,
        total: data.pricing?.total,
        peak_season_rates: data.peak_season_rates,
      };
    },
  });
};

export const useBlockRoomByTenant = (
  id: string,
  start_date?: string,
  end_date?: string
) => {
  return useMutation({
    mutationFn: () => blockRoomByTenant(id, start_date, end_date),
    onSuccess: (data) => console.log("Blocked:", data),
    onError: (error) => console.error(error),
  });
};

export const useUnBlockRoomByTenant = (
  id: string,
  start_date?: string,
  end_date?: string
) => {
  return useMutation({
    mutationFn: () => unBlockRoomByTenant(id, start_date, end_date),
    onSuccess: (data) => console.log("UnBlocked:", data),
    onError: (error) => console.error(error),
  });
};

export const useRoomDetailSearch = (
  propertyname?: string,
  roomname?: string
) => {
  return useQuery({
    queryKey: ["roomsDetails", propertyname, roomname],
    queryFn: () => fetchRoomsDetailsByQuery(propertyname, roomname),
    enabled: !!propertyname && !!roomname,
  });
};

export const useCreateRoom = () => {
  return useMutation({
    mutationFn: (room: CreateRoomType) => createRoom(room),
  });
};

export const useEditRoom = () => {
  return useMutation({
    mutationFn: (room: EditRoomType) => editRoom(room.id, room),
  });
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => softDeleteRoom(id),
    onSuccess: () => {
      console.log("Room deleted, invalidating property list...");

      queryClient.invalidateQueries({ queryKey: ["property-by-tenant"] });
    },
    onError: (error) => {
      console.error("Failed to delete room:", error);
      alert("Error: Could not delete the room.");
    },
  });
};

export const useRoomAvailability = (params: RoomAvailabilityParams) => {
  const { roomId, checkIn, checkOut } = params;
  // const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["room", "availability", roomId, checkIn, checkOut],
    queryFn: () => getRoomAmountAvailable(params),
    enabled: !!roomId && !!checkIn && !!checkOut,
  });
};

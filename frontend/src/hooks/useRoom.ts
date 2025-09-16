import {
  createRoom,
  editRoom,
  fetchAllRooms,
  fetchRoomById,
  fetchRoomsByQuery,
  softDeleteRoom,
} from "@/services/room.service";
import { CreateRoomType, EditRoomType } from "@/types/room/room";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useRoomSearch = (
  propertyname?: string,
  roomname?: string,
  checkIn?: string,
  checkOut?: string
) => {
  return useQuery({
    queryKey: ["rooms", propertyname, roomname, checkIn, checkOut],
    queryFn: () => fetchRoomsByQuery(propertyname, roomname, checkIn, checkOut),
    enabled: !!propertyname || !!roomname,
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
  return useMutation({
    mutationFn: (id: string) => softDeleteRoom(id),
  });
};

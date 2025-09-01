<<<<<<< HEAD
import {
  createRoom,
  fetchAllRooms,
  fetchRoomsByQuery,
} from "@/services/room.service";
import { CreateRoomType } from "@/types/room/room";
import { useMutation, useQuery } from "@tanstack/react-query";
=======
import { fetchAllRooms } from "@/services/room.service";
import { useQuery } from "@tanstack/react-query";
>>>>>>> main

export const useRoom = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: fetchAllRooms,
  });
};
<<<<<<< HEAD

export const useRoomSearch = (propertyname?: string, roomname?: string) => {
  return useQuery({
    queryKey: ["rooms", propertyname, roomname],
    queryFn: () => fetchRoomsByQuery(propertyname, roomname),
    enabled: !!propertyname || !!roomname,
  });
};

export const useCreateRoom = () => {
  return useMutation({
    mutationFn: (room: CreateRoomType) => createRoom(room),
  });
};
=======
>>>>>>> main

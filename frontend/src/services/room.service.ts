<<<<<<< HEAD
import { CreateRoomType } from "@/types/room/room";
=======
>>>>>>> main
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchAllRooms = async () => {
  const response = await axios.get(`${BASE_URL}/room/all`);
  console.log(response.data);
  return response.data;
};
<<<<<<< HEAD

export const fetchRoomsByQuery = async (
  propertyname?: string,
  roomname?: string
) => {
  const response = await axios.get(`${BASE_URL}/room/search`, {
    params: {
      propertyname,
      roomname,
    },
  });
  return response.data.response[0];
};

export const createRoom = async (room: CreateRoomType) => {
  const formData = new FormData();
  formData.append("property_id", room.property_id);
  formData.append("name", room.name);
  formData.append("description", room.description);
  formData.append("base_price", room.base_price.toString());
  formData.append("capacity", room.capacity.toString());
  formData.append("total_rooms", room.total_rooms.toString());
  formData.append("weekend_peak", JSON.stringify(room.weekend_peak));

  room.image.forEach((file) => {
    formData.append("images", file);
  });

  const response = await axios.post(`${BASE_URL}/room/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log(response.data);
  return response.data;
};
=======
>>>>>>> main

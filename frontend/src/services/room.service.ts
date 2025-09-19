import { CreateRoomType, EditRoomType } from "@/types/room/room";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchAllRooms = async () => {
  const response = await axios.get(`${BASE_URL}/room/all`);
  console.log(response.data);
  return response.data;
};

export const fetchRoomsByQuery = async (
  propertyname?: string,
  roomname?: string,
  checkIn?: string,
  checkOut?: string
) => {
  const response = await axios.get(`${BASE_URL}/room/search`, {
    params: {
      propertyname,
      roomname,
      checkIn,
      checkOut,
    },
  });
  if (!response.data.response || response.data.response.length === 0) {
    return null;
  }

  return response.data.response[0];
};

export const fetchRoomsDetailsByQuery = async (
  propertyname?: string,
  roomname?: string
) => {
  const response = await axios.get(`${BASE_URL}/room/details`, {
    params: { propertyname, roomname },
  });
  console.log(response?.data?.response);
  const result = response?.data?.response;
  return result;
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
    withCredentials: true,
  });

  console.log(response.data);
  return response.data;
};

export const fetchRoomById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/room/get/${id}`);
  console.log(response.data);
  return response.data;
};

export const editRoom = async (id: string, room: EditRoomType) => {
  const formdata = new FormData();
  formdata.append("name", room.name);
  formdata.append("description", room.description);
  formdata.append("base_price", room.base_price.toString());
  formdata.append("capacity", room.capacity.toString());
  formdata.append("total_rooms", room.total_rooms.toString());
  formdata.append("weekend_peak", JSON.stringify(room.weekend_peak));

  room.image.forEach((file) => {
    formdata.append("images", file);
  });

  if (room.oldImages && room.oldImages.length > 0) {
    room.oldImages.forEach((url) => {
      formdata.append("oldImages", url);
    });
  }

  const response = await axios.patch(`${BASE_URL}/room/edit/${id}`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  console.log(response.data);
  return response.data;
};

export const softDeleteRoom = async (id: string) => {
  const response = await axios.patch(
    `${BASE_URL}/room/delete/${id}`,
    {},
    {
      withCredentials: true,
    }
  );
  console.log(response.data);
  return response.data;
};

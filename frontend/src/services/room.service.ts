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
  console.log(response.data.response[0]);

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

export const blockRoomByTenant = async (
  id: string,
  start_date?: string,
  end_date?: string
) => {
  const response = await axios.post(
    `${BASE_URL}/room/block/${id}?startDate=${start_date}&endDate=${end_date}`,
    {},
    { withCredentials: true }
  );
  return response.data;
};

export const getRoomAvailability = async (
  id: string,
  start_date?: string,
  end_date?: string
) => {
  const response = await axios.get(
    `${BASE_URL}/room/get-date/${id}?startDate=${start_date}&endDate=${end_date}`
  );
  return response.data;
};

export const unBlockRoomByTenant = async (
  id: string,
  start_date?: string,
  end_date?: string
) => {
  const response = await axios.post(
    `${BASE_URL}/room/unblock/${id}?startDate=${start_date}&endDate=${end_date}`,
    {},
    { withCredentials: true }
  );
  return response.data;
};

export const createRoom = async (room: CreateRoomType) => {
  const formData = new FormData();
  formData.append("property_id", room.property_id);
  formData.append("name", room.name);
  formData.append("description", room.description);
  formData.append("base_price", room.base_price.toString());
  formData.append("capacity", room.capacity.toString());
  formData.append("total_rooms", room.total_rooms.toString());
  if (room.weekend_peak) {
    formData.append("weekend_peak[type]", room.weekend_peak.type);
    formData.append("weekend_peak[value]", room.weekend_peak.value.toString());
  }
  if (room.custom_peaks && room.custom_peaks.length > 0) {
    room.custom_peaks.forEach((peak, index) => {
      formData.append(`custom_peaks[${index}][start_date]`, peak.start_date);
      formData.append(`custom_peaks[${index}][end_date]`, peak.end_date);
      formData.append(`custom_peaks[${index}][type]`, peak.type);
      formData.append(`custom_peaks[${index}][value]`, peak.value.toString());
    });
  }

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
  const formData = new FormData();
  formData.append("name", room.name);
  formData.append("description", room.description);
  formData.append("base_price", room.base_price.toString());
  formData.append("capacity", room.capacity.toString());
  formData.append("total_rooms", room.total_rooms.toString());
  formData.append("property_id", room.property_id.toString());
  if (room.weekend_peak) {
    formData.append("weekend_peak[type]", room.weekend_peak.type);
    formData.append("weekend_peak[value]", room.weekend_peak.value.toString());
  }
  if (room.custom_peaks && room.custom_peaks.length > 0) {
    room.custom_peaks.forEach((peak, index) => {
      formData.append(`custom_peaks[${index}][start_date]`, peak.start_date);
      formData.append(`custom_peaks[${index}][end_date]`, peak.end_date);
      formData.append(`custom_peaks[${index}][type]`, peak.type);
      formData.append(`custom_peaks[${index}][value]`, peak.value.toString());
    });
  }
  room.image.forEach((file) => {
    formData.append("images", file);
  });

  if (room.oldImages && room.oldImages.length > 0) {
    room.oldImages.forEach((url) => {
      formData.append("oldImages", url);
    });
  }

  const response = await axios.patch(
    `${BASE_URL}/room/update/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );

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
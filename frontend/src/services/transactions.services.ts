import axios from "axios";
import {
  Booking,
  BookingApiResponse,
  BookingsApiResponse,
  BookingStatus,
  PaginatedBookings,
} from "@/types/transactions/transactions";
import qs from "qs";
import { cookies } from "next/headers";
import { RoomAvailabilityParams } from "@/types/room/room";

export interface FetchBookingsParams {
  status?: BookingStatus;
  sort?: "asc" | "desc";
  startDate?: string;
  endDate?: string;
  bookingId?: string;
  page?: number | string;
  role?: "user" | "tenant";
}

export type FlexibleBookingParams = Omit<FetchBookingsParams, "status"> & {
  status?: readonly string[] | string | string[];
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface CreateBookingPayload {
  propertyId: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  fullName: string;
  email: string;
  quantity: number;
}

export const createBooking = async (bookingData: CreateBookingPayload) => {
  const response = await axios.post(
    `${BASE_URL}/reservations/create`,
    bookingData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const fetchBookings = async <T extends FlexibleBookingParams>(
  query: T
): Promise<PaginatedBookings> => {
  try {
    const endpoint = `${BASE_URL}/reservations/get`;
    const response = await axios.get<BookingsApiResponse>(endpoint, {
      params: { ...query },
      withCredentials: true,
      paramsSerializer: {
        serialize: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    throw new Error("Could not retrieve bookings.");
  }
};

export const fetchTenantBookingById = async (bookingId: string) => {
  try {
    const response = await axios.get<BookingApiResponse>(
      `${BASE_URL}/payment/orders/${bookingId}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(`Failed to fetch booking with ID ${bookingId}:`, error);
    throw new Error("Could not retrieve booking details.");
  }
};

export const fetchUserBookingById = async (bookingId: string) => {
  if (!bookingId) {
    throw new Error("Booking ID is required.");
  }

  try {
    const endpoint = `${BASE_URL}/reservations/${bookingId}`;
    const response = await axios.get<BookingApiResponse>(endpoint, {
      params: { bookingId: bookingId },
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    console.error(`Failed to fetch booking with ID:`, error);
    throw new Error("Could not retrieve booking details.");
  }
};

export const userCancelBookingById = async (bookingId: string) => {
  const response = await axios.patch(
    `${BASE_URL}/reservations/cancel/${bookingId}`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const tenantCancelBookingById = async (id: string) => {
  const response = await axios.patch(
    `${BASE_URL}/payment/cancel/${id}`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const paymentProofUpload = async (payload: {
  bookingId: string;
  file: File;
}) => {
  const { bookingId, file } = payload;

  if (!bookingId || !file) {
    throw new Error("Booking ID and file are required for upload.");
  }

  const formData = new FormData();

  formData.append("proofImage", file);

  try {
    const endpoint = `${BASE_URL}/reservations/proof/${bookingId}`;
    const response = await axios.patch(endpoint, formData, {
      headers: {},
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to upload payment proof:", error);
    throw new Error("Failed to upload payment proof. Please try again.");
  }
};

export const tenantAcceptBookingById = async (id: string) => {
  const response = await axios.patch(
    `${BASE_URL}/payment/accept/${id}`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const tenantRejectBookingById = async (id: string) => {
  const response = await axios.patch(
    `${BASE_URL}/payment/reject/${id}`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const getRoomAmountAvailable = async (params: RoomAvailabilityParams) => {
  const response = await axios.get(`${BASE_URL}/payment/room-availability`, {
    params: params,
  });
  return response.data.data.availableCount
};

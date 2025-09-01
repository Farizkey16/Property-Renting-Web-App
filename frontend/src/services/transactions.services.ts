import axios from "axios";
import {
  Booking,
  BookingsApiResponse,
  BookingStatus,
} from "@/types/transactions/transactions";

export interface FetchBookingsParams {
  status?: BookingStatus
  sort?: "asc" | "desc";
  start?: string;
  end?: string;
  bookingId?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchBookings = async (
  query?: FetchBookingsParams
): Promise<Booking[]> => {
  try {
    const endpoint = `${BASE_URL}/reservations/get`;
    const response = await axios.get<BookingsApiResponse>(endpoint, {
      params: query,
      withCredentials: true,
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    throw new Error("Could not retrieve bookings.");
  }
};

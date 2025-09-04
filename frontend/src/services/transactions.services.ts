import axios from "axios";
import {
  Booking,
  BookingsApiResponse,
  BookingStatus,
} from "@/types/transactions/transactions";
import qs from "qs"

export interface FetchBookingsParams {
  status?: BookingStatus
  sort?: "asc" | "desc";
  startDate?: string;
  endDate?: string;
  bookingId?: string;
}

export type FlexibleBookingParams = Omit<FetchBookingsParams, 'status'> & {
  status?: readonly string[]| string | string[]
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchBookings = async <T extends FlexibleBookingParams> (
  query?: T
): Promise<Booking[]> => {
  try {
    const endpoint = `${BASE_URL}/reservations/get`;
    const response = await axios.get<BookingsApiResponse>(endpoint, {
      params: query,
      withCredentials: true,
      paramsSerializer: {
        serialize: (params) => {
          return qs.stringify(params, {arrayFormat: "repeat"})
        }
      }
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    throw new Error("Could not retrieve bookings.");
  }
};

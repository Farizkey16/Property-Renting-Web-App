import {
  FlexibleBookingParams,
} from "@/services/transactions.services";
import {
  BookingsApiResponse,
  BookingStatus,
  isValidBookingStatus,
  isValidSort,
  PaginatedBookings,
  SortStatus,
} from "@/types/transactions/transactions";
import axios from "axios";
import qs from "qs";
import { getCurrentUser } from "@/lib/cookie-auth";
import { PastBookingsClient } from "@/components/dashboard/PastBookingsClientPage";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type SearchParams = { [key: string]: string | string[] | undefined };

type BookingsPageProps = {
  searchParams: Promise<SearchParams>;
};

const fetchBookings = async <T extends FlexibleBookingParams>(
  query: T
): Promise<PaginatedBookings> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const endpoint = `${BASE_URL}/reservations/get`;
    const response = await axios.get<BookingsApiResponse>(endpoint, {
      params: { ...query },
      withCredentials: true,
      paramsSerializer: {
        serialize: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      },
      headers: {
        Cookie: token ? `token=${token}` : "",
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    throw new Error("Could not retrieve bookings.");
  }
};

export default async function pastBookingsPage({
  searchParams,
}: BookingsPageProps) {
  const user = await getCurrentUser();
  const sp = await searchParams;
  const role =
    user?.role === "user" || user?.role === "tenant" ? user.role : "user";

  const status = Array.isArray(sp.status) ? sp.status[0] : sp.status;
  const sort = Array.isArray(sp.sort) ? sp.sort[0] : sp.sort;
  const page = Array.isArray(sp.page) ? sp.page[0] : sp.page;
  const startDate = Array.isArray(sp.startDate) ? sp.startDate[0] : sp.startDate;
  const endDate = Array.isArray(sp.endDate) ? sp.endDate[0] : sp.endDate;
  const bookingId = Array.isArray(sp.bookingId)
    ? sp.bookingId[0]
    : sp.bookingId;

  type Filters = {
    status: BookingStatus;
    sort: SortStatus;
    page: string;
    bookingId: string;
    startDate?: string;
    endDate?: string 
  };

  const filters: Filters = {
    status: isValidBookingStatus(status)
      ? (status as BookingStatus)
      : "confirmed",
    sort: isValidSort(sort) ? (sort as SortStatus) : "asc",
    page: page || "1",
    bookingId: (bookingId as string) || "",
    startDate: startDate ?? undefined,
    endDate: endDate ?? undefined,
  };

  const { data: bookings, meta } = await fetchBookings(filters);

  return (
    <PastBookingsClient
      bookings={bookings}
      meta={meta}
      filters={filters}
      role={role}
    />
  );
}
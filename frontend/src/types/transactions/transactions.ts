export interface ReviewProps {
    id: string;
    rating: number;
    comment: string | null;
    tenant_reply: string | null;
    created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  property_id: string;
  status:
    | "waiting_payment"
    | "confirmed"
    | "canceled"
    | "canceled_by_tenant"
    | "waiting_confirmation"
    | "expired";
  check_in_date: string;
  check_out_date: string;
  proof_image: string;
  payment_deadline: string;
  amount: number;
  total_price: number;
  property: {
    main_image: string;
    name: string;
    city: string;
  };
  booking_rooms: {
    guests_count: number;
    price_per_night: number;
    room: Room;
  }[];
  _count: {
    reviews: number
  }
  
}

export interface Room {
  name: string;
  propertyId: string;
}

export interface Meta {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

export interface Filters {
  status:
    | "waiting_payment"
    | "confirmed"
    | "canceled"
    | "canceled_by_tenant"
    | "waiting_confirmation"
    | "expired";
  sort: "asc" | "desc" | undefined
}

export interface PaginatedBookings {
  data: Booking[];
  meta: Meta;
}

export interface BookingApiResponse {
  message: string;
  success: boolean;
  data: Booking;
}

export interface BookingsApiResponse {
  message: string;
  success: boolean;
  data: PaginatedBookings;
}

// Type Guard Booking Status
export const VALID_BOOKING_STATUS = [
  "waiting_payment",
  "waiting_confirmation",
  "confirmed",
  "canceled",
  "canceled_by_tenant",
  "expired",
] as const;

export const VALID_BOOKING_HISTORY_STATUS = [
  "confirmed",
  "canceled",
  "canceled_by_tenant",
  "expired",
] as const;

export type BookingStatus = (typeof VALID_BOOKING_STATUS)[number];

export type BookingHistoryStatus = Exclude<BookingStatus, "waiting_payment" | "waiting_confirmation">;

export function isValidBookingStatus(status: unknown): status is BookingStatus {
  return typeof status === "string" && VALID_BOOKING_STATUS.includes(status as BookingStatus);
}

export function isValidBookingHistoryStatus(
  status: BookingHistoryStatus
): status is BookingHistoryStatus {
  return (
    VALID_BOOKING_HISTORY_STATUS.includes(status)
  );
}

// Type Guard Sort
export const VALID_SORT = ["asc", "desc"] as const;

export type SortStatus = (typeof VALID_SORT)[number];

export function isValidSort(sort: unknown): sort is SortStatus {
  return typeof sort === "string" && VALID_SORT.includes(sort as SortStatus);
}

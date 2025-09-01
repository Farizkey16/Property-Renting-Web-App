export interface Booking {
  id: string;
  user_id: string;
  property_id: string;
  status:
    | "waiting_payment"
    | "confirmed"
    | "canceled"
    | "canceled_by_tenant"
    | "expired";
  check_in_date: string;
  check_out_date: string;
  proof_image: string;
  amount: number;
  property: {
    main_image: string;
    name: string;
    city: string;
  };
  booking_rooms: {
    guests_count: number;
  };
}

export interface BookingsApiResponse {
  message: string;
  success: boolean;
  data: Booking[];
}


// Type Guard Booking Status
export const VALID_BOOKING_STATUS = [
  "waiting_payment",
  "confirmed",
  "canceled",
  "canceled_by_tenant",
  "expired",
] as const;

export type BookingStatus = typeof VALID_BOOKING_STATUS[number];

export function isValidBookingStatus(status: any): status is BookingStatus {
    return VALID_BOOKING_STATUS.includes(status)
}

// Type Guard Sort
export const VALID_SORT = [
    "asc",
    "desc"
] as const

export type SortStatus = typeof VALID_SORT[number]

export function isValidSort(sort: any): sort is SortStatus {
    return VALID_SORT.includes(sort)
}

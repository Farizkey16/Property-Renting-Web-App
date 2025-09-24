import { Prisma } from "../../../prisma/generated/client";
import { BookingStatus as PrismaBookingStatus} from "../../../prisma/generated/client";
import { findBookingByIdRepository } from "../../repositories/transaction/tenant-tx.repository";

export type BookingsWhereInput = Prisma.bookingsWhereInput;

export interface ProofImage {
  status: PrismaBookingStatus
  proof_image?: string;
}

export interface FindRooms {
  room_id: string;
  quantity: number;
  room: {
    total_rooms: number;
  };
}

export interface Overlapping {
  room_id: string;
  quantity: number;
}

export type FormattedRoom = {
  name: string;
  check_in_date: string;
  check_out_date: string;
  guests_count: number;
  quantity: number;
  subtotal: number;
  room_id: string;
};

export type BookingTemplateData = {
  guestName: string;
  booking_id: string;
  propertyName: string;
  rooms: FormattedRoom[];
  email: string;
};

export interface BookingRoomCompleteType {
  booking_id: string;
  room_id: string;
  quantity: number;
  id: string;
  check_in_date: Date;
  check_out_date: Date;
  guests_count: number;
  nights: number;
  subtotal: number;
  room: {
    total_rooms: number;
    name: string;
    property: {
      name: string;
    };
  };
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

export type BookingHistoryStatus = Exclude<BookingStatus, "waiting_payment">;

export function isValidBookingStatus(status: any): status is BookingStatus {
  return VALID_BOOKING_STATUS.includes(status);
}

export function isValidBookingHistoryStatus(
  status: any
): status is BookingHistoryStatus {
  return (
    status !== "waiting_payment" &&
    VALID_BOOKING_HISTORY_STATUS.includes(status)
  );
}

export const VALID_SORT = ["asc", "desc"] as const;

export type SortStatus = (typeof VALID_SORT)[number];

export function isValidSort(sort: any): sort is SortStatus {
  return VALID_SORT.includes(sort);
}

type BookingPayload = Prisma.PromiseReturnType<typeof findBookingByIdRepository>;

export type BookingWithDetails = NonNullable<BookingPayload>

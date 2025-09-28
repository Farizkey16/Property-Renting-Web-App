"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { useState } from "react";
import { EventHoveringArg } from "@fullcalendar/core/index.js";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type TooltipInfo = {
  bookingName: string;
  bookingEmail?: string;
  bookingId?: string;
  bookingStart?: Date;
  bookingEnd?: Date;
} | null;

const fetchAvailabilityEvents = async (fetchInfo: { start: Date; end: Date }) => {
  const { start, end } = fetchInfo;

  const params = {
    startDate: start.toISOString(),
    endDate: end.toISOString(),
  };

  const response = await axios.get(`${BASE_URL}/payment/availability`, {
    params,
    withCredentials: true,
  });

  return response.data.data;
};

export default function AvailabilityCalendar() {
  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (info: EventHoveringArg) => {
    const bookingName = info.event.extendedProps.name || "N/A";
    const bookingEmail = info.event.extendedProps.email;
    const bookingId = info.event.extendedProps.id;
    const bookingStart = info.event.start || new Date();
    const bookingEnd = info.event.end || new Date();

    setTooltipInfo({
      bookingName,
      bookingEmail,
      bookingId,
      bookingStart,
      bookingEnd,
    });

    setTooltipPosition({
      top: info.jsEvent.clientY + 10,
      left: info.jsEvent.clientX + 10,
    });
  };

  const handleMouseLeave = () => {
    setTooltipInfo(null);
  };

  return (
    <div className="p-8 relative">
      <h2>Your Bookings</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        aspectRatio={2.5}
        weekends={true}
        events={fetchAvailabilityEvents}
        selectable={true}
        dayMaxEvents={1}
        eventMouseEnter={handleMouseEnter}
        eventMouseLeave={handleMouseLeave}
      />

      {tooltipInfo && (
        <div
          style={{
            position: "fixed",
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            zIndex: 100,
            pointerEvents: "none",
          }}
          className="bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance"
        >
          <p>Booking ID: {tooltipInfo?.bookingId?.slice(0, 6).toUpperCase()}</p>
          <p>Guest Name: {tooltipInfo?.bookingName}</p>
          <p>Guest Email: {tooltipInfo?.bookingEmail}</p>
          <p>
            Booking Date:{" "}
            {tooltipInfo?.bookingStart
              ? tooltipInfo.bookingStart.toLocaleString()
              : ""}{" "}
            -{" "}
            {tooltipInfo?.bookingEnd
              ? tooltipInfo.bookingEnd.toLocaleString()
              : ""}
          </p>
        </div>
      )}
    </div>
  );
}

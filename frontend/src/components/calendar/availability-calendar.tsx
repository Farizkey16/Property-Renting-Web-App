"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const fetchAvailabilityEvents = async (fetchInfo: any) => {
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
  return (
    <div className="p-8">
      <h2>Your Bookings</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        aspectRatio={2.5}
        weekends={true}
        events={fetchAvailabilityEvents}
      />
    </div>
  );
}

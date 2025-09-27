"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useParams } from "next/navigation";
import {
  useUserBookingByQuery,
  useUploadProofMutation,
} from "@/hooks/useBookings";
import { format, parseISO } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import Script from "next/script";
import { SnapMidtrans } from "@/components/features/payment/snap-midtrans/snap-midtrans";
import { UploadProofFunction } from "@/components/features/payment/manual-payment/upload-proof";
import { PaymentInstruction } from "@/components/features/payment/manual-payment/payment-instructions";

export type PaymentPageParams = {
  bookingId: string;
};

export default function PaymentPage() {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading] = useState(false);
  const params = useParams<PaymentPageParams>();
  const uploadMutation = useUploadProofMutation();

  // Fetch ID
  const bookingId = params.bookingId;

  // Fetch Booking
  const {
    data: booking,
    isLoading: BookingLoading,
    isError,
  } = useUserBookingByQuery(bookingId);

  // Data Parsing

  let startDateDisplay = "Date not available";
  let endDateDisplay = "Date not available";
  let totalPriceDisplay = "Calculating...";

  if (booking?.check_in_date) {
    const startDateObject = parseISO(booking.check_in_date);
    startDateDisplay = format(startDateObject, "eee, d MMM yyyy");
  }

  if (booking?.check_out_date) {
    const endDateObject = parseISO(booking.check_out_date);
    endDateDisplay = format(endDateObject, "eee, d MMM yyyy");
  }

  if (booking?.total_price) {
    totalPriceDisplay = formatCurrency(booking.total_price);
  }

  useEffect(() => {
    if (!booking?.payment_deadline) {
      console.log(
        "Timer Effect: Exiting because booking or payment_deadline is missing."
      );
      return;
    }

    const endTime = DateTime.fromISO(
      booking.payment_deadline as unknown as string
    );

    if (!endTime.isValid) {
      console.error(
        "Could not start timer: The date string from the API is in a format Luxon cannot parse with fromISO."
      );
      setTimeLeft("Error");
      return;
    }

    const interval = setInterval(() => {
      const now = DateTime.now();
      const diff = endTime.diff(now);

      if (diff.toMillis() <= 0) {
        setTimeLeft("00:00");
        clearInterval(interval);
        return;
      }

      setTimeLeft(diff.toFormat("mm:ss"));
    }, 1000);

    return () => clearInterval(interval);
  }, [booking]);

  if (isLoading) {
    return <div className="p-8 text-center">Loading payment details...</div>;
  }

  if (isError) {
    return <div className="p-8 text-center text-red-600">Error: {isError}</div>;
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <>
      <Script
        id="midtrans-snap-script"
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="afterInteractive"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Complete Your Payment
            </h1>
            <p className="text-slate-600">
              Upload your payment receipt to confirm your booking
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Instructions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Timer Card */}
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-full">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-orange-900 mb-1">
                        Payment Time Remaining
                      </h3>
                      <p className="text-sm text-orange-700">
                        Complete your payment within the time limit
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-orange-600 font-mono">
                        {timeLeft}
                      </div>
                      <p className="text-xs text-orange-600">minutes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Instructions */}
              <PaymentInstruction totalPriceDisplay={totalPriceDisplay} />

              {/* Pay with Midtrans */}
              <SnapMidtrans bookingId={bookingId} />

              {/* Upload Receipt */}
              <UploadProofFunction
                onFileSelect={handleFileSelect}
                bookingId={bookingId}
                uploadedFile={uploadedFile}
                isPending={uploadMutation.isPending}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

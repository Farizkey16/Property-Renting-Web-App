"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Upload,
  Clock,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Shield,
  FileText,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  useBookings,
  useBookingById,
  useUserBookingByQuery,
  useUploadProofMutation,
} from "@/hooks/useBookings";
import { format, parseISO } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { usePriceQuote } from "@/hooks/usePriceQuote";
import { paymentProofUpload } from "@/services/transactions.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Script from "next/script";
import { SnapMidtrans } from "@/components/ui/snap-midtrans";
import axios from "axios";

export type PaymentPageParams = {
  bookingId: string;
};

export default function PaymentPage() {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams<PaymentPageParams>();
  const uploadMutation = useUploadProofMutation();
  const router = useRouter();

  // Fetch ID
  const bookingId = params.bookingId;

  // Fetch Booking
  const {
    data: booking,
    isLoading: BookingLoading,
    isError,
  } = useUserBookingByQuery(bookingId);

  console.log("Fetching data from bookingID:", booking, bookingId);

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

  const handleUploadProof = async () => {
    if (!uploadedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();

    formData.append("proof_image", uploadedFile);

    try {
      await axios.patch(
        `http://localhost:4000/reservations/proof/${bookingId}`,
        formData,
        { withCredentials: true }
      );
      toast.success("Payment proof uploaded successfully!")
      router.push(`/dashboard/booking-confirmation/${bookingId}`)
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Upload failed. Please try again.") 
    } finally {
      setIsLoading(false)
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
              <Card className="py-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      Bank Transfer Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Bank Name:</span>
                        <span className="font-medium">
                          Bank Central Asia (BCA)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Account Number:</span>
                        <span className="font-medium font-mono">
                          1234567890
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Account Name:</span>
                        <span className="font-medium">
                          Luxury Hotels Indonesia
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Amount:</span>
                        <span className="font-bold text-lg text-emerald-600">
                          {totalPriceDisplay}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 mb-1">
                        Important Notes:
                      </p>
                      <ul className="text-blue-700 space-y-1">
                        <li>• Transfer the exact amount shown above</li>
                        <li>• Keep your transfer receipt for upload</li>
                        <li>
                          • Payment must be completed within the time limit
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pay with Midtrans */}

              <SnapMidtrans bookingId={bookingId} />

              {/* Upload Receipt */}
              <Card className="py-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Payment Receipt
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors">
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="receipt-upload"
                    />
                    <label htmlFor="receipt-upload" className="cursor-pointer">
                      <div className="space-y-3">
                        <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                          <FileText className="h-6 w-6 text-slate-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            Click to upload receipt
                          </p>
                          <p className="text-sm text-slate-500">
                            PNG, JPEG, or JPG up to 1MB
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>

                  {uploadedFile && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="font-medium text-green-900">
                          {uploadedFile.name}
                        </p>
                        <p className="text-sm text-green-700">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleUploadProof}
                    disabled={!uploadedFile || uploadMutation.isPending}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    size="lg"
                  >
                    {uploadMutation.isPending
                      ? "Uploading..."
                      : "Submit Payment Receipt"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

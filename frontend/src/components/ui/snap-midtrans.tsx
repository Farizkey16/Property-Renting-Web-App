"use client";

import axios from "axios";
import { useState } from "react";
import { Button } from "./button";
import { toast } from "react-toastify";
import { headers } from "next/headers";
import { Card } from "./card";

interface SnapProps {
  bookingId: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const SnapMidtrans = ({ bookingId }: SnapProps) => {
  const [paymentResult, setPaymentResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    setPaymentResult(null);

    try {
      const response = await axios.post(
        `${BASE_URL}/midtrans/create-transaction/${bookingId}`,
        {},
        { withCredentials: true }
      );
      const { token } = response.data.data;

      if (!token) {
        throw new Error("Failed to get payment token.");
      }

      window.snap.pay(token, {
        onSuccess: (result: any) => {
          setPaymentResult(result);
          toast.success("Payment successful!");
        },
        onError: (result: any) => {
          setPaymentResult(result);
          toast.error("Payment failed.");
        },
        onClose: () => {
          toast.warn("You closed the payment window without finishing.");
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <Button onClick={handlePayment} disabled={isLoading} size="lg">
        {isLoading ? "Processing..." : "Pay With Midtrans"}
      </Button>
    </Card>
  );
};

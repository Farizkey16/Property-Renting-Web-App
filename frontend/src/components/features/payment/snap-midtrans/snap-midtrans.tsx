"use client";

import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

interface SnapProps {
  bookingId: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const SnapMidtrans = ({ bookingId }: SnapProps) => {
  const [paymentResult, setPaymentResult] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCloseModal = () => {
        setIsSuccessModalOpen(false);
        router.push("/dashboard/bookings?page=1&status=confirmed&sort=desc")
      }

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
          console.log("Payment Successful.");
          toast.success("Payment successful!");
          setIsSuccessModalOpen(true);
        },
        onError: (result: any) => {
          setPaymentResult(result);
          console.log("Payment Unsuccessful.");
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
    <>
      <Card>
        <Button onClick={handlePayment} disabled={isLoading} size="lg">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner className="h-5 w-5" />
              <span>Processing...</span>
            </div>
          ) : (
            "Pay With Midtrans"
          )}
        </Button>
      </Card>

      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent
          onEscapeKeyDown={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader className="flex flex-col items-center text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <DialogTitle className="text-2xl">Payment successful!</DialogTitle>
            <DialogDescription className="pt-2">
              Your booking has been confirmed, you will receive confirmation
              once the tenant accepts your payment.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleCloseModal}>View My Bookings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Booking } from "@/types/transactions/transactions";
import { MapPin, Calendar, Users, CheckCircle } from "lucide-react";
import {
  useCancelBookingByRole,
  useTenantAcceptBooking,
  useTenantRejectBooking,
} from "@/hooks/useBookings";
import { formatCurrency } from "@/lib/utils";
import { ViewProofModal } from "../ui/view-proof";
import { LeaveReviewForm } from "./leave-review";
import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/shadcn-io/spinner";
import { toast } from "sonner";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
        
const getStatusColor = (status: string) => {
  switch (status) {
    case "waiting_confirmation":
      return "bg-gray-100 text-green-700 hover:bg-green-100";
    case "waiting_payment":
      return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
    case "canceled":
      return "bg-red-100 text-red-700 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-700 hover:bg-gray-100";
  }
};

export type BookingCardProps = {
  booking: Booking;
  role: "tenant" | "user";
};

export const BookingCard = ({ booking, role }: BookingCardProps) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const cancelBookingMutation = useCancelBookingByRole(role);
  const acceptBookingMutation = useTenantAcceptBooking();
  const rejectBookingMutation = useTenantRejectBooking();
  const guests = booking.booking_rooms.reduce(
    (acc, num) => acc + num.guests_count,
    0
  );
  const roomName = booking.booking_rooms.map((br) => br.room.name).join(", ");
  const price = booking.amount;

  const bookingId = booking.id;
  const hasReviewed = booking._count.reviews;

  const isTenantActionRequired =
    role === "tenant" && booking.status === "waiting_confirmation";

  const canUserCancel =
    role !== "tenant" &&
    ((!booking.proof_image && booking.status === "waiting_payment") ||
      booking.status === "waiting_confirmation");

  const handleCancel = (bookingId: string) => {
    cancelBookingMutation.mutate(bookingId);
  };

  const handleAccept = (bookingId: string) => {
    acceptBookingMutation.mutate(bookingId);
  };
  const handleReject = (bookingId: string) => {
    rejectBookingMutation.mutate(bookingId);
  };

  const handleButtonClick = async () => {
    fileInputRef.current?.click();
  };

  const handleReuploadProof = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("proof_image", file);

      try {
        await axios.patch(
          `http://localhost:4000/reservations/proof/${bookingId}`,
          formData,
          { withCredentials: true }
        );
        toast.success("Payment proof uploaded successfully!");
        setIsSuccessModalOpen(true);
      } catch (error) {
        toast.error("Failed to upload payment proof. Please try again later.");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setIsSuccessModalOpen(false);
    router.push(
      "/dashboard/bookings?page=1&status=waiting_confirmation&sort=desc"
    );
  };

  return (
    <CardContent className="px-1 py-1">
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent
          onEscapeKeyDown={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          className="sm:max-w-md"
        >
          <DialogHeader className="flex flex-col items-center text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <DialogTitle className="text-2xl">Upload Successful!</DialogTitle>
            <DialogDescription className="pt-2">
              Your payment proof has been submitted. The tenant will verify it
              shortly.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4">
            <Button onClick={handleCloseModal} className="w-full">
              View My Bookings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="space-y-1">
        <Card key={booking.id} className="border border-gray-200">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">

              <div className="w-full lg:w-32 h-20 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  height={80}
                  width={128}
                  src={booking.property?.main_image ?? "/placeholder.svg"}
                  alt={booking.property?.name || "Property Image"}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Booking Details */}
              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {booking?.property?.name} - {roomName}
                    </h3>
                    <h6 className="font-semibold text-[12px] text-gray-800">
                      Booking Reference ID:{" "}
                      {booking.id.slice(0, 6).toUpperCase()}
                    </h6>

                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {booking.property?.city}
                    </div>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {new Date(booking.check_in_date).toLocaleDateString()} -{" "}
                      {new Date(booking.check_out_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{`${guests} guest(s)`}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {`Total Price: ${formatCurrency(price)}`}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  {isTenantActionRequired ? (
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 cursor-pointer"
                      onClick={() =>
                        toast.warning(
                          "Are you sure you want to accept this booking?",
                          {
                            description: "You cannot undo this action.",
                            action: {
                              label: "Accept",
                              onClick: () => handleAccept(booking.id),
                            },
                          }
                        )
                      }
                    >
                      {" "}
                      Accept
                    </Button>
                  ) : (
                    ""
                  )}

                  {isTenantActionRequired ? (
                    <Button
                      size="sm"
                      className="bg-red-500 hover:bg-red-600 cursor-pointer"
                      onClick={() =>
                        toast.warning(
                          "Are you sure you want to reject this booking?",
                          {
                            description: "You cannot undo this action.",
                            action: {
                              label: "Reject",
                              onClick: () => handleReject(booking.id),
                            },
                          }
                        )
                      }
                    >
                      {" "}
                      Reject
                    </Button>
                  ) : (
                    ""
                  )}

                  <ViewProofModal
                    proof_image={booking.proof_image}
                    status={booking.status}
                    role={role}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleReuploadProof}
                    accept="image/png, image/jpg, image/jpeg"
                    style={{ display: "none" }}
                  />
                  {role === "user" &&
                    (booking.status === "waiting_payment" ||
                      booking.status === "waiting_confirmation") && (
                      <Button
                        size="sm"
                        className="cursor-pointer"
                        onClick={handleButtonClick}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <Spinner className="h-4 w-4" />
                            <span>Uploading...</span>
                          </div>
                        ) : !booking.proof_image ? (
                          "Submit Payment Proof"
                        ) : (
                          "Resubmit Payment Proof"
                        )}

                      </Button>
                    )}

                  {canUserCancel && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 bg-transparent cursor-pointer"
                      disabled={cancelBookingMutation.isPending}
                      onClick={() =>
                        toast.warning(
                          "Are you sure you want to cancel this booking?",
                          {
                            description: "You cannot undo this action.",
                            action: {
                              label: "Cancel",
                              onClick: () => handleCancel(booking.id),
                            },
                          }
                        )
                      }
                    >
                      Cancel
                    </Button>
                  )}

                  {booking.status === "confirmed" &&
                    role === "user" &&
                    !hasReviewed &&
                    new Date(booking.check_out_date) < new Date() && (
                      <>
                        <LeaveReviewForm bookingId={booking.id} />
                      </>
                    )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  );
};

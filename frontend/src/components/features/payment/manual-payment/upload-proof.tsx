"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

type UploadProofParams = {
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  bookingId: string;
  uploadedFile: File | null;
  isPending: boolean;
};

export const UploadProofFunction = ({
  onFileSelect,
  bookingId,
  uploadedFile,
}: UploadProofParams) => {
  const router = useRouter();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleCloseModal = () => {
    setIsSuccessModalOpen(false);
    router.push("/dashboard/bookings");
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
      toast.success("Payment proof uploaded successfully!");
      setIsSuccessModalOpen(true);
      router.push("/dashboard/bookings?page=1&sort=desc&status=waiting_confirmation");
    } catch (error) {

      toast.error(
       "Upload failed. Please try again."
      );
      console.error("Error uploading payment proof:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
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
              accept="image/png, image/jpg"
              onChange={onFileSelect}
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
                  <p className="text-sm text-slate-500">PNG or JPG up to 1MB</p>
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
            disabled={!uploadedFile || isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            size="lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner className="h-5 w-5" />
                <span>Processing...</span>
              </div>
            ) : (
              "Submit Payment Receipt"
            )}
          </Button>
        </CardContent>
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
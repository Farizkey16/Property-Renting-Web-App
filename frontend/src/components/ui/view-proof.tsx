import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";
import Image from "next/image";
import { BookingStatus } from "@/types/transactions/transactions";
import { ShieldCheck } from "lucide-react";

interface ProofProps {
  proof_image: string;
  status: BookingStatus;
  role: "user" | "tenant"
}

export function ViewProofModal({ proof_image, status, role }: ProofProps) {

  if (proof_image === null && status === "confirmed") {
    return(
    <div className="inline-flex items-center justify-center rounded-md text-sm font-medium h-8 px-3 gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-800">
      <ShieldCheck className="h-4 w-4" />
      <span>Paid with Midtrans</span>
    </div>);
  }

  if ((role === "user"|| role === "tenant" ) && proof_image && status === "waiting_confirmation") {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
            size="sm"
          >
            View Proof
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Proof</DialogTitle>
            <Image
              src={proof_image}
              alt="Payment proof"
              height={700}
              width={500}
              className="rounded-md object-contain w-full h-auto"
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }
}

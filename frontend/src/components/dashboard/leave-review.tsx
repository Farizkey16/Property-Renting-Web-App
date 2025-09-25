"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Rating } from "react-simple-star-rating";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createReview } from "@/services/reviews.service";
import { toast } from "sonner";
import { Spinner } from "../ui/shadcn-io/spinner";

interface LeaveReviewFormProps {
  bookingId: string;
}

export const LeaveReviewForm = ({ bookingId }: LeaveReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const createReviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      toast.success("Thank you for your review!");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = () => {
    if (rating === 0) {
      toast.warning("Please provide a star rating");
      return;
    }
    createReviewMutation.mutate({ bookingId, rating, comment });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Leave Review
        </Button>
      </DialogTrigger>
      <DialogContent onEscapeKeyDown={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>How was your stay?</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="text-center">
            <Rating
              className="flex"
              onClick={(rate) => setRating(rate)}
              initialValue={rating}
              size={40}
              transition
              SVGstyle={{ display: "inline" }}
            />
          </div>
          <div>
            <Label htmlFor="comment">Your review (optional)</Label>
            <Textarea
              id="comment"
              placeholder="Tell us about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={createReviewMutation.isPending}
            className="w-full"
          >
            {createReviewMutation.isPending ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner className="h-5 w-5" />
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit Review"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

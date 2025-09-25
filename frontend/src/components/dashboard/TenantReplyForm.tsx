"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { replyReview } from "@/services/reviews.service";
import { Spinner } from "../ui/shadcn-io/spinner";

interface TenantReplyFormProps {
  reviewId: string;
}

export const TenantReplyForm = ({ reviewId }: TenantReplyFormProps) => {
  const [reply, setReply] = useState("");
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: submitReply, isPending } = useMutation({
    mutationFn: replyReview,
    onSuccess: () => {
      toast.success("Your reply has been posted.");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      setOpen(false); 
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = () => {
    if (!reply) {
      toast.warning("Please write a reply.");
      return;
    }
    submitReply({ reviewId, reply });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Reply to Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Post a Public Reply</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Label htmlFor="reply">Your reply</Label>
          <Textarea
            id="reply"
            placeholder="Write your reply to the guest..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="mt-2"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? <div className="flex items-center justify-center gap-2">
                          <Spinner className="h-5 w-5" />
                          <span>Submitting...</span>
                        </div> : "Submit Reply"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
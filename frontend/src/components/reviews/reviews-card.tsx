"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rating } from "react-simple-star-rating";
import { Review } from "@/types/reviews/reviews.types";
import { usePropertyReviews } from "@/hooks/useReviews";

interface ReviewsCardProps {
  reviews: Review[];
  reviewsPerPage?: number;
}

const ReviewCard = ({ review }: { review: Review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowToggle = review.comment && review.comment.length > 150;

  return (
    <Card className="border-0 shadow-none p-0">
      <CardContent className="p-3">
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={review.user.profilePicture || "/placeholder.svg"}
              alt={review.user.fullName}
            />

            {/* <AvatarFallback>{review.user.fullName.charAt(0)}</AvatarFallback> */}
          </Avatar>
          <div>
            <h4 className="font-semibold text-base">{review.user.fullName}</h4>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Rating initialValue={review.rating} readonly size={20} />
          </div>
          <span className="text-sm text-muted-foreground">
            {new Date(review.createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="text-sm leading-relaxed">
          {review.comment &&
            (isExpanded || !shouldShowToggle
              ? review.comment
              : `${review.comment.slice(0, 150)}...`)}
          {shouldShowToggle && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-1 text-sm font-medium underline hover:no-underline"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        {review.tenantReply && (
          <div className="mt-4 p-4 bg-slate-50 rounded-lg border">
            <p className="font-semibold text-sm text-slate-800">
              Reply from the owner
            </p>
            <p className="text-sm text-slate-600 mt-2">{review.tenantReply}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const ReviewList = ({ propertyId }: { propertyId: string }) => {

  const {
    data,
    error,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePropertyReviews(propertyId);


  if (isLoading) return <div>Loading reviews...</div>;
  if (isError) return <div>An error occurred: {error.message}</div>;

   console.log("1. Attempting to fetch reviews for data:", data);

  const allReviews = data?.pages.flatMap((page) => page.data) || [];

  if (allReviews.length === 0) {
    return <div className="text-center py-8">No reviews yet.</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
        {allReviews.map((review: Review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <div className="mt-8 text-center">
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading more..." : "Show More Reviews"}
          </Button>
        )}
      </div>
    </div>
  );
};

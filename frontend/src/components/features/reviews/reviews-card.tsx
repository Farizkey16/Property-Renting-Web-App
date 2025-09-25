"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Rating } from "react-simple-star-rating";
import { usePropertyReviews } from "@/hooks/useReviews";
import { PaginationControl } from "@/components/fragment/pagination-control/PaginationControl";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Review } from "@/types/reviews/reviews.types";

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
          <Avatar className="w-7 h-7">
            <AvatarImage
              src={review.user.profilePicture || "/placeholder.svg"}
              alt={review.user.full_name}
            />
            <AvatarFallback>{review.user.full_name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-base">{review.user.full_name}</h4>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Rating
              className="flex flex-row"
              initialValue={review.rating}
              SVGstyle={{ display: "inline" }}
              readonly
              size={20}
            />
          </div>
          <span className="text-sm text-muted-foreground mt-1">
            {new Date(review.created_at).toLocaleDateString("en-US", {
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

        {review.tenant_reply && (
          <div className="mt-4 p-4 bg-slate-50 rounded-lg border">
            <p className="font-semibold text-sm text-slate-800">
              Reply from the owner
            </p>
            <p className="text-sm text-slate-600 mt-2">{review.tenant_reply}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const ReviewList = ({ propertyId }: { propertyId: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;
  const {
    data: reviews,
    error,
    isError,
    isLoading,
  } = usePropertyReviews(propertyId, currentPage);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  if (isError) return <div>An error occurred: {error.message}</div>;

  const allReviews = reviews.data;
  const meta = reviews.meta;

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

      <PaginationControl
        totalItems={meta.totalItems}
        pageSize={meta.limit}
        currentPage={meta.page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

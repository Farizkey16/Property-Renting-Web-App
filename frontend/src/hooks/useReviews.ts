import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchReviews } from "@/services/reviews.service";

export const usePropertyReviews = (propertyId: string) => {
  return useInfiniteQuery({
    queryKey: ["reviews", propertyId],
    queryFn: ({ pageParam }) => fetchReviews({ propertyId, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = lastPage.meta.page;
      const totalPages = lastPage.meta.totalPages;

      if (currentPage < totalPages) {
        return currentPage + 1;
      }

      return undefined;
    },
  });
};

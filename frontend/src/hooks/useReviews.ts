import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchReviews } from "@/services/reviews.service";

export const usePropertyReviews = (propertyId: string, page: number) => {

  return useQuery({
    queryKey: ['reviews', propertyId, page],
    queryFn: () => fetchReviews({propertyId, page}),
    enabled: !!propertyId
  })
};

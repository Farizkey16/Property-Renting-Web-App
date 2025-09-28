import { useQuery } from "@tanstack/react-query";
import { fetchPriceQuote } from "@/services/pricing.services";

export const usePriceQuote = (
  roomId: string,
  checkIn: string,
  checkOut: string,
  total: string
) => {
  return useQuery({
    queryKey: ["price-quote", roomId, checkIn, checkOut, total],
    queryFn: () => fetchPriceQuote({ roomId, checkIn, checkOut, total }),
    enabled: !!roomId && !!checkIn && !!checkOut && !!total,
  });
};


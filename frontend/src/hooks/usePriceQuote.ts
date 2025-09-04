import { useQuery } from "@tanstack/react-query";
import { fetchPriceQuote } from "@/services/pricing.services";

export const usePriceQuote = (roomId: string, checkIn: string, checkOut: string) => {
    return useQuery({
        queryKey: ['price-quote', roomId, checkIn, checkOut],
        queryFn: () => fetchPriceQuote({roomId, checkIn, checkOut}),
        enabled:  !!roomId && !!checkIn && !!checkOut
    })
}
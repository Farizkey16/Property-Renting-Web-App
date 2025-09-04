import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface FetchPriceParams {
  roomId?: string;
  checkIn?: string;
  checkOut?: string;
}

export const fetchPriceQuote = async (params: FetchPriceParams) => {
  try {
    const endpoint = `${BASE_URL}/pricing/quote`;
    const response = await axios.get(endpoint, {
      params: params,
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to calculate price:", error);
    throw new Error("Could not calculate price.");
  }
};

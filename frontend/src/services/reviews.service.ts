import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type FetchReviewsParams = {
  propertyId: string;
  page?: number;
};

export interface CreateReviewPayload {
  bookingId: string;
  rating: number;
  comment?: string;
}

export interface ReplyReviewPayload {
  reviewId: string;
  reply: string;
}

export const fetchReviews = async ({
  propertyId,
  page = 1,
}: FetchReviewsParams) => {
  const endpoint = `${BASE_URL}/property/${propertyId}/reviews`;
  const response = await axios.get(endpoint, {
    params: {
      page: page,
      limit: 3,
    },
    withCredentials: true,
  });

  return response.data
};

export const createReview = async (payload: CreateReviewPayload) => {
  const { bookingId, rating, comment } = payload;
  const endpoint = `${BASE_URL}/reservations/${bookingId}/reviews`;
  const response = await axios.post(
    endpoint,
    { rating, comment },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const replyReview = async (payload: ReplyReviewPayload) => {
  const { reviewId, reply } = payload;
  const endpoint = `${BASE_URL}/reviews/${reviewId}/reviews`;
  const response = await axios.post(
    endpoint,
    { reply },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

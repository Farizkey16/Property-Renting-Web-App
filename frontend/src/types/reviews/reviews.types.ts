type FetchReviewList = {
    propertyId: string
}

export interface ReviewUser {
    full_name: string;
    profilePicture: string | null;
}

export interface Review {
    id: string;
    rating: number;
    comment: string | null;
    tenantReply: string | null;
    created_at: string;
    user: ReviewUser
}

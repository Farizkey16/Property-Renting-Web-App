type FetchReviewList = {
    propertyId: string
}

export interface ReviewUser {
    fullName: string;
    profilePicture: string | null;
}

export interface Review {
    id: string;
    rating: number;
    comment: string | null;
    tenantReply: string | null;
    createdAt: string;
    user: ReviewUser
}

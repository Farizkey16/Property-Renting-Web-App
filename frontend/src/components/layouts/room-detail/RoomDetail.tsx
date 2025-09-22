import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { ReviewList } from "@/components/features/reviews/reviews-card";
import { RoomDetailProps } from "@/types/room/room";

export default function RoomDetail({ data }: RoomDetailProps) {
  if (!data) {
    return <div className="p-6">No room found</div>;
  }

  const propertyId = data?.property?.id;
  const reviewsCount = data.property._count.reviews
  const ratingSum = data.property.reviews.reduce((acc, review)=> acc + review.rating, 0)
  const ratingDisplay = ratingSum/reviewsCount

  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Image Gallery */}
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-4 lg:col-span-3">
          <Image
            src={data?.image || "/placeholder.svg"}
            alt="Main workspace area"
            width={800}
            height={500}
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </div>
        <div className="col-span-4 lg:col-span-1 grid gap-2">
          <Image
            src={data?.room_images?.[1]?.image_url || "/placeholder.svg"}
            alt="Bedroom area"
            width={300}
            height={195}
            className="w-full h-[195px] object-cover rounded-lg"
          />
          <Image
            src={data?.room_images?.[2]?.image_url || "/placeholder.svg"}
            alt="Kitchen area"
            width={300}
            height={195}
            className="w-full h-[195px] object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Property Info */}
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {data.name || "Property Name"}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Star className="w-4 h-4 fill-current text-yellow-400" />
              <span className="text-sm font-medium">{ratingDisplay.toFixed(1)}</span>
              <span className="text-sm text-gray-500">{`${reviewsCount} Ratings`}</span>
            </div>
          </div>
          <button aria-label="Add to wishlist">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Description</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {data.description}
            </p>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card className="px-4 py-6">
          <h3 className="text-lg font-medium ">Reviews & Ratings</h3>
          {propertyId ? (
            <ReviewList propertyId={propertyId} />
          ) : (
            <div className="text-center py-8">Loading reviews...</div>
          )}
        </Card>

        {/* Property Info */}
        <Card>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center items-center">
            <div>
              <Image
                src={data.property.main_image || "/placeholder.svg"}
                alt={data.property.name || "Property Image"}
                width={600}
                height={400}
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>
            <CardContent className="space-y-2">
              <h3 className="text-lg font-medium mb-2">Property Information</h3>
              <div className="text-sm text-gray-700 space-y-1">
                <div>
                  <strong>Name:</strong> {data.property.name}
                </div>
                <div>
                  <strong>Address:</strong> {data.property.address}
                </div>
                <div>
                  <strong>City:</strong> {data.property.city}
                </div>
                <div>
                  <strong>Province:</strong> {data.property.province}
                </div>
                <div>
                  <strong>Property Type:</strong>{" "}
                  {data.property.property_category}
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}

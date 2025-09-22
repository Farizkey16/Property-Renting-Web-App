import { MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ApiProperty, Room } from "@/types/room/room";
import { formatCurrency } from "@/lib/utils";

interface PropertyCardProps {
  property: ApiProperty;
  room: Room;
}

export function PropertyCard({ property, room }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer w-full">
      <div className="relative hover:scale-105 transition-all duration-200">
        <Image
          src={room.image || "public/roomplaceholder.svg"}
          alt={room.name}
          width={300}
          height={200}
          className="w-full h-40 sm:h-48 object-cover"
        />
        {property.property_category && (
          <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-blue-500 text-white border-0 text-xs ">
            {property.property_category}
          </Badge>
        )}
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-1 ">
          {property.name}
        </h3>
        <h3 className="font-bold text-gray-700 text-sm sm:text-base line-clamp-1 mb-1">
          {room.name}
        </h3>

        <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-1">
          <MapPin className="w-4 h-4 inline mr-1" />
          {property.address}, {property.city}, {property.province}
        </p>

        {room && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base sm:text-lg">
                {formatCurrency(room.base_price)}
              </span>
              <span className="text-xs sm:text-sm text-gray-600">/malam</span>
            </div>
            <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>{room.capacity} tamu</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";

interface PropertyCardProps {
  name: string;
  city: string;
  category: string;
  roomsCount: number;
  mainImage?: string;
  icon: LucideIcon;
  color?: "blue" | "green" | "purple" | "orange";
}

const colorClasses = {
  blue: "text-blue-500",
  green: "text-green-500",
  purple: "text-purple-500",
  orange: "text-orange-500",
};

export function PropertyCard({
  name,
  city,
  category,
  roomsCount,
  mainImage,
  icon: Icon,
  color = "blue",
}: PropertyCardProps) {
  return (
    <Card className="overflow-hidden">
      {/* Thumbnail */}
      {mainImage && (
        <div className="relative h-32 w-full">
          <Image src={mainImage} alt={name} fill className="object-cover" />
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{city}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {category} • {roomsCount} rooms
            </p>
          </div>
          <div className={`p-2 rounded-lg bg-muted ${colorClasses[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

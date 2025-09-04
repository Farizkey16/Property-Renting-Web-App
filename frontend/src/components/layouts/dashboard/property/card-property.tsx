import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface PropertyCardProps {
  name: string;
  city: string;
  category: string;
  roomsCount: number;
  mainImage?: string;
  EditIcon: LucideIcon;
  DeleteIcon: LucideIcon;
  editHref: string;
  onDelete?: () => void;
}

export function PropertyCard({
  name,
  city,
  category,
  roomsCount,
  mainImage,
  EditIcon,
  DeleteIcon,
  editHref,
  onDelete,
}: PropertyCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition">
      {/* Thumbnail */}
      {mainImage && (
        <div className="relative h-32 w-full">
          <Image src={mainImage} alt={name} fill className="object-cover" />
        </div>
      )}

      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-lg font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{city}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {category} • {roomsCount} rooms
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Link
              href={editHref}
              className="p-2 rounded-lg bg-muted text-blue-500 hover:bg-blue-100">
              <EditIcon className="w-5 h-5" />
            </Link>
            <button
              type="button"
              onClick={onDelete}
              className="p-2 rounded-lg bg-muted text-red-500 hover:bg-red-100">
              <DeleteIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

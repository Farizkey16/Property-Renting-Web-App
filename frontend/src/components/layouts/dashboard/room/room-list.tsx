"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface RoomListProps {
  rooms: Array<{
    id: string;
    name: string;
    base_price: string;
    capacity: number;
    image?: string;
    status?: string;
    propertyName?: string;
    room_images?: { image_url: string }[];
  }>;
}

const statusColors: Record<string, string> = {
  Available: "bg-green-100 text-green-800",
  Occupied: "bg-yellow-100 text-yellow-800",
  Maintenance: "bg-red-100 text-red-800",
};

export function RoomList({ rooms }: RoomListProps) {
  return (
    <Card>
      <CardContent>
        <div className="overflow-x-auto rounded-lg border ">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">
                  No.
                </th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">
                  Room
                </th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">
                  Property
                </th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">
                  Price
                </th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">
                  Capacity
                </th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">
                  Status
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <tr
                  key={room.id}
                  className="border-t hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-3">{index + 1}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-9 h-9">
                        <AvatarImage
                          src={room.image || room.room_images?.[0]?.image_url}
                          alt={room.name}
                        />
                        <AvatarFallback>
                          {room.name?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{room.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">{room.propertyName || "-"}</td>
                  <td className="py-3 px-3 text-muted-foreground">
                    Rp {Number(room.base_price).toLocaleString("id-ID")}
                  </td>
                  <td className="py-3 px-3">{room.capacity}</td>
                  <td className="py-3 px-3">
                    <Badge
                      variant="secondary"
                      className={
                        statusColors[
                          room.status as keyof typeof statusColors
                        ] || "bg-gray-100 text-gray-800"
                      }>
                      {room.status || "Available"}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

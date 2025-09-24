"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { DeleteDialog } from "@/components/fragment/button-action/DeleteDialog";
import { useDeleteRoom } from "@/hooks/useRoom";

interface RoomListProps {
  rooms: Array<{
    id: string;
    name: string;
    base_price: number;
    capacity: number;
    image?: string;
    status?: string;
    created_at?: string;
    room_images?: { image_url: string }[];
  }>;
}

const statusColors: Record<string, string> = {
  Available: "bg-green-100 text-green-800",
  Occupied: "bg-yellow-100 text-yellow-800",
  Maintenance: "bg-red-100 text-red-800",
};

export function RoomList({ rooms }: RoomListProps) {
  const { mutateAsync: deleteRoom, isPending } = useDeleteRoom();
  return (
    <div>
      <div>
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
                  Price
                </th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">
                  Capacity
                </th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">
                  Created At
                </th>
                <th className="text-center py-3 px-3 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {rooms.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-3 px-3 text-center text-muted-foreground">
                    No rooms
                  </td>
                </tr>
              ) : (
                rooms.map((room, index) => (
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
                    <td className="py-3 px-3 text-muted-foreground">
                      {formatCurrency(room.base_price)}
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
                    <td className="py-3 px-3">
                      {formatDate(room.created_at ?? "")}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-8">
                        <Link href={`/dashboard/property/room/edit/${room.id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>

                        <DeleteDialog
                          title="Delete Room"
                          description="Are you sure you want to delete this room?"
                          onConfirm={async () => {
                            await deleteRoom(room.id);
                            alert("Room deleted successfully");
                          }}
                          trigger={
                            <Button
                              variant="destructive"
                              size="icon"
                              disabled={isPending}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

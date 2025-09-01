export type RoomsType = {
  property_id: string;
  name: string;
  description?: string;
  base_price: number;
  capacity: number;
  image?: string;
  total_rooms: number;
  room_images?: { image_url: string }[];
};

export interface Room {
  id: string;
  property_id: string;
  name: string;
  description: string;
  base_price: number;
  capacity: number;
  image: string;
  total_rooms: number;
}

export interface ApiProperty {
  id: string;
  tenant_id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  province: string;
  zip_code: string;
  latitude: string;
  longitude: string;
  main_image: string;
  property_category: string;
  rooms: Room[];
}

export interface RoomAvailabilityParams {
  roomId: string;
  checkIn: string; 
  checkOut: string; 
}

export interface CreateRoomType {
  property_id: string;
  name: string;
  description: string;
  base_price: number;
  capacity: number;
  total_rooms: number;
  image: File[];
  weekend_peak?: { type: "percentage" | "nominal"; value: number };
}

export interface EditRoomType {
  id: string;
  name: string;
  description: string;
  base_price: number;
  capacity: number;
  total_rooms: number;
  image: File[];
  oldImages?: string[];
  property_id: string;
  weekend_peak?: { type: "percentage" | "nominal"; value: number };
}

export interface RoomImage {
  id: string;
  room_id: string;
  image_url: string;
  created_at: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  yearsOnPlatform: number;
  rating: number;
  date: string;
  content: string;
  isExpanded?: boolean;
}

export interface Property {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  province: string;
  zip_code?: string;
  latitude: string;
  longitude: string;
  main_image: string;
  created_at: string;
  updated_at?: string;
  deleted_at: string | null;
  property_category: string;
  property_images: string[];
  _count: {
    reviews: number;
  };
  reviews: Review[];
}

export interface RoomDetailData {
  id: string;
  name: string;
  description: string;
  base_price: string;
  capacity: number;
  image: string;
  created_at: string;
  updated_at?: string;
  deleted_at: string | null;
  total_rooms?: number;
  property: Property;
  room_images?: RoomImage[];
}

export interface RoomDetailProps {
  data: RoomDetailData;
}

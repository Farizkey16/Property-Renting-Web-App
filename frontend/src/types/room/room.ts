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

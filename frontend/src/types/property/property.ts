export enum PropertyCategory {
  apartment = "apartment",
  house = "house",
  villa = "villa",
  hotel = "hotel",
  hostel = "hostel",
  guesthouse = "guesthouse",
}

export interface RoomData {
  id: string;
  name: string
}

export interface createProperty {
  name: string;
  description: string;
  address: string;
  city: string;
  province: string;
  zip_code: string;
  latitude: string;
  longitude: string;
  main_image: File;
  property_category: PropertyCategory;
  rooms?: RoomData[]
}

export interface updateProperty {
  name?: string;
  description?: string;
  address?: string;
  city?: string;
  province?: string;
  zip_code?: string;
  latitude?: string;
  longitude?: string;
  main_image?: File | null;
  property_category: PropertyCategory;
}

export interface RoomImage {
  id: string;
  room_id: string;
  image_url: string;
  created_at: string;
}

export interface Room {
  id: string;
  property_id: string;
  name: string;
  description: string;
  base_price: number;
  capacity: number;
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  total_rooms: number;
  room_images: RoomImage[];
  room_availability: string;
}

export interface Property {
  id: string;
  tenant_id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  province: string;
  zip_code: string;
  latitude: number;
  longitude: number;
  main_image: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  property_category: string;
  rooms: Room[];
}

export interface Tenant {
  id: string;
  logo: string;
  company_name: string;
}

export interface PropertyResponse {
  success: boolean;
  message: string;
  tenant: Tenant;
  properties: Property[];
}

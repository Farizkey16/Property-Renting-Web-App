// types/user.ts
export interface Tenant {
  id: string;
  user_id: string;
  company_name: string;
  address: string;
  phone_number: string;
  logo: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  role: "tenant" | "user";
  full_name: string;
  is_verified: boolean;
  profile_picture: string | null;
  tenants?: Tenant;
}

export interface AuthResponse {
  message: string;
  success: boolean;
  user: User;
}

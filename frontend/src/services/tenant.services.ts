import { TenantTypes } from "@/types/tenant/tenant";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const registerTenant = async (tenant: TenantTypes) => {
  const formData = new FormData();
  formData.append("email", tenant.email);
  formData.append("company_name", tenant.company_name);
  formData.append("address", tenant.address);
  formData.append("phone_number", tenant.phone_number);
  formData.append("logo", tenant.logo); // File dari input

  const response = await axios.post(`${BASE_URL}/tenant/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log(response.data);
  return response.data;
};

export const updateTenant = async (
  company_name: string,
  address: string,
  phone_number: string,
  logo: File
) => {
  const formData = new FormData();
  formData.append("company_name", company_name);
  formData.append("address", address);
  formData.append("phone_number", phone_number);
  formData.append("logo", logo);

  const response = await axios.patch(`${BASE_URL}/tenant/update`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  console.log(response.data);
  return response.data;
};

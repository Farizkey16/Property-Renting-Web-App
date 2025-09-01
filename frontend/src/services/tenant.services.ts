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

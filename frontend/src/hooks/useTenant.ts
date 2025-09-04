import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerTenant, updateTenant } from "@/services/tenant.services";
import { TenantTypes } from "@/types/tenant/tenant";

export const useRegisterTenant = () => {
  return useMutation({
    mutationFn: (tenant: TenantTypes) => registerTenant(tenant),
  });
};

export const useUpdateTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      company_name: string;
      address: string;
      phone_number: string;
      logo?: File;
    }) =>
      updateTenant(
        data.company_name,
        data.address,
        data.phone_number,
        data.logo!
      ),
    onSuccess: () => {
      alert("Profile Tenant updated!");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

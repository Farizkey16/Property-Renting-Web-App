import { useMutation } from "@tanstack/react-query";
import { registerTenant } from "@/services/tenant.services";
import { TenantTypes } from "@/types/tenant/tenant";

export const useRegisterTenant = () => {
  return useMutation({
    mutationFn: (tenant: TenantTypes) => registerTenant(tenant),
  });
};

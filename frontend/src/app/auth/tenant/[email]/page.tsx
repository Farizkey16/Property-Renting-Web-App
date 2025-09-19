"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRegisterTenant } from "@/hooks/useTenant";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerTenantSchema,
  RegisterTenantSchema,
} from "@/lib/validation/tenant";
import { useState } from "react";

export default function RegisterTenantPage() {
  const { email } = useParams<{ email: string }>();
  const decodedEmail = decodeURIComponent(email);

  const router = useRouter();

  const { mutate: registerTenant, isPending, isError } = useRegisterTenant();

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterTenantSchema>({
    resolver: zodResolver(registerTenantSchema),
    defaultValues: {
      email: decodedEmail,
      company_name: "",
      address: "",
      phone_number: "",
      logo: undefined as unknown as File,
    },
  });

  const onSubmit = (data: RegisterTenantSchema) => {
    registerTenant(
      {
        email: decodedEmail || "",
        company_name: data.company_name,
        address: data.address,
        phone_number: data.phone_number,
        logo: data.logo,
      },
      {
        onSuccess: () => {
          router.push("/auth/login");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-yellow-200"></div>

      <div className="relative z-10 w-full max-w-md">
        <Card className="w-full max-w-md shadow-lg p-4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Register Tenant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Company Name */}
              <div>
                <Label htmlFor="company_name">Company Name</Label>
                <Input id="company_name" {...register("company_name")} />
                {errors.company_name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.company_name.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" {...register("address")} />
                {errors.address && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input id="phone_number" {...register("phone_number")} />
                {errors.phone_number && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.phone_number.message}
                  </p>
                )}
              </div>

              {/* Logo */}
              <div>
                <Label htmlFor="logo">Company Logo</Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setValue("logo", file, { shouldValidate: true });
                      setLogoPreview(URL.createObjectURL(file));
                    }
                  }}
                />
                {errors.logo && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.logo.message}
                  </p>
                )}
                {logoPreview && (
                  <div className="mt-4 flex justify-center">
                    <Image
                      src={logoPreview}
                      alt="Logo Preview"
                      width={150}
                      height={150}
                      className="rounded-lg object-cover shadow-md"
                    />
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Loading..." : "Register Tenant"}
              </Button>
              {isError && (
                <p className="text-sm text-red-500 mt-2">Failed to register</p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFetchMe } from "@/hooks/useUser";
import { useUpdateTenant } from "@/hooks/useTenant";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LoadingSpinner from "@/components/fragment/loading-error/LoadingSpinner";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  company_name: string;
  address: string;
  phone_number: string;
};

const TenantDashboard = () => {
  const { data: user, isLoading } = useFetchMe();
  const tenant = user?.tenants;

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const mutation = useUpdateTenant();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (tenant) {
      reset({
        company_name: tenant.company_name || "",
        address: tenant.address || "",
        phone_number: tenant.phone_number || "",
      });
      setPreview(tenant.logo || "");
    }
  }, [tenant, reset]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: FormValues) => {
    mutation.mutate(
      {
        company_name: data.company_name,
        address: data.address,
        phone_number: data.phone_number,
        logo: logoFile || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Tenant updated successfully!");
        },
        onError: (error) => {
          console.log(error);
          toast.error("Failed to update tenant. Please try again.");
        },
      }
    );
  };

  if (isLoading) return <LoadingSpinner />;
  if (!tenant) return <p className="p-4">No tenant data found</p>;

  return (
    <div className="flex-1 p-4 lg:p-8">
      <Card className="w-full max-w-7xl mx-auto p-8">
        <CardHeader className="pb-4 lg:pb-6">
          <CardTitle className="text-xl lg:text-2xl font-semibold">
            Tenant Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="mb-2">Company Name</Label>
              <Input {...register("company_name")} />
              {errors.company_name && <p>{errors.company_name.message}</p>}
            </div>

            <div>
              <Label className="mb-2">Address</Label>
              <Input {...register("address")} />
            </div>

            <div>
              <Label className="mb-2">Phone Number</Label>
              <Input {...register("phone_number")} />
            </div>

            <div>
              <Label htmlFor="logo" className="mb-2">
                Company Logo
              </Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={onFileChange}
              />

              {preview && (
                <div className="mt-4">
                  <Image
                    src={preview}
                    alt="Company Logo"
                    width={120}
                    height={120}
                    className="rounded-lg border shadow-sm object-cover"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (tenant) {
                    reset({
                      company_name: tenant.company_name || "",
                      address: tenant.address || "",
                      phone_number: tenant.phone_number || "",
                    });
                    setPreview(tenant.logo || "");
                    setLogoFile(null);
                  }
                }}
                className="flex-1 cursor-pointer">
                Discard Changes
              </Button>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="flex-1 bg-orange-500 hover:bg-orange-600 cursor-pointer">
                {mutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantDashboard;

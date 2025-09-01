"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFetchMe } from "@/hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import Image from "next/image";

async function updateTenant(data: FormData) {
  const res = await fetch("http://localhost:4000/tenant/update", {
    method: "PUT",
    credentials: "include",
    body: data, // kirim FormData
  });

  if (!res.ok) throw new Error("Failed to update tenant");
  return res.json();
}

const TenantDashboard = () => {
  const { data: user, isLoading } = useFetchMe();
  const queryClient = useQueryClient();

  const tenant = user?.tenants?.[0];

  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (tenant) {
      setCompanyName(tenant.company_name || "");
      setAddress(tenant.address || "");
      setPhoneNumber(tenant.phone_number || "");
      setPreview(tenant.logo || ""); // tampilkan logo lama
    }
  }, [tenant]);

  const mutation = useMutation({
    mutationFn: updateTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setPreview(URL.createObjectURL(file)); // buat preview lokal
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("company_name", companyName);
    formData.append("address", address);
    formData.append("phone_number", phoneNumber);
    if (logoFile) formData.append("logo", logoFile);

    mutation.mutate(formData);
  };

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (!tenant) return <p className="p-4">No tenant data found</p>;

  return (
    <div className="flex-1 p-4 lg:p-8">
      <Card className="w-full max-w-4xl mx-auto p-8">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold">
            Tenant Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Company Name</Label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div>
              <Label>Address</Label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <Label>Phone Number</Label>
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="logo">Company Logo</Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
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
                    setCompanyName(tenant.company_name || "");
                    setAddress(tenant.address || "");
                    setPhoneNumber(tenant.phone_number || "");
                    setPreview(tenant.logo || "");
                    setLogoFile(null);
                  }
                }}
                className="flex-1">
                Discard Changes
              </Button>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="flex-1 bg-orange-500 hover:bg-orange-600">
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

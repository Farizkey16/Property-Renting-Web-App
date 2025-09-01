"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRegisterTenant } from "@/hooks/useTenant";
import Image from "next/image";

export default function RegisterTenantPage() {
  const { email } = useParams<{ email: string }>();
  const decodedEmail = decodeURIComponent(email);
  const router = useRouter();

  const [form, setForm] = useState({
    company_name: "",
    address: "",
    phone_number: "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const { mutate: registerTenant, isPending, isError } = useRegisterTenant();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !logoFile) return;

    registerTenant(
      {
        email: decodedEmail,
        company_name: form.company_name,
        address: form.address,
        phone_number: form.phone_number,
        logo: logoFile,
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  name="company_name"
                  value={form.company_name}
                  onChange={handleChange}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  value={form.phone_number}
                  onChange={handleChange}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="logo">Company Logo</Label>
                <Input
                  id="logo"
                  name="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="mt-2"
                />
                {/* Image Preview */}
                {logoFile && (
                  <div className="mt-4 flex justify-center">
                    <Image
                      src={URL.createObjectURL(logoFile)}
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
                {isError && "Error"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

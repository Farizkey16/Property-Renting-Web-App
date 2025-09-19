"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useFetchMe, useUpdateProfile } from "@/hooks/useUser";
import LoadingSpinner from "@/components/fragment/loading-error/LoadingSpinner";

const UserDashboard = () => {
  const { data: user, isLoading } = useFetchMe();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [preview, setPreview] = useState("/avatar.png");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || "");
      setEmail(user.email || "");
      setPreview(user.profile_picture || "/avatar.png");
    }
  }, [user]);

  const { mutate, isPending } = useUpdateProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      full_name: fullName,
      profile_picture: selectedFile ?? undefined,
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!user) return <p className="p-4">No user data found</p>;

  return (
    <div className="flex-1 p-4 lg:p-8">
      <Card className="w-full max-w-7xl mx-auto p-8">
        <CardHeader className="pb-4 lg:pb-6">
          <CardTitle className="text-xl lg:text-2xl font-semibold">
            Personal Information
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col lg:flex-row gap-8 lg:gap-12 p-4">
          {/* Left: Profile Image */}
          <div className="flex flex-col items-center gap-4 lg:w-1/3">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border">
              <Image
                src={preview && preview.trim() !== "" ? preview : "/avatar.png"}
                alt="Profile Picture"
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />

            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={handleButtonClick}>
              Change Photo
            </Button>
          </div>

          {/* Right: Form */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 space-y-4 lg:space-y-6">
            <div>
              <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                Name
              </Label>
              <Input
                id="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="pr-20"
                />
                {user.is_verified && (
                  <Badge
                    variant="secondary"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    <span className="hidden sm:inline">Verified</span>
                    <span className="sm:hidden">✓</span>
                  </Badge>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="role" className="text-sm font-medium mb-2 block">
                Role
              </Label>
              <Badge className="uppercase">{user.role}</Badge>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 lg:pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFullName(user.full_name || "");
                  setEmail(user.email || "");
                  setPreview(user.profile_picture || "/placeholder.svg");
                  setSelectedFile(null);
                }}
                className="flex-1 bg-transparent order-2 sm:order-1">
                Discard Changes
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-orange-500 hover:bg-orange-600 order-1 sm:order-2">
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;

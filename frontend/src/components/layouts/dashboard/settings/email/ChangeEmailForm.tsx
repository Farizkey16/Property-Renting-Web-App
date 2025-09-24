"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SettingsFormData {
  email: string;
  currentPassword: string;
  newPassword: string;
}

interface Props {
  formData: SettingsFormData;
  setFormData: React.Dispatch<React.SetStateAction<SettingsFormData>>;
  changeEmailOtpMutation: {
    mutateAsync: (email: string) => Promise<void>;
  };
  setOtpDialog: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      purpose: "email" | "password" | null;
      code: string[];
    }>
  >;
  isLoading: boolean;
}

export default function ChangeEmailForm({
  formData,
  setFormData,
  changeEmailOtpMutation,
  setOtpDialog,
  isLoading,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    defaultValues: { email: formData.email },
  });

  const onSubmit = async (data: { email: string }) => {
    setOtpDialog((prev) => ({ ...prev, isOpen: true, purpose: "email" }));
    setFormData((prev: SettingsFormData) => ({ ...prev, email: data.email }));
    await changeEmailOtpMutation.mutateAsync(data.email);
  };

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Email Address</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">New Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your new email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <Alert variant="destructive">
                <AlertDescription>{errors.email.message}</AlertDescription>
              </Alert>
            )}
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto cursor-pointer">
            {isLoading ? "Changing..." : "Change Email Address"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

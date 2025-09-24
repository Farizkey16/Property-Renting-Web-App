"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SettingsFormData {
  email: string;
  currentPassword: string;
  newPassword: string;
}

interface Props {
  formData: SettingsFormData;
  setFormData: React.Dispatch<React.SetStateAction<SettingsFormData>>;
  newOtpMutation: {
    mutateAsync: () => Promise<void>;
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

/**
 * Validation rules:
 * - currentPassword: exactly 6 characters
 * - newPassword: exactly 6 characters
 * - newPassword must be different from currentPassword
 */
const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .length(6, "Password must be exactly 6 characters"),
    newPassword: z.string().length(6, "Password must be exactly 6 characters"),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ChangePasswordForm({
  formData,
  setFormData,
  newOtpMutation,
  setOtpDialog,
  isLoading,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: PasswordFormValues) => {
    setOtpDialog((prev) => ({ ...prev, isOpen: true, purpose: "password" }));
    setFormData((prev) => ({
      ...prev,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    }));

    // Generate new OTP for password update
    await newOtpMutation.mutateAsync();
  };

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="Enter your current password"
              {...register("currentPassword")}
              className={errors.currentPassword ? "border-destructive" : ""}
            />
            {errors.currentPassword && (
              <Alert variant="destructive">
                <AlertDescription>
                  {errors.currentPassword.message}
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter your new password (6 characters)"
              {...register("newPassword")}
              className={errors.newPassword ? "border-destructive" : ""}
            />
            {errors.newPassword && (
              <Alert variant="destructive">
                <AlertDescription>
                  {errors.newPassword.message}
                </AlertDescription>
              </Alert>
            )}
            <p className="text-sm text-muted-foreground">
              Password must be exactly 6 characters
            </p>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto cursor-pointer">
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

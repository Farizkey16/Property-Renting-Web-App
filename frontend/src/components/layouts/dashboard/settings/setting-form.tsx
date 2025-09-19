"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useChangeEmailOtp, useResetPassword } from "@/hooks/useUser";
import { useVerifyEmail } from "@/hooks/useAuth";

interface FormErrors {
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

export default function SettingsForm() {
  const [formData, setFormData] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const [otpDialog, setOtpDialog] = useState({
    isOpen: false,
    purpose: null as "email" | "password" | null,
    code: ["", "", "", "", "", ""],
  });

  const resetPasswordMutation = useResetPassword();
  const changeEmailOtpMutation = useChangeEmailOtp();
  const verifyEmailMutation = useVerifyEmail();

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return null;
  };

  const validatePassword = (password: string, isNew = false): string | null => {
    if (!password.trim())
      return `${isNew ? "New" : "Current"} password is required`;
    if (password.length < 8) return "Password must be at least 8 characters";
    if (isNew && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return "New password must contain uppercase, lowercase, and number";
    }
    return null;
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...otpDialog.code];
    newCode[index] = value;
    setOtpDialog((prev) => ({ ...prev, code: newCode }));

    if (value && index < 5) {
      const nextInput = document.querySelector(
        `input[data-otp-index="${index + 1}"]`
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otpDialog.code[index] && index > 0) {
      const prevInput = document.querySelector(
        `input[data-otp-index="${index - 1}"]`
      ) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const code = otpDialog.code.join("");
    if (code.length !== 6) {
      alert("Please enter a complete 6-digit OTP");
      return;
    }

    setIsLoading(true);

    if (otpDialog.purpose === "password") {
      resetPasswordMutation.mutate(
        {
          oldPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          otp: code,
        },
        {
          onSuccess: () => {
            setFormData((prev) => ({
              ...prev,
              currentPassword: "",
              newPassword: "",
            }));
            alert("Password updated successfully ");
            setOtpDialog({
              isOpen: false,
              purpose: null,
              code: ["", "", "", "", "", ""],
            });
          },
          onError: () => {
            alert("Failed to update password ");
          },
          onSettled: () => setIsLoading(false),
        }
      );
    } else if (otpDialog.purpose === "email") {
      verifyEmailMutation.mutate(
        { email: formData.email, otp: code },
        {
          onSuccess: () => {
            setFormData((prev) => ({ ...prev, email: "" }));
            alert("Email updated successfully ");
            setOtpDialog({
              isOpen: false,
              purpose: null,
              code: ["", "", "", "", "", ""],
            });
          },
          onError: () => {
            alert("Failed to update email ");
          },
          onSettled: () => setIsLoading(false),
        }
      );
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }
    setErrors({});
    await changeEmailOtpMutation.mutateAsync(formData.email);
    setOtpDialog((prev) => ({ ...prev, isOpen: true, purpose: "email" }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    const currentError = validatePassword(formData.currentPassword);
    const newError = validatePassword(formData.newPassword, true);

    if (currentError) newErrors.currentPassword = currentError;
    if (newError) newErrors.newPassword = newError;
    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword =
        "New password must be different from current password";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    await changeEmailOtpMutation.mutateAsync(formData.email);
    setOtpDialog((prev) => ({ ...prev, isOpen: true, purpose: "password" }));
  };

  return (
    <div className="p-6 space-y-6 w-full mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account security and preferences
        </p>
      </div>

      {/* Change Email */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Email Address</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">New Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your new email address"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.email}</AlertDescription>
                </Alert>
              )}
            </div>
            <Button
              type="submit"
              disabled={!formData.email.trim() || isLoading}
              className="w-full sm:w-auto">
              Update Email
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Enter your current password"
                value={formData.currentPassword}
                onChange={(e) =>
                  updateFormData("currentPassword", e.target.value)
                }
                className={errors.currentPassword ? "border-destructive" : ""}
              />
              {errors.currentPassword && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.currentPassword}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter your new password"
                value={formData.newPassword}
                onChange={(e) => updateFormData("newPassword", e.target.value)}
                className={errors.newPassword ? "border-destructive" : ""}
              />
              {errors.newPassword && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.newPassword}</AlertDescription>
                </Alert>
              )}
              <p className="text-sm text-muted-foreground">
                Password must be at least 8 characters with uppercase,
                lowercase, and number
              </p>
            </div>

            <Button
              type="submit"
              disabled={
                !formData.currentPassword.trim() ||
                !formData.newPassword.trim() ||
                isLoading
              }
              className="w-full sm:w-auto">
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* OTP Dialog */}
      <Dialog
        open={otpDialog.isOpen}
        onOpenChange={(open) =>
          setOtpDialog((prev) => ({ ...prev, isOpen: open }))
        }>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify Your Identity</DialogTitle>
            <DialogDescription>
              We&apos;ve sent a 6-digit verification code to your email address.
              Please enter it below to confirm your changes.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-2 justify-center py-6">
            {otpDialog.code.map((digit, index) => (
              <Input
                key={index}
                data-otp-index={index}
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                className="w-12 h-12 text-center text-lg font-semibold"
                autoComplete="off"
              />
            ))}
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={() =>
                setOtpDialog((prev) => ({ ...prev, isOpen: false }))
              }
              disabled={isLoading}
              className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              onClick={handleVerifyOtp}
              disabled={otpDialog.code.join("").length !== 6 || isLoading}
              className="w-full sm:w-auto">
              {isLoading ? "Verifying..." : "Verify & Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

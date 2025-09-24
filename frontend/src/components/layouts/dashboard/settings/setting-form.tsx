"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChangeEmailForm from "./email/ChangeEmailForm";
import ChangePasswordForm from "./password/ChangePasswordForm";
import { useVerifyEmail } from "@/hooks/useAuth";
import {
  useChangeEmailOtp,
  useNewOtp,
  useResetPassword,
} from "@/hooks/useUser";
import { toast } from "sonner";

export default function SettingsForm() {
  const [otpDialog, setOtpDialog] = useState({
    isOpen: false,
    purpose: null as "email" | "password" | null,
    code: ["", "", "", "", "", ""],
  });

  const [formData, setFormData] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Email mutations (tetap sama)
  const changeEmailOtpMutation = useChangeEmailOtp();
  const verifyEmailMutation = useVerifyEmail();

  // Password mutations baru
  const resetPasswordMutation = useResetPassword();
  const newOtpMutation = useNewOtp();

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
            toast.success("Password updated successfully");
            setOtpDialog({
              isOpen: false,
              purpose: null,
              code: ["", "", "", "", "", ""],
            });
          },
          onError: () => toast.error("Failed to update password"),
          onSettled: () => setIsLoading(false),
        }
      );
    } else if (otpDialog.purpose === "email") {
      verifyEmailMutation.mutate(
        { email: formData.email, otp: code },
        {
          onSuccess: () => {
            setFormData((prev) => ({ ...prev, email: "" }));
            toast.success("Email updated successfully");
            setOtpDialog({
              isOpen: false,
              purpose: null,
              code: ["", "", "", "", "", ""],
            });
          },
          onError: () => toast.error("Failed to update email"),
          onSettled: () => setIsLoading(false),
        }
      );
    }
  };

  return (
    <div className="p-6 space-y-6 w-full mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account security and preferences
        </p>
      </div>

      {/* Change Email: logic lama tetap */}
      <ChangeEmailForm
        formData={formData}
        setFormData={setFormData}
        changeEmailOtpMutation={changeEmailOtpMutation}
        setOtpDialog={setOtpDialog}
        isLoading={isLoading}
      />

      <ChangePasswordForm
        formData={formData}
        setFormData={setFormData}
        newOtpMutation={newOtpMutation}
        setOtpDialog={setOtpDialog}
        isLoading={isLoading}
      />

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

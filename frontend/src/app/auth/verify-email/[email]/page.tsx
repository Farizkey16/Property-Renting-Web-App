"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useNewOtpVerification, useVerifyEmail } from "@/hooks/useAuth";

export default function VerifyEmail() {
  const { email } = useParams<{ email: string }>();
  const decodedEmail = decodeURIComponent(email);
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const {
    mutate: VerifyEmail,
    isPending: isVerifyPending,
    isError,
  } = useVerifyEmail();
  const { mutate: resendOtp, isPending: isResendPending } =
    useNewOtpVerification();

  const [timeLeft, setTimeLeft] = useState(60 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Format menit:detik
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");

    VerifyEmail(
      { email: decodedEmail, otp: otpValue },
      {
        onSuccess: (data) => {
          console.log(data);
          setErrorMessage(null);
          if (role === "tenant") {
            router.push(`/auth/tenant/${encodeURIComponent(decodedEmail)}`);
          } else {
            router.push("/auth/login");
          }
        },
        onError: (error) => {
          console.log(error);
          setErrorMessage("Invalid OTP");
          setOtp(["", "", "", "", "", ""]);
          const firstInput = document.getElementById("otp-0");
          firstInput?.focus();
        },
      }
    );
  };

  const handleResend = () => {
    resendOtp(
      { email: decodedEmail },
      {
        onSuccess: () => {
          setTimeLeft(60 * 60);
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
              Verify Your Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email (disabled) */}
              <div>
                <Label htmlFor="email" className="mb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={decodedEmail}
                  disabled
                  className="bg-gray-200 cursor-not-allowed"
                />
              </div>

              {/* OTP Input */}
              <div>
                <Label className="mb-2">Enter 6-digit OTP</Label>
                <div className="flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e, index)}
                      className="text-center w-12 h-12 text-xl"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={isVerifyPending}>
                {isVerifyPending ? "Loading..." : "Verify"}
                {isError && "Error"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col items-center gap-2 text-sm text-gray-600">
            <div>Didn&apos;t receive OTP?</div>
            <Button
              variant="link"
              className="text-blue-500 hover:underline"
              disabled={isResendPending}
              onClick={handleResend}>
              Resend OTP
            </Button>
            <div className="text-gray-500 text-xs">
              OTP valid for: {formatTime(timeLeft)}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

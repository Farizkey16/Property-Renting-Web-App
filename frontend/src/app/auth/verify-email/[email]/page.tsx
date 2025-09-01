"use client";

import { useState } from "react";
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
import { useVerifyEmail } from "@/hooks/useAuth";

export default function VerifyEmail() {
  const { email } = useParams<{ email: string }>();
  const decodedEmail = decodeURIComponent(email);
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const router = useRouter();

  const { mutate: VerifyEmail, isPending, isError } = useVerifyEmail();

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
    console.log("OTP entered:", otpValue);

    VerifyEmail(
      { email: decodedEmail, otp: otpValue },
      {
        onSuccess: (data) => {
          console.log(data);
          if (role === "tenant") {
            router.push(`/auth/tenant/${decodedEmail}`);
          } else {
            router.push("/auth/login");
          }
        },
        onError: (error) => {
          console.log(error);
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
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={isPending}>
                {isPending ? "Loading..." : "Verify"}
                {isError && "Error"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center text-sm text-gray-600">
            Didn&apos;t receive OTP?{" "}
            <Button variant="link" className="text-blue-500 hover:underline">
              Resend OTP
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoginUser } from "@/hooks/useAuth";
import LoginGoogle from "@/components/fragment/button-action/LoginGoogle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/lib/validation/auth";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log("searchParams login:", searchParams.toString());

  const from = searchParams.get("from") || "/";
  console.log("from value:", from);

  const { mutate: login, isPending, isError } = useLoginUser();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchema) => {
    login(
      { email: data.email, password: data.password },
      {
        onSuccess: () => router.push(from),
        onError: (err) => {
          console.log(err);
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
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div>
                <Label htmlFor="email" className="mb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password with eye toggle */}
              <div>
                <Label htmlFor="password" className="mb-2">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full curson-pointer"
                disabled={isPending}>
                {isPending ? "Loading..." : "Login"}
              </Button>
            </form>

            {isError && (
              <p className="text-red-500 mt-2 text-sm">
                Invalid email or password. Please try again.
              </p>
            )}

            {/* Divider */}
            <div className="flex items-center gap-2 my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <LoginGoogle />
          </CardContent>

          <CardFooter className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-500 hover:underline ml-1">
              Sign up
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

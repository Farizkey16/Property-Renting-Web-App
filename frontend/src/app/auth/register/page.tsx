"use client";

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
import { useRegisterUser } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/lib/validation/auth";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { mutate: register, isPending, isError } = useRegisterUser();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
  });

  const onSubmit = (data: RegisterSchema) => {
    register(data, {
      onSuccess: () => {
        router.push(`/auth/verify-email/${data.email}?role=${data.role}`);
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-yellow-200"></div>

      <div className="relative z-10 w-full max-w-md">
        <Card className="w-full max-w-md shadow-lg p-4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Create an Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Username */}
              <div>
                <Label htmlFor="name" className="mb-2">
                  Username
                </Label>
                <Input
                  id="name"
                  {...formRegister("name")}
                  placeholder="Enter your username"
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="mb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...formRegister("email")}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="mb-2">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...formRegister("password")}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700">
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <Label>Register as</Label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={watch("role") === "user"}
                      onChange={() => setValue("role", "user")}
                    />
                    User
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={watch("role") === "tenant"}
                      onChange={() => setValue("role", "tenant")}
                    />
                    Tenant
                  </label>
                </div>
                {errors.role && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Loading..." : "Register"}
              </Button>
              {isError && (
                <p className="text-sm text-red-500 mt-2">Failed to register</p>
              )}
            </form>
          </CardContent>

          <CardFooter className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-blue-500 hover:underline ml-1">
              Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

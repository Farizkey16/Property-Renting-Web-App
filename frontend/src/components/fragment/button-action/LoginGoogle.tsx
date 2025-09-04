"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const LoginGoogle = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`;
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="outline"
        className="flex items-center gap-2 w-full"
        onClick={handleGoogleLogin}>
        <FcGoogle className="text-red-500" /> Continue with Google
      </Button>
    </div>
  );
};

export default LoginGoogle;

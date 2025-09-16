"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useFetchMe } from "@/hooks/useUser";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthHeader = () => {
  const { data: user, isLoading } = useFetchMe();
  const isLoggedIn = !!user;
  const router = useRouter();
  return (
    <div>
      {isLoading ? (
        <span className="text-sm text-gray-500">Loading...</span>
      ) : isLoggedIn ? (
        <>
          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center space-x-4 border-l border-gray-200 pl-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center space-x-2 px-2 hover:bg-gray-50 bg-white ">
                  <Avatar className="w-8 h-8">
                    {user?.profile_picture ? (
                      <AvatarImage src={user.profile_picture} />
                    ) : (
                      <AvatarFallback className="text-black font-bold ">
                        {user?.full_name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <span className="text-sm  text-gray-900 font-bold ">
                    {user?.full_name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 ">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.full_name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user?.is_verified ? (
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    My Profile
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/auth/verify-email/${user?.email}`)
                    }>
                    Verify Email
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Auth */}
          <div className="flex lg:hidden items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
            <Avatar className="w-8 h-8">
              {user?.profile_picture ? (
                <AvatarImage src={user.profile_picture} />
              ) : (
                <AvatarFallback>
                  {user?.full_name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
        </>
      ) : (
        <>
          {/* Desktop Login Button */}
          <Link href="/auth/login">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-3xl cursor-pointer hidden lg:block">
              Login
            </Button>
          </Link>

          {/* Mobile Login Button */}
          <div className="flex lg:hidden">
            <Link href="/auth/login">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Login
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthHeader;

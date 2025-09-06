"use client";

import { Search, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useFetchMe } from "@/hooks/useUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import InputDate from "@/components/fragment/inputDate/inputDate";

export function Header() {
  const { data: user, isLoading } = useFetchMe();
  const isLoggedIn = !!user;
  const router = useRouter();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left - Logo */}
        <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
            <span className="text-white text-sm font-bold">h</span>
          </div>
          <span className="text-xl font-semibold">homz</span>
        </Link>

        {/* Center - Search Bar (hidden on mobile) */}
        <div className="hidden lg:flex flex-1 justify-center px-4">
          <InputDate />
        </div>

        {/* Right - Desktop Actions */}
        {isLoading ? (
          <span className="text-sm text-gray-500">Loading...</span>
        ) : isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 px-2 hover:bg-transparent">
                <Avatar className="w-8 h-8">
                  {user?.profile_picture ? (
                    <AvatarImage src={user.profile_picture} />
                  ) : (
                    <AvatarFallback>
                      {user?.full_name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="text-sm font-medium">{user?.full_name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
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
        ) : (
          <Link href="/auth/login">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-3xl cursor-pointer hidden lg:block">
              Login
            </Button>
          </Link>
        )}

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center space-x-2">
          {/* Search trigger on mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full">
                <Search className="w-4 h-4 mr-1" />
                Search
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="p-4">
              <SheetHeader>
                <SheetTitle>Rent Property</SheetTitle>
                <SheetDescription>
                  Select dates, category, and other details to rent your chosen
                  property.
                </SheetDescription>
              </SheetHeader>
              <InputDate />
            </SheetContent>
          </Sheet>

          <Button variant="ghost" size="icon">
            <Bell className="w-4 h-4" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>Rent Property</SheetTitle>
                <SheetDescription>
                  Select dates, category, and other details to rent your chosen
                  property.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-8">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center space-x-2 px-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={user?.profile_picture || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {user?.full_name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {user?.full_name || "User"}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => router.push("/dashboard")}>
                      Dashboard
                    </Button>
                  </>
                ) : (
                  <Link href="/auth/login">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white w-full ">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

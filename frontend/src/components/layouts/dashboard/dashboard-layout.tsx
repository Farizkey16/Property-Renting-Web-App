"use client";

import type React from "react";
import { useState } from "react";
import {
  LayoutDashboard,
  DollarSign,
  HelpCircle,
  Settings,
  Menu,
  X,
  Building,
  Bell,
  User,
  BarChart3,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFetchMe } from "@/hooks/useUser";
import { ButtonLogout } from "@/components/fragment/button-action/buttonAction";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarTenant = [
  { icon: User, label: "Profile", link: "/dashboard" },
  { icon: Store, label: "Tenant", link: "/dashboard/tenant" },
  { icon: Building, label: "Properties", link: "/dashboard/property" },
  { icon: DollarSign, label: "Payment", link: "/dashboard/payment" },
  { icon: BarChart3, label: "Statistics", link: "/dashboard/statistics" },
  { icon: Bell, label: "Notifications", link: "/dashboard/notifications" },
];

const sidebarUser = [
  { icon: LayoutDashboard, label: "Profile", link: "/dashboard" },
  { icon: Building, label: "History Trips", link: "/dashboard/trips" },
  { icon: DollarSign, label: "Payment", link: "/dashboard/payment" },
  { icon: Bell, label: "Notifications", link: "/dashboard/notifications" },
];

const helpItems = [
  { icon: HelpCircle, label: "Help & Center" },
  { icon: Settings, label: "Settings" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, error, isLoading } = useFetchMe();
  const pathname = usePathname();

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }
  if (error) {
    return <div className="p-6 text-red-500">Failed to load user</div>;
  }

  const userRole = data?.role;
  const menuItems = userRole === "tenant" ? sidebarTenant : sidebarUser;

  return (
    <div className="flex h-screen bg-background">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-sidebar-accent-foreground" />
              </div>
              <div>
                <h2 className="text-sidebar-foreground font-bold">Logo</h2>
                <p className="text-sidebar-foreground/60 text-xs">
                  Property Management
                </p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-sidebar-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Menu */}
          <div className="flex-1 px-4 py-6">
            <div className="mb-6">
              <h3 className="text-sidebar-foreground/60 text-xs font-medium uppercase tracking-wider mb-3">
                MAIN MENU
              </h3>
              <nav className="space-y-1">
                {menuItems.map((item, index) => {
                  const isActive = pathname === item.link;
                  return (
                    <Link
                      key={index}
                      href={item.link}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-black/10"
                      )}>
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Help & Support */}
            <div>
              <h3 className="text-sidebar-foreground/60 text-xs font-medium uppercase tracking-wider mb-3">
                HELP & SUPPORT
              </h3>
              <nav className="space-y-1">
                {helpItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-black/10 transition-colors">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </a>
                ))}
                <ButtonLogout />
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-foreground">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-foreground">DASHBOARD</h1>
          <div className="w-6" />
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

<<<<<<< HEAD
import UserDashboard from "@/components/layouts/dashboard/user/user-dashboard";
=======
import UserDashboard from "@/components/layouts/dashboard/user-dashboard";
>>>>>>> main

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Welcome Back,</h1>
        <div className="flex items-center gap-4">
          <div className="relative"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-accent-foreground text-sm font-medium">
                AH
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* <MetricsCards /> */}
      <UserDashboard />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <SalesAnalytics /> */}
      </div>

      {/* <RecentInvoices /> */}
    </div>
  );
}

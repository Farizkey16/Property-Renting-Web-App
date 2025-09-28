"use client";

import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRange } from "react-day-picker";
import { useSalesAggregate, useSalesReport } from "@/hooks/useSalesReport";
import { Activity, DollarSign, Users } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { AnalyticsDateRangePicker } from "../../fragment/date-picker/AnalyticsDatePicker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartPlaceholder = () => (
  <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100 animate-pulse">
    <p className="text-gray-500">Loading chart data...</p>
  </div>
);

export function SalesReportDashboard() {
  const [groupBy, setGroupBy] = useState<"property" | "user" | "date">("date");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  const { data, isLoading, isError, error, isPlaceholderData } = useSalesReport(
    {
      groupBy,
      startDate: dateRange?.from,
      endDate: dateRange?.to,
    }
  );

  const {
    data: aggregate,
  } = useSalesAggregate();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: { display: false },
    },
  };

    if (!data || data.labels.length < 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-muted-foreground font-bold">Not enough data to display a trend.</p>
      </div>
    );
  }

  const ChartComponent = groupBy === "date" ? Line : Bar;

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            
          </div>
        </div>


        <AnalyticsDateRangePicker date={dateRange} onDateChange={setDateRange} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          
          <Card className="col-span-12 lg:col-span-4 py-6">
            <CardHeader>
              <CardTitle>Sales Report</CardTitle>
              <CardDescription>
                Showing total sales grouped by {groupBy}.
              </CardDescription>
              <div className="pt-4">          
                <Select
                  value={groupBy}
                  onValueChange={(value) => setGroupBy(value as typeof groupBy)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Group By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="property">Property</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="pl-2 h-[350px] transition-opacity duration-300">
              <div
                className={`h-full w-full ${
                  isPlaceholderData ? "opacity-50" : "opacity-100"
                }`}
              >
                {isLoading && <ChartPlaceholder />}
                {isError && (
                  <p className="text-red-500">
                    Error: {(error as Error).message}
                  </p>
                )}
                {data && (
                  <ChartComponent
                    options={chartOptions}
                    data={{
                      labels: data.labels,
                      datasets: [
                        {
                          label: "Total Sales",
                          data: data.data,
                          backgroundColor: "rgba(75, 192, 192, 0.6)",
                          borderColor: "rgba(75, 192, 192, 1)",
                        },
                      ],
                    }}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-rows-3 gap-6 px-4 h-full">
            <Card className="flex items-center p-6 h-full">
              {/* Total Revenue */}
              <div className="flex items-center w-full">
                <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-md mr-4 flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold">
                    {aggregate && formatCurrency(aggregate.totalRevenue)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="flex items-center p-6 h-full">
              {/* Total Visitors */}
              <div className="flex items-center w-full">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-md mr-4 flex-shrink-0">
                  {/* SVG replaced with Users icon component */}
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Visitors
                  </p>
                  <p className="text-2xl font-bold">
                    {aggregate && aggregate.totalVisitors}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="flex items-center p-6 h-full">
              <div className="flex items-center w-full">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-md mr-4 flex-shrink-0">
                  <Activity className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Avg. Revenue/Booking
                  </p>
                  <p className="text-2xl font-bold">
                    {aggregate &&
                      formatCurrency(aggregate.avgRevenuePerBooking)}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

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
import { DatePickerWithRange } from "../ui/DatePickerPopover";
import { useSalesReport } from "@/hooks/useSalesReport";
import { keepPreviousData } from "@tanstack/react-query";

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

  const ChartComponent = groupBy === 'date' ? Line : Bar

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
          </div>
        </div>

        {/* Main Grid for Dashboard Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-12 lg:col-span-4 py-6">
            <CardHeader>
              <CardTitle>Sales Report</CardTitle>
              <CardDescription>
                Showing total sales grouped by {groupBy}.
              </CardDescription>
              <div className="pt-4">
                <Select value={groupBy} onValueChange={(value) => setGroupBy(value as any)}>
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
              <div className={`h-full w-full ${isPlaceholderData ? 'opacity-50' : 'opacity-100'}`}>
                {isLoading && <ChartPlaceholder />}
                {isError && <p className="text-red-500">Error: {(error as Error).message}</p>}
                {data && <ChartComponent options={chartOptions} data={{
                  labels: data.labels,
                  datasets: [{
                    label: 'Total Sales',
                    data: data.data,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                  }]
                }} />}
              </div>
            </CardContent>
          </Card>

          {/* You can add other cards here */}
          <Card className="col-span-12 lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>
                You made 265 sales this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for another component */}
              <p>Your recent sales list could go here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


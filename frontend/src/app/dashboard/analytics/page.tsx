import { SalesReportDashboard } from "@/components/sales report/sales-report-dashboard";
import AvailabilityCalendar from "@/components/calendar/availability-calendar";
export default function AnalyticsPage() {
    return (
        <div>
            <SalesReportDashboard/>
            <AvailabilityCalendar/>
        </div>
    )
}
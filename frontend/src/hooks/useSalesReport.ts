import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchSalesReport, ReportFilters } from "@/lib/reports";

export const useSalesReport = (filters: ReportFilters) => {
    return useQuery({
        queryKey: ['salesReport', filters],
        queryFn: () => fetchSalesReport(filters),
        placeholderData: keepPreviousData
    })
}
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { fetchAggregate, fetchSalesReport, ReportFilters } from "@/lib/reports";

import { fetchSalesReport, ReportFilters } from "@/lib/reports";


export const useSalesReport = (filters: ReportFilters) => {
    return useQuery({
        queryKey: ['salesReport', filters],
        queryFn: () => fetchSalesReport(filters),
        placeholderData: keepPreviousData
    })

}

export const useSalesAggregate = () => {
    return useQuery({
        queryKey: ['aggregate'],
        queryFn: fetchAggregate,
        placeholderData: keepPreviousData
    })

}
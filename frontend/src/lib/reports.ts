import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


interface ChartData {
  labels: string[];
  data: number[];
}

export interface ReportFilters {
  groupBy: "property" | "user" | "date";
  startDate?: Date;
  endDate?: Date;
}

export const fetchSalesReport = async (
  filters: ReportFilters
): Promise<ChartData> => {
  const params = {
    groupBy: filters.groupBy,
    startDate: filters.startDate?.toISOString().split("T")[0],
    endDate: filters.endDate?.toISOString().split("T")[0],
  };

  const response = await axios.get(`${BASE_URL}/tenant/sales-report`, {
    params,
    withCredentials: true,
  });

  return response.data.data;
};


export const fetchAggregate = async () => {
    const response = await axios.get(`${BASE_URL}/tenant/aggregate-report`, {
        withCredentials: true
    });

    return response.data.data
}

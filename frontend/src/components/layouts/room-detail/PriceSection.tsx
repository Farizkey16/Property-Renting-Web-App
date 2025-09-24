"use client";

import { formatCurrency } from "@/lib/utils";

export interface PeakRate {
  startDate: string;
  endDate: string;
  price: number;
}

interface PriceSectionProps {
  basePrice: number;
  total?: number;
  peakRates?: PeakRate[];
  loading?: boolean;
}

export function PriceSection({
  basePrice,
  total,
  peakRates,
  loading,
}: PriceSectionProps) {
  if (loading) {
    return (
      <div>
        <span className="text-sm text-gray-600">From</span>
        <div className="h-6 w-24 bg-gray-200 animate-pulse rounded mt-1" />
      </div>
    );
  }

  return (
    <div>
      <span className="text-sm text-gray-600">From</span>
      {total ? (
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 line-through">
            {formatCurrency(basePrice)}
          </span>
          <span className="text-2xl font-bold text-gray-900">
            {formatCurrency(total)}
          </span>
        </div>
      ) : (
        <div className="text-2xl font-bold text-gray-900">
          {formatCurrency(basePrice)}
        </div>
      )}

      <div className="text-right">
        {total ? (
          <span className="text-lg font-semibold text-green-600">
            Total Price
          </span>
        ) : peakRates && peakRates.length > 0 ? (
          <span className="text-lg font-semibold text-orange-500">
            Peak Rate
          </span>
        ) : null}
      </div>
    </div>
  );
}

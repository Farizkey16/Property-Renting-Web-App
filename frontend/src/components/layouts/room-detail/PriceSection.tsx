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

export function PriceSection({ basePrice, total, loading }: PriceSectionProps) {
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
          <span className="text-lg font-semibold text-green-600 mt-2">
            Total Price
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
    </div>
  );
}


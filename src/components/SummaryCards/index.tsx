import { TrendingDown, TrendingUp } from "lucide-react";
import { useSummaryCards } from "./useSummaryCards";
import type { SummaryCardsProps } from "./types";
import { memo } from "react";

export default memo(function SummaryCards({ stats }: SummaryCardsProps) {
  const { formatCurrency } = useSummaryCards({ stats });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">
          Total Balance
        </span>
        <div className="mt-4 flex items-end justify-between">
          <span
            className={`text-3xl font-bold ${
              stats.balance >= 0 ? "text-gray-900" : "text-red-600"
            }`}
          >
            {formatCurrency(stats.balance)}
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">
          Income
        </span>
        <div className="mt-4 flex items-end justify-between">
          <span className="text-3xl font-bold text-emerald-600">
            {formatCurrency(stats.income)}
          </span>
          <div className="p-2 bg-emerald-50 rounded-full">
            <TrendingUp size={24} className="text-emerald-500" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">
          Expenses
        </span>
        <div className="mt-4 flex items-end justify-between">
          <span className="text-3xl font-bold text-red-600">
            {formatCurrency(stats.expenses)}
          </span>
          <div className="p-2 bg-red-50 rounded-full">
            <TrendingDown size={24} className="text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
});

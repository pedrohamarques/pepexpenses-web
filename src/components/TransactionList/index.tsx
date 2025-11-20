import { TrendingDown, TrendingUp, Trash2, Wallet } from "lucide-react";
import { useTransactionList } from "./useTransactionList";
import type { TransactionListProps } from "./types";
import { memo } from "react";

export default memo(function TransactionList({
  transactions,
  onDelete,
}: TransactionListProps) {
  const { formatCurrency, formatDate } = useTransactionList({
    transactions,
    onDelete,
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Transactions
        </h2>
        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
          {transactions.length} items
        </span>
      </div>

      <div className="flex-1 overflow-auto p-4 max-h-[600px]">
        {transactions.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-gray-400">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
              <Wallet size={32} />
            </div>
            <p>No transactions yet.</p>
            <p className="text-sm">Add one to get started!</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {transactions.map((item) => (
              <li
                key={item.id}
                className="group flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:bg-gray-50 hover:border-gray-200 transition-all bg-white shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      item.type === "income"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.type === "income" ? (
                      <TrendingUp size={20} />
                    ) : (
                      <TrendingDown size={20} />
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">
                        {item.category}
                      </span>
                      <span>•</span>
                      <span>{formatDate(item.date)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`font-bold tabular-nums ${
                      item.type === "income"
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.type === "income" ? "+" : "-"}{" "}
                    {formatCurrency(item.amount)}
                  </span>

                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

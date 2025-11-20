import { useMemo } from "react";
import type { TransactionListProps } from "./types";

export function useTransactionList({ transactions }: TransactionListProps) {
  const formatCurrency = useMemo(
    () =>
      (amount: number): string => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
      },
    []
  );

  const formatDate = useMemo(
    () =>
      (dateString: string): string => {
        return new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    []
  );

  return {
    transactions,
    formatCurrency,
    formatDate,
  };
}

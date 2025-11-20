import { useMemo } from "react";
import type { SummaryCardsProps } from "./types";

export function useSummaryCards(props: SummaryCardsProps) {
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

  return {
    stats: props.stats,
    formatCurrency,
  };
}

import { useState, useEffect, useMemo, useCallback } from "react";
import type { Transaction, TransactionStats } from "../types/transaction";

const STORAGE_KEY = "react-expense-tracker-data";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse transactions", e);
      return [];
    }
  });

  // Persist transactions to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  // Calculate stats
  const stats = useMemo<TransactionStats>(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  const addTransaction = useCallback(
    (transaction: Omit<Transaction, "id" | "date">) => {
      const newTransaction: Transaction = {
        ...transaction,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
      };
      setTransactions((prev) => [newTransaction, ...prev]);
      return newTransaction;
    },
    []
  );

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    transactions,
    stats,
    addTransaction,
    deleteTransaction,
  };
}

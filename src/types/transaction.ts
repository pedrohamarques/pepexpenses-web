export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
}

export interface TransactionStats {
  income: number;
  expenses: number;
  balance: number;
}

export interface FormData {
  title: string;
  amount: string;
  type: TransactionType;
  category: string;
}

import type { Transaction } from "../../types/transaction";

export interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

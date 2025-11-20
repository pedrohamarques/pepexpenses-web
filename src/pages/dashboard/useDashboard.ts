import { useTransactions } from "../../hooks/useTransactions";
import type { FormData } from "../../types/transaction";

export function useDashboard() {
  const { transactions, stats, addTransaction, deleteTransaction } =
    useTransactions();

  const handleFormSubmit = (formData: FormData) => {
    addTransaction({
      title: formData.title,
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
    });
  };

  const handleDelete = (id: string) => {
    deleteTransaction(id);
  };

  return {
    transactions,
    stats,
    handleFormSubmit,
    handleDelete,
  };
}

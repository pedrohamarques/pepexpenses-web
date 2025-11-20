import { useState, useCallback } from "react";
import type { FormData } from "../../types/transaction";
import type { TransactionFormProps } from "./types";

const INITIAL_FORM_STATE: FormData = {
  title: "",
  amount: "",
  type: "expense",
  category: "Food",
};

export function useTransactionForm({ onSubmit }: TransactionFormProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!formData.title || !formData.amount) return;

      onSubmit(formData);

      // Reset form but keep type/category for convenience
      setFormData((prev) => ({
        ...prev,
        title: "",
        amount: "",
      }));
    },
    [formData, onSubmit]
  );

  return {
    formData,
    handleInputChange,
    handleSubmit,
  };
}

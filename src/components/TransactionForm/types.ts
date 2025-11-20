import type { FormData } from "../../types/transaction";

export interface TransactionFormProps {
  onSubmit: (formData: FormData) => void;
}

export const CATEGORIES = [
  "Food",
  "Transport",
  "Housing",
  "Utilities",
  "Entertainment",
  "Salary",
  "Freelance",
  "Investment",
  "Health",
  "Shopping",
  "Other",
];

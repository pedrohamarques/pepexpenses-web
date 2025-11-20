import type { FormData } from "../../types/transaction";

export interface TransactionFormProps {
  onSubmit: (formData: FormData) => void;
}

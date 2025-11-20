import Header from "../../components/Header";
import SummaryCards from "../../components/SummaryCards";
import TransactionForm from "../../components/TransactionForm";
import TransactionList from "../../components/TransactionList";
import { useDashboard } from "./useDashboard";

export default function Dashboard() {
  const { handleDelete, handleFormSubmit, stats, transactions } =
    useDashboard();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Header title="Pepexpenses" subtitle="Manage your finances" />

        <SummaryCards stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TransactionForm onSubmit={handleFormSubmit} />
          </div>

          <div className="lg:col-span-2">
            <TransactionList
              transactions={transactions}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

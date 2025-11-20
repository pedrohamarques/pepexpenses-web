import { useState, useEffect, useMemo } from "react";
import { Wallet, TrendingUp, TrendingDown, Trash2, Plus } from "lucide-react";

export default function Dashboard() {
  // --- State ---
  // Initialize from localStorage directly to avoid flash of empty content
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("react-expense-tracker-data");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse transactions", e);
      return [];
    }
  });

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense", // 'income' | 'expense'
    category: "Food",
  });

  const categories = [
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

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem(
      "react-expense-tracker-data",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  // --- Computed Values ---
  const stats = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + Number(t.amount), 0);

    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + Number(t.amount), 0);

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    const newTransaction = {
      id: crypto.randomUUID(),
      title: formData.title,
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      date: new Date().toISOString(),
    };

    setTransactions((prev) => [newTransaction, ...prev]);

    // Reset form but keep type/category for convenience
    setFormData((prev) => ({
      ...prev,
      title: "",
      amount: "",
    }));
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600 rounded-xl shadow-lg text-white">
              <Wallet size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Expense Tracker
              </h1>
              <p className="text-sm text-gray-500">Manage your finances</p>
            </div>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Balance */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">
              Total Balance
            </span>
            <div className="mt-4 flex items-end justify-between">
              <span
                className={`text-3xl font-bold ${
                  stats.balance >= 0 ? "text-gray-900" : "text-red-600"
                }`}
              >
                {formatCurrency(stats.balance)}
              </span>
            </div>
          </div>

          {/* Income */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">
              Income
            </span>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-3xl font-bold text-emerald-600">
                {formatCurrency(stats.income)}
              </span>
              <div className="p-2 bg-emerald-50 rounded-full">
                <TrendingUp size={24} className="text-emerald-500" />
              </div>
            </div>
          </div>

          {/* Expenses */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">
              Expenses
            </span>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-3xl font-bold text-red-600">
                {formatCurrency(stats.expenses)}
              </span>
              <div className="p-2 bg-red-50 rounded-full">
                <TrendingDown size={24} className="text-red-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">
                New Transaction
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Groceries, Salary"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-400">
                      $
                    </span>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                      min="0.01"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Type */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="income"
                      checked={formData.type === "income"}
                      onChange={handleInputChange}
                      className="peer sr-only"
                    />
                    <div className="text-center py-2 rounded-lg border border-gray-200 peer-checked:bg-emerald-50 peer-checked:border-emerald-500 peer-checked:text-emerald-700 text-gray-600 hover:bg-gray-50 transition-all">
                      Income
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="expense"
                      checked={formData.type === "expense"}
                      onChange={handleInputChange}
                      className="peer sr-only"
                    />
                    <div className="text-center py-2 rounded-lg border border-gray-200 peer-checked:bg-red-50 peer-checked:border-red-500 peer-checked:text-red-700 text-gray-600 hover:bg-gray-50 transition-all">
                      Expense
                    </div>
                  </label>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Add Transaction
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Transactions
                </h2>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
                  {transactions.length} items
                </span>
              </div>

              <div className="flex-1 overflow-auto p-4 max-h-[600px]">
                {transactions.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                      <Wallet size={32} />
                    </div>
                    <p>No transactions yet.</p>
                    <p className="text-sm">Add one to get started!</p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {transactions.map((item) => (
                      <li
                        key={item.id}
                        className="group flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:bg-gray-50 hover:border-gray-200 transition-all bg-white shadow-sm"
                      >
                        <div className="flex items-center gap-4">
                          {/* Icon based on type */}
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              item.type === "income"
                                ? "bg-emerald-100 text-emerald-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {item.type === "income" ? (
                              <TrendingUp size={20} />
                            ) : (
                              <TrendingDown size={20} />
                            )}
                          </div>

                          <div>
                            <h3 className="font-medium text-gray-900">
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">
                                {item.category}
                              </span>
                              <span>•</span>
                              <span>{formatDate(item.date)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span
                            className={`font-bold tabular-nums ${
                              item.type === "income"
                                ? "text-emerald-600"
                                : "text-red-600"
                            }`}
                          >
                            {item.type === "income" ? "+" : "-"}{" "}
                            {formatCurrency(item.amount)}
                          </span>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

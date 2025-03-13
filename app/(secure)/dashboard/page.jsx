"use client";

import { addTransaction, getUserTransactions } from "@/lib/actions/user.action";
import { useState, useEffect } from "react";

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("deposit");
  const [loading, setLoading] = useState(false);

  // Fetch transactions on mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const data = await getUserTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addTransaction({ amount: parseFloat(amount), type });
      setAmount(""); // Clear form
      fetchTransactions(); // Refresh transactions list
    } catch (error) {
      console.error("Failed to add transaction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <h1>Dashboard</h1>

      {/* Transaction Form */}
      <form onSubmit={handleAddTransaction} className="form">
        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="input input-accent bg-white mb-1"
        />
        <select
          className="select select-accent bg-white mb-1"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
        </select>
        <button type="submit" disabled={loading} className="btn">
          {loading ? "Adding..." : "Add Transaction"}
        </button>
      </form>

      {/* Transactions List */}
      <h2>Your Transactions</h2>
      <ul>
        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <li key={tx.id}>
              {tx.type}: ${tx.amount} - {tx.status}
            </li>
          ))
        ) : (
          <p>No transactions found.</p>
        )}
      </ul>
    </div>
  );
};

export default DashboardPage;

"use client";

import AddTransactions from "@/components/transactions/AddTransactions";
import { getUserTransactions } from "@/lib/actions/user.action";
import { useState, useEffect } from "react";

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);

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

  return (
    <div className="flex flex-col gap-10 w-full min-h-screen">
      <h1>Dashboard</h1>

      {/* Transaction Form */}
      <AddTransactions />

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

"use client";

import AddTransactions from "@/components/transactions/AddTransactions";
import {
  deleteTransaction,
  getUserTransactions,
} from "@/lib/actions/user.action";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const data = await getUserTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Fetch transactions on mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (transactionId) => {
    try {
      const response = await deleteTransaction(transactionId);
      if (response.success) {
        setTransactions((prev) => prev.filter((tx) => tx.id !== transactionId)); // Remove deleted transaction
      } else {
        console.error("Error deleting transaction:", response.error);
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div>
      {/* Transaction Form */}
      <div className="grid md:grid-cols-3 grid-cols-1">
        <AddTransactions fetchTransactions={fetchTransactions} />
      </div>

      {/* Transactions List */}
      <h2 className="text-lg">Your Transactions</h2>
      <ul>
        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <li key={tx.id} className="flex items-center gap-4">
              {tx.type}: ${tx.amount} - {tx.status}
              <Button onClick={() => handleDelete(tx.id)} variant="destructive">
                Delete
              </Button>
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

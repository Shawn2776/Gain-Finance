"use client";

import AllTransactions from "@/components/transactions/AllTransactions";
import {
  deleteTransaction,
  getUserTransactions,
} from "@/lib/actions/user.action";
import React, { useEffect, useState } from "react";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch transactions on mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    try {
      const data = await getUserTransactions();
      setTransactions(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false);
    }
  };

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
    <div className="w-full min-h-screen">
      <AllTransactions
        txs={transactions}
        loading={loading}
        delete={handleDelete}
      />
    </div>
  );
};

export default TransactionsPage;

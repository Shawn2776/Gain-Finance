"use client";

import AllTransactions from "@/components/transactions/AllTransactions";
import {
  deleteTransaction,
  getUserTransactions,
} from "@/lib/actions/user.action";
import React, { useEffect, useState } from "react";

const TransactionsPage = () => {
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
      <AllTransactions transactions={transactions} />
    </div>
  );
};

export default TransactionsPage;

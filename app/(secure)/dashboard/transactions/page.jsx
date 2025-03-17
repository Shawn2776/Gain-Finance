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

      // Compute the running balance
      let runningBalance = 0;
      const transactionsWithBalance = data.map((tx) => {
        runningBalance +=
          tx.type === "deposit"
            ? parseFloat(tx.amount)
            : -parseFloat(tx.amount);
        return { ...tx, balance: runningBalance };
      });

      setTransactions(transactionsWithBalance);
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

  // Compute the total balance
  const totalBalance = transactions?.reduce(
    (acc, tx) => acc + parseFloat(tx.amount) * (tx.type === "deposit" ? 1 : -1),
    0
  );

  return (
    <div className="w-full min-h-screen flex justify-between">
      <AllTransactions
        txs={transactions} // Pass transactions with running balance
        loading={loading}
        setTransactions={setTransactions}
      />
      <div className={`${loading ? "hidden" : "mr-10"}`}>
        <div
          className={`${
            totalBalance === 0
              ? "text-black}"
              : totalBalance < 0
              ? "text-red-500"
              : "text-green-800"
          }`}
        >
          <p>Balance: ${totalBalance}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;

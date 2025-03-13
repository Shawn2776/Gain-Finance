"use client";

import { addTransaction } from "@/lib/actions/user.action";
import { useState } from "react";

const AddTransactions = () => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("deposit");
  const [loading, setLoading] = useState(false);

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
    <div className="w-68">
      <form onSubmit={handleAddTransaction} className="form flex flex-col">
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
        <div className="flex justify-end">
          <button type="submit" disabled={loading} className="btn">
            {loading ? "Adding..." : "Add Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransactions;

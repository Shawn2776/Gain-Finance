"use client";

import { addTransaction } from "@/lib/actions/user.action";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "../ui/form";
import { Loader2 } from "lucide-react";

const AddTransactions = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("deposit");
  const [loading, setLoading] = useState(false);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addTransaction({ amount: parseFloat(amount), type, description });
      setAmount(""); // Clear form
      setDescription("");
      fetchTransactions(); // Refresh transactions list
    } catch (error) {
      console.error("Failed to add transaction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
        {/* <CardDescription>Add a new transaction</CardDescription> */}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddTransaction} className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Input
              type="number"
              step="0.01"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full"
            />
            <Select value={type} onValueChange={setType} className="w-full">
              <SelectTrigger>
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black">
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full"
          />
          <div className="flex justify-end items-center w-full">
            {loading ? (
              <Button disabled>
                <Loader2 className="animate-spin" />
                Adding...
              </Button>
            ) : (
              <Button type="submit" variant="outline" className="w-full">
                Add Transaction
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTransactions;

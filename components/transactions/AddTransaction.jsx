"use client";

import { addTransaction } from "@/lib/actions/user.action";
import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy } from "lucide-react";
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
import { Label } from "../ui/label";

const AddTransaction = () => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("deposit");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null); // Store error message
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state

    try {
      await addTransaction({ amount: parseFloat(amount), type });
      setAmount(""); // Clear form
      fetchTransactions(); // Refresh transactions list
      setOpen(false); // Close the Add Transaction dialog
    } catch (error) {
      console.error("Failed to add transaction:", error);
      setError(error.message || "An unexpected error occurred.");
      setShowErrorModal(true); // Show error modal
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setOpen(true)}>
            Add Transaction
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>
              Enter the details of your transaction below.
            </DialogDescription>
          </DialogHeader>
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
                <SelectContent>
                  <SelectItem value="deposit">Deposit</SelectItem>
                  <SelectItem value="withdrawal">Withdrawal</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
        </DialogContent>
      </Dialog>

      {/* Error Modal */}
      {showErrorModal && (
        <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Error</DialogTitle>
              <DialogDescription>{error}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="destructive"
                onClick={() => {
                  setShowErrorModal(false);
                  setOpen(false); // Ensure Add Transaction dialog closes too
                }}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AddTransaction;

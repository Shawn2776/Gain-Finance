"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { BarLoader, PacmanLoader } from "react-spinners";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { transactions as txs } from "../../data/db.json";
import { useState } from "react";
import { deleteTransaction } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const AllTransactions = ({ txs, loading, setTransactions }) => {
  const router = useRouter();

  const handleDelete = async (transactionId) => {
    try {
      const response = await deleteTransaction(transactionId);
      if (response.success) {
        alert("Transaction successfully deleted.");
        const updatedTxs = txs.filter((tx) => tx.id !== transactionId);
        setTransactions(updatedTxs);
      } else {
        console.error("Error deleting transaction:", response.error);
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  // Define the columns for the table
  const columns = [
    {
      accessorKey: "createdAt", // Assuming createdAt is the date field
      header: "Date",
      cell: ({ row }) => {
        const rawDate = row.original.createdAt;
        if (!rawDate) return <span>Invalid Date</span>;
        return <span>{format(new Date(rawDate), "dd MMM yyyy")}</span>;
      },
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span
          className={
            row.original.type === "withdrawal"
              ? "text-red-500"
              : "text-green-800"
          }
        >
          ${row.original.amount}
        </span>
      ),
    },
    {
      accessorKey: "balance",
      header: "Balance",
      cell: ({ row }) => <span>${row.original.balance}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuLabel className="hidden">Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <Button onClick={() => handleDelete(row.original.id)}>
                Delete
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  // Hooks must be called unconditionally
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data: txs || [],
    columns, // Use the defined columns
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  // Conditional rendering AFTER hooks
  if (loading) {
    return (
      <div className="w-full flex justify-center">
        <BarLoader className="text-sm" color="#36D7B7" />
      </div>
    );
  }

  if (!txs || txs.length === 0) {
    return (
      <div className="text-center text-gray-500">No transactions found.</div>
    );
  }

  return (
    <div>
      <Table className="max-w-xl">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllTransactions;

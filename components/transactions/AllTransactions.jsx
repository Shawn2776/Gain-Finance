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

  // Move columns inside the component
  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
    },
    {
      accessorKey: "created_at", // Assuming created_at is the date field
      header: "Date",
      cell: ({ row }) => {
        const rawDate = row.original.createdAt;

        if (!rawDate) {
          console.error("Invalid Date: createdAt is null or undefined");
          return <span>Invalid Date</span>;
        }

        try {
          // Since rawDate is already a Date object, directly format it
          const formattedDate = format(rawDate, "dd MMM yyyy");
          return <span>{formattedDate}</span>;
        } catch (error) {
          console.error("Error formatting date:", error);
          return <span>Invalid Date</span>;
        }
      },
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span
          className={`${
            row.original.type === "withdrawal"
              ? "text-red-500"
              : "text-green-800"
          } flex w-full justify-center`}
        >
          ${row.original.amount}
        </span>
      ),
    },
    {
      accessorKey: "balance",
      header: "Balance",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu className="text-center">
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

  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data: txs || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
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
  );
};

export default AllTransactions;

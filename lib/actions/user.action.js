"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { users, transactions } from "@/database/schema"; // Ensure users is imported

export default async function createUser(params) {
  const { clerkId, email, firstName, lastName } = params;

  try {
    await db.insert(users).values({
      clerkId,
      email,
      firstName,
      lastName,
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error };
  }
}

export const getUserTransactions = async () => {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Unauthorized");
  }

  // Construct the query
  const query = db
    .select()
    .from(transactions)
    .where(eq(transactions.clerkId, clerkId)); // Use eq function and correct column

  //console.log(query.toSQL()); // Log the generated SQL query

  return await query;
};

export const addTransaction = async ({ amount, type, status = "pending" }) => {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Unauthorized");
  }

  // Insert transaction
  const [newTransaction] = await db
    .insert(transactions)
    .values({
      clerkId,
      amount,
      type,
      status,
    })
    .returning(); // Returns the inserted row

  return newTransaction;
};

export const deleteTransaction = async (transactionId) => {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Unauthorized");
  }
  // Check if the transaction exists and belongs to the user
  const [transaction] = await db
    .select()
    .from(transactions)
    .where(eq(transactions.id, transactionId));
  if (!transaction) {
    return { success: false, error: "Transaction not found" };
  }
  if (transaction.clerkId !== clerkId) {
    return {
      success: false,
      error: "You do not have permission to delete this transaction",
    };
  }

  try {
    const result = await db
      .delete(transactions)
      .where(eq(transactions.id, transactionId))
      .returning();

    return { success: true, deletedTransaction: result };
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return { success: false, error };
  }
};

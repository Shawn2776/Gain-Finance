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

  console.log(query.toSQL()); // Log the generated SQL query

  return await query;
};

// "use server";

// import { auth } from "@clerk/nextjs/server";
// import { transactions } from "./database/schema";
// import { db } from "./database/drizzle";
// import { eq } from "drizzle-orm"; // Import eq()

// export const getUserTransactions = async () => {
//   const { userId: clerkId } = await auth();

//   if (!clerkId) {
//     throw new Error("Unauthorized");
//   }

//   // Construct the query
//   const query = db
//     .select()
//     .from(transactions)
//     .where(eq(transactions.userId, clerkId)); // Use eq function

//   console.log(query.toSQL()); // Log the generated SQL query

//   return await query;
// };

// export const addTransaction = async ({ amount, type, status = "pending" }) => {
//   const { userId: clerkId } = await auth();

//   if (!clerkId) {
//     throw new Error("Unauthorized");
//   }

//   // Insert transaction
//   const [newTransaction] = await db
//     .insert(transactions)
//     .values({
//       clerkId,
//       amount,
//       type,
//       status,
//     })
//     .returning(); // Returns the inserted row

//   return newTransaction;
// };

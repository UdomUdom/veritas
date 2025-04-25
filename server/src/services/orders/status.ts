import db from "@/db";
import { order } from "@/db/schema";
import { and, eq, gte, lte, sql } from "drizzle-orm";
import _ from "lodash";

export const getOrderByStatus = async (
  status: "pending" | "waiting" | "paid" | "cancelled" | "failed" | "refunded"
) => {
  const result = await db.query.order.findMany({
    where: eq(order.status, status),
  });

  if (!result) throw new Error("Order not found");

  return { message: `Get order by status`, data: result };
};

export const getOrderBarChart = async () => {
  const now = new Date();
  const year = now.getFullYear();

  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  const orderData = await db
    .select({
      date: sql<string>`DATE(${order.updated_at})`.as("date"),
    })
    .from(order)
    .where(
      and(
        eq(order.status, "paid"),
        gte(order.updated_at, startDate),
        lte(order.updated_at, endDate)
      )
    )
    .execute();

  const dailyCounts = _.chain(orderData)
    .groupBy("date")
    .map((orders, date) => ({
      date,
      amount: orders.length,
    }))
    .sortBy("date")
    .value();

  return { message: `Get order bar chart`, data: dailyCounts };
};

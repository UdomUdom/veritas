import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

export const client = postgres(connectionString, { prepare: false });

export default drizzle(client, { schema, logger: true });

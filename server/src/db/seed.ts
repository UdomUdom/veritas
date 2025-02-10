import db from ".";
import * as table from "./schema";
import { eq } from "drizzle-orm";

(async function seed() {
  try {
    const already = await db.query.user.findFirst({
      where: eq(table.user.username, "admin"),
    });

    // Seed data
    if (!already) {
      await db.transaction(async (tx) => {
        await tx
          .insert(table.role)
          .values([{ name: "admin" }, { name: "staff" }, { name: "user" }]);

        const role_admin = await tx.query.role.findFirst({
          where: eq(table.role.name, "admin"),
        });

        await tx.insert(table.user).values({
          username: "admin",
          password: "admin",
          status: "active",
          role_id: role_admin?.id,
        });
      });
    }

    // Exit process
    console.log("[!] Done!");
    process.exit(0);
  } catch (error: unknown) {
    throw new Error(`[x] Failed: ${error}`);
  }
})();

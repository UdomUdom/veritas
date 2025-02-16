import db from ".";
import * as table from "./schema";
import { eq } from "drizzle-orm";
import Supabase from "@/utils/Supabase";

const default_admin = {
  email: process.env.ADMIN_EMAIL!,
  password: process.env.ADMIN_PASSWORD!,
};

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

        const { data, error } = await Supabase.auth.signUp(default_admin);

        if (error) throw error;

        await tx.insert(table.user).values({
          auth_id: data.user!.id,
          email: default_admin.email,
          username: default_admin.email.split("@")[0],
          role_id: role_admin!.id,
          status: "active",
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

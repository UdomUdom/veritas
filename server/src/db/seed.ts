import fs from "fs";
import path from "path";
import csv from "csv-parser";
import db from ".";
import { eq } from "drizzle-orm";
import { profiles, roles, users } from "./schema";
import { hashPassword } from "@/utils/Hash";

// Raw CSV data
const rawCsv = [
  {
    path: path.join(__dirname, "raw/roles.csv"),
    schema: roles,
  },
];

// Process CSV file
const processFile = async (filePath: string, schema: any) => {
  let result: any[] = [];
  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row: any) => {
        result.push(row);
      })
      .on("end", async () => {
        await db.insert(schema).values(result);
        console.log(`[+] ${filePath} imported!`);
        resolve();
      })
      .on("error", (err: any) => {
        console.error(`[-] Error reading file ${filePath}:`, err);
        reject(err);
      });
  });
};

// Seed data
(async function seed() {
  const aleadyRawData = await db.query.users.findMany();

  try {
    // Check if already have raw data
    if (aleadyRawData.length === 0) {
      // Import raw data
      console.log("[!] Importing raw data...");
      for (const item of rawCsv) {
        if (!fs.existsSync(item.path)) {
          console.error(`[!] File not found: ${item.path}`);
          continue;
        }
        await processFile(item.path, item.schema);
      }

      // Create default admin account
      await db.transaction(async (tx) => {
        const [new_profile] = await tx
          .insert(profiles)
          .values({
            firstname: "admin",
            lastname: "admin",
            email: "admin@veritas.me",
            date_of_birth: "1999-09-09",
            gender: "other",
            phone_number: "0123456789",
            address: "unknown",
            bio: "I'm Admin",
            avatar: "https://imgur.com/KbcNRn5",
          })
          .returning();

        // Get role admin
        const role_admin = await tx.query.roles.findFirst({
          where: eq(roles?.name, "admin"),
        });

        // Create admin account
        await tx.insert(users).values({
          profile_id: new_profile?.id,
          username: "admin",
          password: await hashPassword("admin"),
          role_id: role_admin?.id,
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

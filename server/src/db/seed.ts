import fs from "fs";
import path from "path";
import csv from "csv-parser";
import db from ".";
import { course, department, profile, role, subject, user } from "./schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "@/utils/Hash";

const raw = [
  {
    path: path.join(__dirname, "raw/role.csv"),
    schema: role,
  },
  {
    path: path.join(__dirname, "raw/department.csv"),
    schema: department,
  },
  {
    path: path.join(__dirname, "raw/course.csv"),
    schema: course,
  },
  {
    path: path.join(__dirname, "raw/subject.csv"),
    schema: subject,
  },
];

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

(async function seed() {
  const aleadyRawData = await db.query.role.findMany();

  try {
    if (aleadyRawData.length === 0) {
      console.log("[!] Importing raw data...");
      for (const item of raw) {
        if (!fs.existsSync(item.path)) {
          console.error(`[!] File not found: ${item.path}`);
          continue;
        }
        await processFile(item.path, item.schema);
      }
    }

    const aleadyAdmin = await db.query.user.findFirst({
      where: eq(user?.username, "admin"),
    });

    if (!aleadyAdmin) {
      await db.transaction(async (tx) => {
        const [new_profile] = await tx
          .insert(profile)
          .values({
            firstname: "admin",
            lastname: "admin",
            email: "admin@veritas.co",
            date_of_birth: "2024-12-31",
            gender: "other",
            phone_number: "0123456789",
            address: "Unknown",
            bio: "I'm Admin",
            avatar: "https://imgur.com/KbcNRn5",
          })
          .returning();

        const role_admin = await tx.query.role.findFirst({
          where: eq(role?.name, "admin"),
        });

        await tx.insert(user).values({
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

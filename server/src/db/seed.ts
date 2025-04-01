import { logger } from "@/utils/Logger";
import db from ".";
import { role } from "./schema";
import master from "./master/role.json";

const seed_role = async () => {
  const result = await db.transaction(async (tx) => {
    const existing = await tx.query.role.findMany();

    if (existing.length > 0) {
      throw new Error("Role already exists");
    }

    logger.warn(`Seeding role...`);

    const [seed_role] = await db
      .insert(role)
      .values(master.map((item) => ({ name: item })))
      .returning();

    return seed_role;
  });

  if (!result) throw new Error("Role not created");

  logger.info(`Role created`);
};

(async () => {
  try {
    await seed_role();
  } catch (error) {
    logger.error(
      `Error seeding: ${error instanceof Error ? error.message : error}`
    );
    process.exit(1);
  } finally {
    process.exit(0);
  }
})();

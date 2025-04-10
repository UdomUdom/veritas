import { logger } from "@/utils/Logger";
import db from ".";
import { category, role } from "./schema";
import master from "./master/category.json";

const seed_role = async () => {
  const result = await db.transaction(async (tx) => {
    const existing = await tx.query.role.findMany();

    if (existing.length > 0) return "Role already exists";

    logger.warn(`Seeding role...`);

    const [seed_role] = await tx
      .insert(role)
      .values(master.map((item) => ({ name: item })))
      .returning();

    if (!seed_role) throw new Error("Failed to create role");

    return "Role created";
  });

  logger.info(result);
};

const seed_category = async () => {
  const result = await db.transaction(async (tx) => {
    const existing = await tx.query.category.findMany();

    if (existing.length > 0) return "Category already exists";

    logger.warn(`Seeding category...`);

    const [seed_category] = await tx
      .insert(category)
      .values(master.map((item) => ({ name: item })))
      .returning();

    if (!seed_category) throw new Error("Failed to create category");

    return "Category created";
  });

  logger.info(result);
};

(async () => {
  try {
    await seed_role();
    await seed_category();
    logger.info(`Seeding completed`);
  } catch (error) {
    logger.error(
      `Error seeding: ${error instanceof Error ? error.message : error}`
    );
    process.exit(1);
  } finally {
    process.exit(0);
  }
})();

import { logger } from "@/utils/Logger";
import db from ".";
import { category, role } from "./schema";
import master from "./master/category.json";

const seed_role = async () => {
  try {
    const result = await db.transaction(async (tx) => {
      const existing = await tx.query.role.findMany();

      if (existing.length > 0) throw "Role already exists";

      const [data] = await tx
        .insert(role)
        .values(master.map((item) => ({ name: item })))
        .returning();

      if (!data) throw new Error("Failed to create role");

      return "Role created";
    });

    logger.info(result);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    } else {
      logger.warn(error);
    }
  }
};

const seed_category = async () => {
  try {
    const result = await db.transaction(async (tx) => {
      const existing = await tx.query.category.findMany();

      if (existing.length > 0) throw "Category already exists";

      const [data] = await tx
        .insert(category)
        .values(master.map((item) => ({ name: item })))
        .returning();

      if (!data) throw new Error("Failed to create category");

      return "Category created";
    });

    logger.info(result);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    } else {
      logger.warn(error);
    }
  }
};

(async () => {
  try {
    await seed_role();
    await seed_category();
  } catch (error) {
    logger.error(
      `Error seeding: ${error instanceof Error ? error.message : error}`
    );
    process.exit(1);
  } finally {
    process.exit(0);
  }
})();

import { logger } from "@/utils/Logger";
import db from ".";
import { category, role, user } from "./schema";
import { eq } from "drizzle-orm";
import master_role from "./master/role.json";
import master_category from "./master/category.json";
import { handleSignup } from "@/libs/Auth";

const seed_role_admin = async () => {
  try {
    await db.transaction(async (tx) => {
      const role_existing = await tx.query.role.findMany();

      if (role_existing.length > 0) {
        logger.warn("Role already exists");
      } else {
        const [role_created] = await tx
          .insert(role)
          .values(master_role.map((item) => ({ name: item })))
          .returning();

        if (!role_created) {
          logger.warn("Failed to create role");
        }

        logger.info("Role created");
      }

      const user_existing = await tx.query.user.findFirst({
        where: eq(user.firstname, "admin"),
      });

      if (user_existing) {
        logger.warn("Admin already exists");
      } else {
        const auth = await handleSignup({
          email: "admin@veritas.com",
          password: "veritas",
        });

        const role_admin = await tx.query.role.findFirst({
          where: eq(role.name, "admin"),
        });

        const [user_created] = await tx
          .insert(user)
          .values({
            id: auth.user!.id,
            firstname: "admin",
            lastname: "admin",
            email: auth.user!.email!,
            phone: "+66123456789",
            gender: "male",
            birthdate: "2022-12-12",
            avatar: "https://i.pravatar.cc/300",
            role_id: role_admin!.id,
          })
          .returning();

        if (!user_created) {
          logger.warn("Failed to create admin");
        }

        logger.info("Admin created");
      }
    });
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
        .values(master_category.map((item) => ({ name: item })))
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
    await seed_role_admin();
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

import { logger } from "@/utils/Logger";
import db from ".";
import { blog, event, organizer } from "./schema";
import mock_org from "./mock/organizer.json";
import mock_event from "./mock/event.json";
import mock_blog from "./mock/blog.json";

const mocking_org = async () => {
  try {
    const result = await db.transaction(async (tx) => {
      const existing = await tx.query.organizer.findMany();

      if (existing.length > 0) throw "Organizer already exists";

      const [data] = await tx.insert(organizer).values(mock_org).returning();

      if (!data) throw new Error("Failed to create organizer");

      return "Mocking Organizer completed";
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

const mocking_event = async () => {
  try {
    const result = await db.transaction(async (tx) => {
      const org = await tx.query.organizer.findFirst();
      const cat = await tx.query.category.findFirst();

      const existing = await tx.query.event.findMany();

      if (existing.length > 0) throw "Event already exists";

      const [data] = await tx
        .insert(event)
        .values(
          mock_event.map((item) => ({
            title: item.title,
            description: item.description,
            image: item.image,
            banner: item.banner,
            location: item.location,
            start_date: item.start_date,
            end_date: item.end_date,
            status: ["draft", "scheduled", "published", "archived"][
              Math.floor(Math.random() * 4)
            ] as "draft" | "scheduled" | "published" | "archived",
            info: item.info,
            category_id: cat?.id,
            organizer_id: org?.id,
          }))
        )
        .returning();

      if (!data) throw new Error("Failed to create event");

      return "Mocking Event completed";
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

const mocking_blog = async () => {
  try {
    const result = await db.transaction(async (tx) => {
      const existing = await tx.query.blog.findMany();

      if (existing.length > 0) throw "Blog already exists";

      const [data] = await tx.insert(blog).values(mock_blog).returning();

      if (!data) throw new Error("Failed to create blog");

      return "Mocking Blog completed";
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
    await mocking_org();
    await mocking_event();
    await mocking_blog();
  } catch (error) {
    logger.error(
      `Error mocking: ${error instanceof Error ? error.message : error}`
    );
    process.exit(1);
  } finally {
    process.exit(0);
  }
})();

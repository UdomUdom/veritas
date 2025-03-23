import Elysia from "elysia";
import { userController } from "@/controllers/user";
import { roleController } from "@/controllers/role";
import { instructorController } from "@/controllers/instructor";
import { categoryController } from "@/controllers/catgory";
import { workshopController } from "@/controllers/workshop";
import { blogController } from "@/controllers/blog";

export default new Elysia({ prefix: "api" })
  .use(userController)
  .use(roleController)
  .use(instructorController)
  .use(categoryController)
  .use(workshopController)
  .use(blogController);

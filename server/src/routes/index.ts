import Elysia from "elysia";
import { roleController } from "@/controllers/role";
import { userController } from "@/controllers/user";
import { categoryController } from "@/controllers/category";
import { organizerController } from "@/controllers/organizer";

export default new Elysia({ prefix: "api" })
  .use(roleController)
  .use(userController)
  .use(categoryController)
  .use(organizerController);

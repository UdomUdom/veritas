import Elysia from "elysia";
import { userController } from "@/controllers/users";
import { roleController } from "@/controllers/roles";

export default new Elysia({ prefix: "api" })
  .use(userController)
  .use(roleController);

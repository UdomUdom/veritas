import Elysia from "elysia";
import { userController } from "@/controllers/users";

export default new Elysia({ prefix: "api" }).use(userController);

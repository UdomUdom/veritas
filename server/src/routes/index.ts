import Elysia from "elysia";
import { userController } from "@/controllers/user";

export default new Elysia({ prefix: "api" }).use(userController);

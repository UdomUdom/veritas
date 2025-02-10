import { userController } from "@/controllers/users";
import Elysia from "elysia";

export default new Elysia({ prefix: "api" }).use(userController);

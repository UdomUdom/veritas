import Elysia from "elysia";
import {
  approveInstructor,
  approveStudent,
  userLogin,
  userRegistration,
} from "@/services/users/user";
import { ErrorHandler } from "@/utils/ErrorHandler";
import { UserModel } from "@/models/user";
import { InstructorModel } from "@/models/instructor";
import { InformationsModel } from "@/models/informations";

export const userController = new Elysia({
  detail: {
    tags: ["users"],
  },
}).group("users", (app) =>
  app
    .post(
      "/registration",
      async ({ body, set }) => {
        try {
          const result = await userRegistration(body);
          set.status = 201;
          return { status: "ok", message: "User created", id: result.id };
        } catch (error) {
          set.status = 400;
          return ErrorHandler(error);
        }
      },
      {
        body: InformationsModel,
      }
    )
    .post("/approve/student/:id", async ({ params, set }) => {
      try {
        const result = await approveStudent(params.id);
        return { status: "ok", message: "User approved", id: result.id };
      } catch (error) {
        set.status = 400;
        return ErrorHandler(error);
      }
    })
    .post(
      "/approve/instructor/:id",
      async ({ params, body, set }) => {
        try {
          const result = await approveInstructor(params.id, body);
          return { status: "ok", message: "User approved", id: result.id };
        } catch (error) {
          set.status = 400;
          return ErrorHandler(error);
        }
      },
      {
        body: InstructorModel,
      }
    )
    .post(
      "/login",
      async ({ body, set, cookie: { user } }) => {
        try {
          const result = await userLogin(body);
          user.value = result.token;
          return { status: "ok", message: "Login success" };
        } catch (error) {
          set.status = 400;
          return ErrorHandler(error);
        }
      },
      {
        body: UserModel,
      }
    )
);

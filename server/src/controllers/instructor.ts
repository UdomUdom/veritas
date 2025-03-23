import Elysia from "elysia";
import {
  createInstructor,
  deleteInstructor,
  getInstructorById,
  getInstructors,
  updateInstructor,
} from "@/services/instructor";
import { InstructorModel } from "@/models/instructor";
import { ErrorHandler, SuccessHandler } from "@/utils/Handler";

const controller = "instructor";

export const instructorController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app
    .get(
      "/",
      async ({ error }) => {
        try {
          const result = await getInstructors();
          return SuccessHandler(result);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "get all instructors" },
      }
    )
    .get(
      "/:id",
      async ({ params, error }) => {
        try {
          const result = await getInstructorById(params.id);
          return SuccessHandler(result);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "get instructor by id" },
      }
    )
    .post(
      "/",
      async ({ body, error }) => {
        try {
          const result = await createInstructor(body);
          return SuccessHandler(`Instructor ${result.id} created`);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "create instructor" },
        body: InstructorModel,
      }
    )
    .put(
      "/:id",
      async ({ params, body, error }) => {
        try {
          const result = await updateInstructor(params.id, body);
          return SuccessHandler(`Instructor ${result.id} updated`);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "update instructor" },
        body: InstructorModel,
      }
    )
    .delete(
      "/:id",
      async ({ params, error }) => {
        try {
          const result = await deleteInstructor(params.id);
          return SuccessHandler(`Instructor ${result.id} deleted`);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "delete instructor" },
      }
    )
);

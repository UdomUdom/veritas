import { t } from "elysia";

export const CategoryModel = t.Object({
  name: t.String(),
});

export type CategoryType = typeof CategoryModel.static;

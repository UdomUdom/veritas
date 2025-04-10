import { t } from "elysia";

export const QueryModel = t.Object({
  limit: t.Optional(t.Number()),
  offset: t.Optional(t.Number()),
});

export type QueryType = typeof QueryModel.static;

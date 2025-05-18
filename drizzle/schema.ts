import { boolean, integer, pgTable, text } from "drizzle-orm/pg-core";

export const Todo = pgTable("todos", {
  id: integer("id").primaryKey().unique().notNull().generatedAlwaysAsIdentity(),
  title: text("title").notNull().default(""),
  completed: boolean("completed").notNull().default(false),
});

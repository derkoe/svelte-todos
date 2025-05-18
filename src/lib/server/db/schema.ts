import { boolean, integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	text: text('text').notNull(),
	owner: uuid('owner').notNull(),
	done: boolean('done').default(false).notNull()
});

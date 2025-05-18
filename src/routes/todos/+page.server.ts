import { db } from '$lib/server/db';
import { todos } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

// Using a fixed user ID as specified, since auth is not implemented yet
const CURRENT_USER_ID = '4a6b4543-d46b-480e-907c-40bfdc6544ff';

export const load: PageServerLoad = async () => {
	const allTodos = await db.query.todos.findMany({
		where: eq(todos.owner, CURRENT_USER_ID)
	});

	return {
		todos: allTodos
	};
};

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const text = data.get('text')?.toString();

		if (!text) {
			return fail(400, { text, missing: true });
		}

		await db.insert(todos).values({
			text,
			owner: CURRENT_USER_ID,
			done: false
		});

		return { success: true };
	},

	update: async ({ request }) => {
		const data = await request.formData();
		const id = parseInt(data.get('id')?.toString() || '0');
		const text = data.get('text')?.toString() || '';
		const done = data.get('done') === 'true';

		if (!id) {
			return fail(400, { missing: true });
		}

		await db.update(todos).set({ text, done }).where(eq(todos.id, id));

		return { success: true };
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const id = parseInt(data.get('id')?.toString() || '0');

		if (!id) {
			return fail(400, { missing: true });
		}

		await db.delete(todos).where(eq(todos.id, id));

		return { success: true };
	},

	toggleDone: async ({ request }) => {
		const data = await request.formData();
		const id = parseInt(data.get('id')?.toString() || '0');
		const done = data.get('done') === 'true';

		if (!id) {
			return fail(400, { missing: true });
		}

		await db.update(todos).set({ done: !done }).where(eq(todos.id, id));

		return { success: true };
	}
};

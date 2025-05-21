<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { Card, Input, Button, Checkbox } from '@skeletonlabs/skeleton-svelte';

	export let data: PageData;

	let newTodoText = '';
	let editingId: number | null = null;
	let editText = '';

	function startEditing(todo: { id: number; text: string }) {
		editingId = todo.id;
		editText = todo.text;
	}

	function cancelEditing() {
		editingId = null;
		editText = '';
	}
</script>

<svelte:head>
	<title>Todos</title>
</svelte:head>

<Card class="container mx-auto max-w-3xl p-4">
	<h1 class="mb-6 text-3xl font-bold">Todos</h1>

	<!-- Add new todo form -->
	<form
		method="POST"
		action="?/create"
		use:enhance={() => {
			return ({ result, update }) => {
				if (result.type === 'success') {
					newTodoText = '';
					update();
				}
			};
		}}
		class="mb-8 flex items-center gap-2"
	>
		<Input
			type="text"
			name="text"
			bind:value={newTodoText}
			placeholder="Add a new todo..."
			class="flex-grow"
		/>
		<Button type="submit" class="variant-filled-primary">Add Todo</Button>
	</form>

	<!-- Todo list -->
	<div class="space-y-4">
		{#if data.todos.length === 0}
			<p class="text-center text-gray-500 italic">No todos yet. Add one above!</p>
		{/if}

		{#each data.todos as todo (todo.id)}
			<Card class="flex items-center gap-3 p-4">
				<!-- Toggle done status -->
				<form
					method="POST"
					action="?/toggleDone"
					use:enhance={() =>
						({ result, update }) => {
							if (result.type === 'success') {
								update();
							}
						}}
					class="flex-shrink-0"
				>
					<input type="hidden" name="id" value={todo.id} />
					<!-- The 'done' input is still useful for progressive enhancement if JS fails -->
					<input type="hidden" name="done" value={(!todo.done).toString()} />
					<Checkbox
						checked={todo.done}
						on:change={(e) => {
							// Programmatically submit the form when checkbox state changes
							// HTMLFormElement.requestSubmit() is the modern way to do this
							const form = e.currentTarget.closest('form');
							if (form) {
								form.requestSubmit();
							}
						}}
						aria-label="Toggle todo status"
						class="flex-shrink-0"
					/>
				</form>

				{#if editingId === todo.id}
					<!-- Edit mode -->
					<form
						method="POST"
						action="?/update"
						use:enhance={() => {
							return ({ result, update }) => {
								if (result.type === 'success') {
									cancelEditing();
									update();
								}
							};
						}}
						class="flex flex-grow items-center gap-2"
					>
						<input type="hidden" name="id" value={todo.id} />
						<input type="hidden" name="done" value={todo.done.toString()} />
						<Input
							type="text"
							name="text"
							bind:value={editText}
							class="flex-grow"
						/>
						<Button type="submit" class="variant-filled-success">Save</Button>
						<Button type="button" on:click={cancelEditing} class="variant-ghost-surface">
							Cancel
						</Button>
					</form>
				{:else}
					<!-- View mode -->
					<span class="flex-grow {todo.done ? 'text-gray-400 line-through' : ''}">
						{todo.text}
					</span>

					<div class="flex flex-shrink-0 gap-2">
						<Button
							aria-label="Edit todo"
							on:click={() => startEditing(todo)}
							class="variant-soft-primary"
						>
							Edit
						</Button>

						<form
							method="POST"
							action="?/delete"
							use:enhance={() =>
								({ result, update }) => {
									if (result.type === 'success') {
										update();
									}
								}}
						>
							<input type="hidden" name="id" value={todo.id} />
							<Button type="submit" aria-label="Delete todo" class="variant-soft-error">
								Delete
							</Button>
						</form>
					</div>
				{/if}
			</Card>
		{/each}
	</div>
</Card>

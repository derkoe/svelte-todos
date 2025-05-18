<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

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

<div class="container mx-auto max-w-3xl p-4">
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
		<input
			type="text"
			name="text"
			bind:value={newTodoText}
			placeholder="Add a new todo..."
			class="flex-grow rounded border border-gray-300 p-2"
		/>
		<button type="submit" class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
			Add Todo
		</button>
	</form>

	<!-- Todo list -->
	<div class="space-y-4">
		{#if data.todos.length === 0}
			<p class="text-center text-gray-500 italic">No todos yet. Add one above!</p>
		{/if}

		{#each data.todos as todo (todo.id)}
			<div class="flex items-center gap-3 rounded bg-white p-4 shadow-md">
				<!-- Toggle done status -->
				<form
					method="POST"
					action="?/toggleDone"
					use:enhance={() =>
						({ result, update }) => {
							console.log(result);
							if (result.type === 'success') {
								update();
							}
						}}
				>
					<input type="hidden" name="id" value={todo.id} />
					<input type="hidden" name="done" value={todo.done.toString()} />
					<button type="submit" class="flex-shrink-0">
						<div
							class="flex h-6 w-6 items-center justify-center rounded-md border-2 {todo.done
								? 'border-green-500 bg-green-500'
								: 'border-gray-300'}"
						>
							{#if todo.done}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="white"
									stroke-width="3"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<polyline points="20 6 9 17 4 12"></polyline>
								</svg>
							{/if}
						</div>
					</button>
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
						class="flex flex-grow gap-2"
					>
						<input type="hidden" name="id" value={todo.id} />
						<input type="hidden" name="done" value={todo.done.toString()} />
						<input
							type="text"
							name="text"
							bind:value={editText}
							class="flex-grow rounded border border-gray-300 p-2"
						/>
						<button
							type="submit"
							class="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
						>
							Save
						</button>
						<button
							type="button"
							on:click={cancelEditing}
							class="rounded bg-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-400"
						>
							Cancel
						</button>
					</form>
				{:else}
					<!-- View mode -->
					<span class="flex-grow {todo.done ? 'text-gray-400 line-through' : ''}">
						{todo.text}
					</span>

					<div class="flex flex-shrink-0 gap-2">
						<button
							aria-label="Edit todo"
							on:click={() => startEditing(todo)}
							class="cursor-pointer text-blue-500 hover:text-blue-700"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
								<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
							</svg>
						</button>

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
							<button
								type="submit"
								aria-label="Delete todo"
								class="cursor-pointer text-red-500 hover:text-red-700"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<polyline points="3 6 5 6 21 6"></polyline>
									<path
										d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
									></path>
									<line x1="10" y1="11" x2="10" y2="17"></line>
									<line x1="14" y1="11" x2="14" y2="17"></line>
								</svg>
							</button>
						</form>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	input:focus,
	button:focus {
		outline: 2px solid rgb(59, 130, 246);
		outline-offset: 2px;
	}
</style>

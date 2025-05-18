<svelte:head>
	<title>Svelte Todos - Home</title>
</svelte:head>

<div class="container mx-auto max-w-3xl p-4 text-center">
	<h1 class="mb-6 text-4xl font-bold">Welcome to Svelte Todos</h1>
	<p class="mb-8 text-lg">A simple todo application built with SvelteKit and Drizzle ORM.</p>

	<div class="rounded-lg bg-white p-8 shadow-md">
		<h2 class="mb-4 text-2xl font-semibold">Get Started</h2>
		<p class="mb-6">Start managing your todos by clicking the button below:</p>
		<a
			href="/todos"
			class="inline-block rounded-lg bg-blue-500 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-600"
		>
			Go to Todos
		</a>
	</div>
</div>

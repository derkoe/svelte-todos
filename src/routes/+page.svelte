<script lang="ts">
	import { Card, Button } from '@skeletonlabs/skeleton-svelte';
</script>

<svelte:head>
	<title>Svelte Todos - Home</title>
</svelte:head>

<div class="container mx-auto max-w-3xl p-4 text-center">
	<h1 class="mb-6 text-4xl font-bold">Welcome to Svelte Todos</h1>
	<p class="mb-8 text-lg">A simple todo application built with SvelteKit and Drizzle ORM.</p>

	<Card class="p-8 shadow-md">
		<h2 class="mb-4 text-2xl font-semibold">Get Started</h2>
		<p class="mb-6">Start managing your todos by clicking the button below:</p>
		<Button href="/todos" class="variant-filled-primary">
			Go to Todos
		</Button>
	</Card>
</div>

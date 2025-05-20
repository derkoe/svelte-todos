<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<header class="bg-blue-600 text-white">
		<div class="container mx-auto flex items-center justify-between p-4">
			<h1 class="text-xl font-bold">Svelte Todos MO</h1>
			<nav>
				<ul class="flex space-x-4">
					<li><a href="/" class="hover:underline">Home</a></li>
					<li><a href="/todos" class="hover:underline">Todos</a></li>
				</ul>
			</nav>
		</div>
	</header>

	<main class="flex-grow">
		{@render children()}
	</main>

	<footer class="bg-gray-100 p-4 text-center text-gray-600">
		<div class="container mx-auto">
			<p>Svelte Todos App - {new Date().getFullYear()}</p>
		</div>
	</footer>
</div>

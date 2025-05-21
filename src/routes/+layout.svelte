<script lang="ts">
	import '../app.css';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton-svelte';

	let { children } = $props();
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Svelte Todos</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a href="/" class="btn btn-sm variant-ghost-surface">Home</a>
				<a href="/todos" class="btn btn-sm variant-ghost-surface">Todos</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Main content -->
	{@render children()}
</AppShell>

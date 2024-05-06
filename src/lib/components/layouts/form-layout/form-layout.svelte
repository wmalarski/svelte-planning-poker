<script lang="ts">
	import { paths } from '$lib/utils/paths';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	const { children }: Props = $props();
</script>

<main class="max-w-xl px-2 py-8 mx-auto">
	<h1 class="py-6 text-3xl w-full text-center font-semibold">
		<a href={paths.home}>Planning poker</a>
	</h1>
	{@render children()}
</main>

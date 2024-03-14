<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	export let data;
</script>

<h1 class="text-3xl font-bold underline">Hello world!</h1>

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<ul>
	{#each data.countries as country}
		<li>{country.name}</li>
	{/each}
</ul>

<Input />

<script lang="ts">
	import { ThemeToggle } from '$lib/components/common/theme-toggle';
	import { Button } from '$lib/components/ui/button';
	import { userContext } from '$lib/contexts/user';
	import { paths } from '$lib/utils/paths';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	const user = userContext.get();
	const { children }: Props = $props();
</script>

<header class="w-full flex justify-between p-4 border-b-[1px] items-center">
	<div class="flex gap-4">
		<h1 class="text-3xl font-semibold">
			<a href={paths.home}>Planning poker</a>
		</h1>
		{#if user()}
			<nav>
				<ul>
					<li>
						<Button href={paths.rooms} variant="link">Rooms</Button>
					</li>
				</ul>
			</nav>
		{/if}
	</div>
	<div class="flex gap-4">
		<ThemeToggle />
		{#if user()}
			<form action={paths.signOut} method="POST">
				<Button type="submit" variant="secondary">Sign Out</Button>
			</form>
		{/if}
	</div>
</header>
<main class="flex flex-col gap-4 max-w-5xl px-2 py-8 mx-auto">
	{@render children()}
</main>

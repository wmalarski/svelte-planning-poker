<script>
	import { paths } from '$lib/utils/paths';
	import { sessionContext } from '$lib/contexts/session';

	const session = sessionContext.get();
</script>

<header class="w-full flex justify-between p-4 border-b-[1px] items-center">
	<h1 class="text-3xl font-semibold">
		<a href={paths.home}>Planning poker</a>
	</h1>
	{#if $session}
		<form method="POST" action={paths.signOut}>
			<button>Sign Out</button>
		</form>
	{/if}
</header>
<main class="max-w-5xl px-2 py-8 mx-auto">
	<slot />
</main>

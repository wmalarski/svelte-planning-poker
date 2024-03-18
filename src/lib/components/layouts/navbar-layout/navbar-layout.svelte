<script>
	import { paths } from '$lib/utils/paths';
	import { sessionContext } from '$lib/contexts/session';
	import { Button } from '$lib/components/ui/button';
	import { supabaseContext } from '$lib/contexts/supabase';
	import { enhance } from '$app/forms';

	const session = sessionContext.get();
	const supabase = supabaseContext.get();

	const onSignOut = () => {
		$supabase.auth.signOut();
	};
</script>

<header class="w-full flex justify-between p-4 border-b-[1px] items-center">
	<div class="flex gap-4">
		<h1 class="text-3xl font-semibold">
			<a href={paths.home}>Planning poker</a>
		</h1>
		{#if $session}
			<nav>
				<ul>
					<li>
						<Button href={paths.rooms} variant="link">Rooms</Button>
					</li>
				</ul>
			</nav>
		{/if}
	</div>
	{#if $session}
		<form method="POST" action={paths.signOut}>
			<Button type="submit" variant="secondary">Sign Out</Button>
		</form>
	{/if}
</header>
<main class="flex flex-col gap-4 max-w-5xl px-2 py-8 mx-auto">
	<slot />
</main>

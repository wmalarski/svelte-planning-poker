<script lang="ts">
	import { NavbarLayout } from '$lib/components/layouts/navbar-layout';
	import { paths } from '$lib/utils/paths';

	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	const { data }: Props = $props();
</script>

<NavbarLayout>
	<h1 class="text-3xl font-bold underline">Hello world!</h1>

	<p>
		Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
	</p>

	<ul>
		<li><a href={paths.poker('111')}>Poker</a></li>
		<li><a href={paths.room('111')}>Room</a></li>
		<li><a href={paths.rooms}>Rooms</a></li>
		<li><a href={paths.signIn}>Sign In</a></li>
		<li><a href={paths.signUp}>Sign Up</a></li>
		<li><a href={paths.signUpSuccess}>Sign Up Success</a></li>
	</ul>

	<pre class="max-w-md overflow-clip">
		{JSON.stringify(data.user, null, 2)}
	</pre>
</NavbarLayout>

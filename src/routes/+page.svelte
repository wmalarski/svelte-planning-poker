<script lang="ts">
	import { paths } from '$lib/utils/paths';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);
</script>

<h1 class="text-3xl font-bold underline">Hello world!</h1>

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<ul>
	<li><a href={paths.poker('111')}>Poker</a></li>
	<li><a href={paths.room('111')}>Room</a></li>
	<li><a href={paths.rooms}>Rooms</a></li>
	<li><a href={paths.signIn}>Sign In</a></li>
	<li><a href={paths.signUp}>Sign Up</a></li>
	<li><a href={paths.signUpSuccess}>Sign Up Success</a></li>
</ul>

<pre>{JSON.stringify(data.session, null, 2)}</pre>

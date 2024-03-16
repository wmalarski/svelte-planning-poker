<script lang="ts">
	import { sessionContext } from '$lib/contexts/session';
	import { writable } from 'svelte/store';
	import type { Session } from '@supabase/supabase-js';
	import '../app.css';

	export let data;

	const session = writable<Session | null>();
	$: session.set(data.session);
	sessionContext.set(session);
</script>

<slot />

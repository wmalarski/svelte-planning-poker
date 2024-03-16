<script lang="ts">
	import { sessionContext } from '$lib/contexts/session';
	import { writable } from 'svelte/store';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import '../app.css';
	import type { Database } from '$lib/types/supabase';
	import { supabaseContext } from '$lib/contexts/supabase';

	export let data;

	const session = writable<Session | null>();
	$: session.set(data.session);
	sessionContext.set(session);

	const supabase = writable<SupabaseClient<Database>>();
	$: supabase.set(data.supabase);
	supabaseContext.set(supabase);
</script>

<slot />

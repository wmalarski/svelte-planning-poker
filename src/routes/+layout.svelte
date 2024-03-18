<script lang="ts">
	import { sessionContext } from '$lib/contexts/session';
	import { writable } from 'svelte/store';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import '../app.css';
	import type { Database } from '$lib/types/supabase';
	import { supabaseContext } from '$lib/contexts/supabase';

	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	const { data }: Props = $props();

	const session = writable<Session | null>();
	sessionContext.set(session);
	$effect(() => {
		session.set(data.session);
	});

	const supabase = writable<SupabaseClient<Database>>();
	supabaseContext.set(supabase);
	$effect(() => {
		supabase.set(data.supabase);
	});
</script>

<slot />

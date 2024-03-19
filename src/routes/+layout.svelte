<script lang="ts">
	import type { Database } from '$lib/types/supabase';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';

	import { sessionContext } from '$lib/contexts/session';
	import { supabaseContext } from '$lib/contexts/supabase';
	import { writable } from 'svelte/store';

	import type { PageData } from './$types';

	import '../app.css';

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

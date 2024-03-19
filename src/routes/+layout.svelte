<script lang="ts">
	import { sessionContext } from '$lib/contexts/session';
	import { supabaseContext } from '$lib/contexts/supabase';

	import type { PageData } from './$types';

	import '../app.css';

	type Props = {
		data: PageData;
	};

	const { data }: Props = $props();

	let session = $state(data.session);
	sessionContext.set(() => session);
	$effect(() => {
		session = data.session;
	});

	let supabase = $state(data.supabase);
	supabaseContext.set(() => supabase);
	$effect(() => {
		supabase = data.supabase;
	});
</script>

<slot />

<script lang="ts">
	import { supabaseContext } from '$lib/contexts/supabase';
	import { userContext } from '$lib/contexts/user';

	import type { PageData } from './$types';

	import '../app.css';

	type Props = {
		data: PageData;
	};

	const { data }: Props = $props();

	let user = $state(data.user);
	userContext.set(() => user);
	$effect(() => {
		user = data.user;
	});

	let supabase = $state(data.supabase);
	supabaseContext.set(() => supabase);
	$effect(() => {
		supabase = data.supabase;
	});
</script>

<slot />

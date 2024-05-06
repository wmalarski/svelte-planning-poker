<script lang="ts">
	import { supabaseContext } from '$lib/contexts/supabase';
	import { userContext } from '$lib/contexts/user';
	import type { Snippet } from 'svelte';

	import type { PageData } from './$types';

	import '../app.css';

	type Props = {
		data: PageData;
		children: Snippet;
	};

	const { data, children }: Props = $props();

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

{@render children()}

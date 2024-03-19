<script lang="ts">
	import { NavbarLayout } from '$lib/components/layouts/navbar-layout';
	import TasksList from '$lib/components/modules/tasks-list/tasks-list.svelte';
	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	const { data }: Props = $props();
</script>

<NavbarLayout>
	<TasksList tasks={data.tasks} room={data.room} />
	<pre class="max-w-xl overflow-clip">
		{JSON.stringify({ session: data.session, room: data.room, player: data.player }, null, 2)}
	</pre>
</NavbarLayout>

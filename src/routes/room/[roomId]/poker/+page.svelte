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
	<TasksList room={data.room} tasks={data.tasks} />
	<pre class="max-w-xl overflow-clip">
		{JSON.stringify(
			{ player: data.player, room: data.room, session: data.session },
			null,
			2
		)}
	</pre>
</NavbarLayout>

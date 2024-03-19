<script lang="ts">
	import { NavbarLayout } from '$lib/components/layouts/navbar-layout';
	import TasksList from '$lib/components/modules/tasks-list/tasks-list.svelte';
	import { createTasksState } from '$lib/components/modules/tasks-list/create-tasks-state.svelte';

	import type { PageData } from './$types';
	import { supabaseContext } from '$lib/contexts/supabase';

	type Props = {
		data: PageData;
	};

	const { data }: Props = $props();

	const supabase = supabaseContext.get();

	const taskStore = createTasksState({
		initialTasks: data.tasks,
		roomId: data.room.id
	});
</script>

<NavbarLayout>
	<TasksList room={data.room} tasks={taskStore.tasks} />
	<pre class="max-w-xl overflow-clip">
		{JSON.stringify(
			{
				player: data.player,
				room: data.room,
				session: data.session,
				tasks: taskStore.tasks
			},
			null,
			2
		)}
	</pre>
</NavbarLayout>

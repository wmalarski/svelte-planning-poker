<script lang="ts">
	import { NavbarLayout } from '$lib/components/layouts/navbar-layout';
	import TasksList from '$lib/components/modules/tasks-list/tasks-list.svelte';
	import { createTasksState } from '$lib/components/modules/tasks-list/create-tasks-state.svelte';
	import { createPlayersState } from '$lib/components/modules/player-list/player-list-state.svelte';

	import type { PageData } from './$types';
	import PlayerList from '$lib/components/modules/player-list/player-list.svelte';

	type Props = {
		data: PageData;
	};

	const { data }: Props = $props();

	const playersStore = createPlayersState({
		currentPlayer: data.player,
		roomId: data.room.id
	});

	const taskStore = createTasksState({
		initialTasks: data.tasks,
		roomId: data.room.id
	});
</script>

<NavbarLayout>
	<PlayerList players={playersStore.players} />
	<TasksList room={data.room} tasks={taskStore.tasks} />
	<pre class="max-w-xl overflow-clip">
		{JSON.stringify(
			{
				player: data.player,
				room: data.room,
				session: data.session,
				tasks: taskStore.tasks,
				players: playersStore.players
			},
			null,
			2
		)}
	</pre>
</NavbarLayout>

<script lang="ts">
	import { NavbarLayout } from '$lib/components/layouts/navbar-layout';
	import { createPlayersState } from '$lib/components/modules/stores/player-list-state.svelte';
	import TasksList from '$lib/components/modules/tasks-list/tasks-list.svelte';
	import VotingBoard from '$lib/components/modules/voting-board/voting-board.svelte';
	import { createRealtimeState } from '$lib/components/modules/stores/create-realtime-state.svelte';

	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	const { data }: Props = $props();

	const playersStore = createPlayersState({
		currentPlayer: data.player,
		roomId: data.room.id
	});

	const realtimeStore = createRealtimeState({
		initialRoom: data.room,
		initialTasks: data.tasks
	});

	const onCurrentTaskChange = (taskId: string) => {
		realtimeStore.currentTaskId = taskId;
	};
</script>

<NavbarLayout>
	<VotingBoard
		player={data.player}
		room={realtimeStore.room}
		task={realtimeStore.currentTask}
		onNextVoteClick={realtimeStore.nextTask}
		players={playersStore.players}
	/>
	<TasksList
		onVoteTaskClick={onCurrentTaskChange}
		room={realtimeStore.room}
		tasks={realtimeStore.tasks}
	/>
	<pre class="max-w-xl overflow-clip">
		{JSON.stringify(
			{
				currentTask: realtimeStore.currentTask,
				player: data.player,
				players: playersStore.players,
				room: realtimeStore.room,
				session: data.session,
				tasks: realtimeStore.tasks
			},
			null,
			2
		)}
	</pre>
</NavbarLayout>

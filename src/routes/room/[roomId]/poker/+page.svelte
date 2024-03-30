<script lang="ts">
	import { NavbarLayout } from '$lib/components/layouts/navbar-layout';
	import PlayerList from '$lib/components/modules/player-list/player-list.svelte';
	import { createPlayersState } from '$lib/components/modules/player-list/player-list-state.svelte';
	import { createTasksState } from '$lib/components/modules/tasks-list/create-tasks-state.svelte';
	import TasksList from '$lib/components/modules/tasks-list/tasks-list.svelte';
	import { createVotingState } from '$lib/components/modules/voting-board/create-voting-state.svelte';
	import VotingBoard from '$lib/components/modules/voting-board/voting-board.svelte';

	import type { PageData } from './$types';

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

	const votingStore = createVotingState({
		initialCurrentTaskId: data.room.current_task_id,
		player: data.player,
		roomId: data.room.id
	});

	const currentTask = $derived.by(() => {
		const currentTaskId = votingStore.currentTaskId;
		return taskStore.tasks.find((task) => task.id === currentTaskId);
	});

	const onCurrentTaskChange = (taskId: string) => {
		votingStore.currentTaskId = taskId;
	};

	const onNextVoteClick = () => {
		const nextTask = taskStore.nextTask(currentTask?.id);
		votingStore.currentTaskId = nextTask?.id ?? null;
	}
</script>

<NavbarLayout>
	<VotingBoard
		player={data.player}
		room={data.room}
		task={currentTask}
		isVoting={!currentTask?.finished}
		onNextVoteClick={onNextVoteClick}
	/>
	<PlayerList players={playersStore.players} />
	<TasksList
		onVoteTaskClick={onCurrentTaskChange}
		room={data.room}
		tasks={taskStore.tasks}
	/>
	<pre class="max-w-xl overflow-clip">
		{JSON.stringify(
			{
				currentTaskId: votingStore.currentTaskId,
				player: data.player,
				players: playersStore.players,
				room: data.room,
				session: data.session,
				tasks: taskStore.tasks
			},
			null,
			2
		)}
	</pre>
</NavbarLayout>

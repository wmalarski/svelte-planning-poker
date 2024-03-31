<script lang="ts">
	import { NavbarLayout } from '$lib/components/layouts/navbar-layout';
	import { createRealtimeState } from '$lib/components/modules/stores/create-realtime-state.svelte';
	import { createPlayersState } from '$lib/components/modules/stores/player-list-state.svelte';
	import TasksList from '$lib/components/modules/tasks-list/tasks-list.svelte';
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

	const realtimeStore = createRealtimeState({
		initialRoom: data.room,
		initialTasks: data.tasks,
		playerId: data.player.id,
	});

	const isOwner = $derived.by(() => {
		return realtimeStore.room.moderators.includes(data.player.id);
	});

	const onVoteSubmit = (vote: string) => {
		realtimeStore.currentVote = vote;
	}
</script>

<NavbarLayout>
	<VotingBoard
		currentVote={realtimeStore.currentVote}
		{isOwner}
		onNextVoteClick={realtimeStore.moveToNextTask}
		{onVoteSubmit}
		player={data.player}
		players={playersStore.players}
		task={realtimeStore.currentTask}
	/>
	<TasksList
		{isOwner}
		onVoteTaskClick={realtimeStore.updateCurrentTaskId}
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

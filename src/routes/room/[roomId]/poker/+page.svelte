<script lang="ts">
	import { NavbarLayout } from '$lib/components/layouts/navbar-layout';
	import SettingsCard from '$lib/components/modules/settings-card/settings-card.svelte';
	import { createPlayersState } from '$lib/components/modules/stores/player-list-state.svelte';
	import { createRealtimeState } from '$lib/components/modules/stores/realtime-state.svelte';
	import TasksList from '$lib/components/modules/tasks-list/tasks-list.svelte';
	import VotingBoard from '$lib/components/modules/voting-board/voting-board.svelte';

	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	const { data }: Props = $props();

	const playersStore = createPlayersState({
		initialPlayer: data.player,
		roomId: data.room.id
	});

	const realtimeStore = createRealtimeState({
		initialRoom: data.room,
		initialTasks: data.tasks,
		playerId: data.player.id
	});

	const isModerator = $derived.by(() => {
		return realtimeStore.room.moderators.includes(data.player.id);
	});

	const onVoteSubmit = (vote: string) => {
		realtimeStore.currentVote = vote;
	};
</script>

<NavbarLayout>
	<SettingsCard
		{isModerator}
		onPlayerUpdate={playersStore.updatePlayer}
		player={data.player}
	/>
	<VotingBoard
		currentPlayer={data.player}
		currentTask={realtimeStore.currentTask}
		currentVote={realtimeStore.currentVote}
		{isModerator}
		onNextVoteClick={realtimeStore.moveToNextTask}
		{onVoteSubmit}
		players={playersStore.players}
		room={realtimeStore.room}
	/>
	<TasksList
		currentTask={realtimeStore.currentTask}
		{isModerator}
		onVoteTaskClick={realtimeStore.updateCurrentTaskId}
		room={realtimeStore.room}
		tasks={realtimeStore.tasks}
	/>
	<details>
		<summary>Debug</summary>
		<pre class="max-w-xl overflow-clip">
			{JSON.stringify(
				{
					currentTask: realtimeStore.currentTask,
					player: data.player,
					players: playersStore.players,
					room: realtimeStore.room,
					tasks: realtimeStore.tasks
				},
				null,
				2
			)}
	</pre>
	</details>
</NavbarLayout>

<script lang="ts">
	import type {
		PlayerState,
		RoomRow,
		TaskResults,
		TaskRow
	} from '$lib/types/models';

	import VoteResultCard from './vote-result-card.svelte';

	type Props = {
		currentPlayer: PlayerState;
		players: PlayerState[];
		room: RoomRow;
		task: TaskRow;
	};

	const { currentPlayer, players, room, task }: Props = $props();

	const playersToDisplay = $derived(
		players.filter((player) => !player.spectator)
	);
</script>

<ul class="flex gap-2">
	{#each playersToDisplay as player}
		<VoteResultCard
			{currentPlayer}
			finished={task.finished}
			{player}
			{room}
			vote={(task.results as TaskResults)?.[player.id]}
		/>
	{/each}
</ul>

<script lang="ts">
	import type { PlayerState, TaskResults, TaskRow } from '$lib/types/models';

	import VoteResultCard from './vote-result-card.svelte';

	type Props = {
		players: PlayerState[];
		task: TaskRow;
	};

	const { players, task }: Props = $props();

	const playersToDisplay = $derived(players.filter(player => !player.spectator))
</script>

<ul>
	{#each playersToDisplay as player}
		<li>
			<VoteResultCard
				finished={task.finished}
				{player}
				vote={(task.results as TaskResults)?.[player.id]}
			/>
		</li>
	{/each}
</ul>

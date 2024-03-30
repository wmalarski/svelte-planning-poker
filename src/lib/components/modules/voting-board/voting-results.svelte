<script lang="ts">
	import type { PlayerState } from '$lib/services/players';
	import type { TaskResults, TaskRow } from '$lib/types/models';

	import VoteResultCard from './vote-result-card.svelte';

	type Props = {
		players: PlayerState[];
		task: TaskRow;
	};

	const { players, task }: Props = $props();
</script>

<ul>
	{#each players as player}
		<li>
			<VoteResultCard
				finished={task.finished}
				{player}
				vote={(task.results as TaskResults)?.[player.id]}
			/>
		</li>
	{/each}
</ul>

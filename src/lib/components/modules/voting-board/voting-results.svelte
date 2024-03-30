<script lang="ts">
	import type { PlayerState } from '$lib/services/players';
	import type { TaskResults, TaskRow } from '$lib/types/models';
	import VoteResultCard from './vote-result-card.svelte';

	type Props = {
		task: TaskRow;
		players: PlayerState[];
	};

	const { task, players }: Props = $props();
</script>

<ul>
	{#each players as player}
		<li>
			<VoteResultCard 
				finished={task.finished}
				vote={(task.results as TaskResults)?.[player.id]}
				{player}				
			/>
		</li>
	{/each}
</ul>

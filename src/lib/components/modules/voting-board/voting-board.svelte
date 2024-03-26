<script lang="ts">
	import type { RoomRow, TaskRow } from '$lib/types/models';

	import * as Card from '$lib/components/ui/card';
	import VotingButtons from './voting-buttons.svelte';
	import type { PlayerState } from '$lib/services/players';

	type Props = {
		room: RoomRow;
		task?: TaskRow;
		player: PlayerState;
	};

	const { room, task, player }: Props = $props();
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl" tag="h2">List of tasks</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if task}
			<VotingButtons {task} {room} {player}/>
		{/if}
	</Card.Content>
</Card.Root>

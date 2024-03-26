<script lang="ts">
	import type { PlayerState } from '$lib/services/players';
	import type { RoomRow, TaskRow } from '$lib/types/models';

	import * as Card from '$lib/components/ui/card';

	import VotingButtons from './voting-buttons.svelte';

	type Props = {
		onVoteClick: (vote: string) => void;
		player: PlayerState;
		room: RoomRow;
		task?: TaskRow;
	};

	const { onVoteClick, player, room, task }: Props = $props();
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl" tag="h2">List of tasks</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if task}
			<VotingButtons {onVoteClick} {player} {room} {task} />
		{/if}
	</Card.Content>
</Card.Root>

<script lang="ts">
	import type { PlayerState } from '$lib/services/players';
	import type { RoomRow, TaskRow } from '$lib/types/models';

	import * as Card from '$lib/components/ui/card';

	import VotingButtons from './voting-buttons.svelte';
	import VotingResultsView from './voting-results-view.svelte';
	import VotingControls from './voting-controls.svelte';

	type Props = {
		isVoting: boolean;
        onNextVoteClick: () => void
		player: PlayerState;
		room: RoomRow;
		task?: TaskRow;
	};

	const { isVoting, onNextVoteClick, player, room, task }: Props = $props();
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl" tag="h2">Voting</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if task}
			{#if room.owner_id === player.id}
				<VotingControls 
					isVoting={isVoting}
					taskId={task.id}
					onNextVoteClick={onNextVoteClick}
				/>
			{/if}
			<VotingResultsView {task} />
			<VotingButtons {task} {player} />
		{/if}
	</Card.Content>
</Card.Root>

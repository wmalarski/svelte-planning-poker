<script lang="ts">
	import type { PlayerState, RoomRow, TaskRow } from '$lib/types/models';

	import * as Card from '$lib/components/ui/card';

	import VotingButtons from './voting-buttons.svelte';
	import VotingControls from './voting-controls.svelte';
	import VotingResults from './voting-results.svelte';

	type Props = {
		currentPlayer: PlayerState;
		currentTask?: TaskRow;
		currentVote?: string;
		isModerator: boolean;
		onNextVoteClick: () => void;
		onVoteSubmit: (vote: string) => void;
		players: PlayerState[];
		room: RoomRow;
	};

	const {
		currentPlayer,
		currentTask,
		currentVote,
		isModerator,
		onNextVoteClick,
		onVoteSubmit,
		players,
		room
	}: Props = $props();
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl" tag="h2">Voting</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if currentTask}
			<b>{currentTask.content}</b>
			{#if isModerator}
				<VotingControls {onNextVoteClick} task={currentTask} />
			{/if}
			<VotingResults {currentPlayer} {players} {room} task={currentTask} />
			{#if !currentPlayer.spectator}
				<VotingButtons
					{currentVote}
					{onVoteSubmit}
					player={currentPlayer}
					task={currentTask}
				/>
			{/if}
		{/if}
	</Card.Content>
</Card.Root>

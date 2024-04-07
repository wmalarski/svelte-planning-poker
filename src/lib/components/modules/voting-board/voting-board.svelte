<script lang="ts">
	import type { PlayerState, TaskRow } from '$lib/types/models';

	import * as Card from '$lib/components/ui/card';

	import VotingButtons from './voting-buttons.svelte';
	import VotingControls from './voting-controls.svelte';
	import VotingResults from './voting-results.svelte';

	type Props = {
		currentVote?: string;
		isOwner: boolean;
		onNextVoteClick: () => void;
		onVoteSubmit: (vote: string) => void;
		player: PlayerState;
		players: PlayerState[];
		currentTask?: TaskRow;
	};

	const {
		currentVote,
		isOwner,
		onNextVoteClick,
		onVoteSubmit,
		player,
		players,
		currentTask
	}: Props = $props();
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl" tag="h2">Voting</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if currentTask}
			<b>{currentTask.content}</b>
			{#if isOwner}
				<VotingControls {onNextVoteClick} task={currentTask} />
			{/if}
			<VotingResults {players} task={currentTask} />
			{#if !player.spectator}
				<VotingButtons {currentVote} {onVoteSubmit} {player} task={currentTask} />
			{/if}
		{/if}
	</Card.Content>
</Card.Root>

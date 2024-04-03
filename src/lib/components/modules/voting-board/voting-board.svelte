<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { TaskRow, PlayerState } from '$lib/types/models';

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
		task?: TaskRow;
	};

	const { currentVote, isOwner, onNextVoteClick, onVoteSubmit, player, players, task }: Props = $props();
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl" tag="h2">Voting</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if task}
			<b>{task.content}</b>
			{#if isOwner}
				<VotingControls {onNextVoteClick} {task} />
			{/if}
			<VotingResults {players} {task} />
			{#if !player.spectator}
				<VotingButtons {currentVote} {player} {task} {onVoteSubmit} />
			{/if}
		{/if}
	</Card.Content>
</Card.Root>

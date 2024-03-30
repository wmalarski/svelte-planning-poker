<script lang="ts">
	import type { PlayerState } from '$lib/services/players';
	import type { TaskVote } from '$lib/types/models';

	import * as Card from '$lib/components/ui/card';

	type Props = {
		finished: boolean;
		player: PlayerState;
		vote?: TaskVote;
	};

	const { player, vote, finished }: Props = $props();
</script>

<Card.Root>
	<Card.Content>
		<span>
			{#if finished && vote}
				{vote.value}
			{:else if finished}
				Vote skipped
			{:else if vote}
				Voted
			{:else}
				Waiting for vote
			{/if}
		</span>
		<b>
			{player.name}
		</b>
	</Card.Content>
</Card.Root>

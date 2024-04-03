<script lang="ts">
	import type { PlayerState, TaskVote } from '$lib/types/models';

	import * as Card from '$lib/components/ui/card';

	type Props = {
		finished: boolean;
		player: PlayerState;
		vote?: TaskVote;
	};

	const { finished, player, vote }: Props = $props();
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

<script lang="ts">
	import type { PlayerState } from '$lib/services/players';

	import * as Card from '$lib/components/ui/card';

	type Props = {
		players: PlayerState[];
	};

	const { players }: Props = $props();
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl" tag="h2">List of players</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-4">
		<ul>
			{#each players as player}
				<pre>{JSON.stringify(player, null, 2)}</pre>
			{/each}
		</ul>
	</Card.Content>
</Card.Root>

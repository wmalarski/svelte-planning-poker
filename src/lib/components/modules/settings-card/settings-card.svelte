<script lang="ts">
	import type { PlayerState } from '$lib/types/models';

	import * as Card from '$lib/components/ui/card';

	type Props = {
		isOwner: boolean;
		player: PlayerState;
	};

	const { isOwner, player }: Props = $props();
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl" tag="h2">Settings</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if isOwner}
			<span>You have moderator rights</span>
		{/if}
	</Card.Content>
</Card.Root>

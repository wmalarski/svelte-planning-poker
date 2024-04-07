<script lang="ts">
	import type { PlayerState } from '$lib/types/models';

	import * as Card from '$lib/components/ui/card';
	import NameForm from './name-form.svelte';
	import type { UpdatePlayerArgs } from '$lib/services/players';

	type Props = {
		isOwner: boolean;
		player: PlayerState;
		onPlayerUpdate: (update: UpdatePlayerArgs) => void;
	};

	const { isOwner, player, onPlayerUpdate }: Props = $props();

	const onNameChange = (name: string) => {
		onPlayerUpdate({ name, spectator: player.spectator })
	}
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl" tag="h2">User settings</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if isOwner}
			<span>You have moderator rights</span>
		{/if}
		<NameForm player={player} onChange={onNameChange} />
		{#if player.spectator}
			<span>You are spectator</span>
		{/if}
	</Card.Content>
</Card.Root>

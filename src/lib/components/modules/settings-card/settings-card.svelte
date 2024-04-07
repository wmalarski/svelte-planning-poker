<script lang="ts">
	import type { UpdatePlayerArgs } from '$lib/services/players';
	import type { PlayerState } from '$lib/types/models';

	import * as Card from '$lib/components/ui/card';

	import NameForm from './name-form.svelte';

	type Props = {
		isOwner: boolean;
		onPlayerUpdate: (update: UpdatePlayerArgs) => void;
		player: PlayerState;
	};

	const { isOwner, onPlayerUpdate, player }: Props = $props();

	const onNameChange = (name: string) => {
		onPlayerUpdate({ name, spectator: player.spectator });
	};
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl" tag="h2">User settings</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if isOwner}
			<span>You have moderator rights</span>
		{/if}
		<NameForm onChange={onNameChange} {player} />
		{#if player.spectator}
			<span>You are spectator</span>
		{/if}
	</Card.Content>
</Card.Root>

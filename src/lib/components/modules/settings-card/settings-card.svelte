<script lang="ts">
	import type { UpdatePlayerArgs } from '$lib/services/players';
	import type { PlayerState } from '$lib/types/models';

	import * as Card from '$lib/components/ui/card';

	import NameForm from './name-form.svelte';
	import SpectatorForm from './spectator-form.svelte';

	type Props = {
		isModerator: boolean;
		onPlayerUpdate: (update: Partial<UpdatePlayerArgs>) => void;
		player: PlayerState;
	};

	const { isModerator, onPlayerUpdate, player }: Props = $props();

	const onNameChange = (name: string) => {
		onPlayerUpdate({ name });
	};

	const onSpectatorChange = (spectator: boolean) => {
		onPlayerUpdate({ spectator });
	};
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl" tag="h2">User settings</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if isModerator}
			<span>You have moderator rights</span>
		{/if}
		<NameForm onChange={onNameChange} {player} />
		<SpectatorForm onChange={onSpectatorChange} {player} />
	</Card.Content>
</Card.Root>

<script lang="ts">
	import type { RoomRow } from '$lib/types/models';

	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { paths } from '$lib/utils/paths';

	type Props = {
		rooms: RoomRow[];
	};

	const { rooms }: Props = $props();
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl" tag="h2">List of rooms</Card.Title>
		<Card.Description>Your existing rooms</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#each rooms as room}
			<div class="flex flex-col gap-2 p-3">
				<strong class="text-lg">{room.name}</strong>
				<span>{room.description}</span>
				<Button href={paths.poker(room.id)} variant="secondary">Join</Button>
			</div>
		{/each}
	</Card.Content>
</Card.Root>

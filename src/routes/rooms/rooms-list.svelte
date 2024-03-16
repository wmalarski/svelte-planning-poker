<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import type { RoomRow } from '$lib/types/models';
	import { paths } from '$lib/utils/paths';

	export let rooms: RoomRow[];
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title tag="h2" class="text-2xl">List of rooms</Card.Title>
		<Card.Description>Your existing rooms</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#each rooms as room}
			<div class="flex flex-col gap-2 p-3">
				<strong class="text-lg">{room.name}</strong>
				<span>{room.description}</span>
				<Button variant="secondary" href={paths.poker(room.id)}>Join</Button>
			</div>
		{/each}
	</Card.Content>
</Card.Root>

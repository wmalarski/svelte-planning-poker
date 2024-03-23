<script lang="ts">
	import type { RoomRow, TaskRow } from '$lib/types/models';

	import * as Card from '$lib/components/ui/card';

	type Props = {
		room: RoomRow;
		task?: TaskRow;
	};

	const { room, task }: Props = $props();
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl" tag="h2">List of tasks</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-4">
		<pre>{JSON.stringify({room, task}, null, 2)}</pre>
	</Card.Content>
</Card.Root>


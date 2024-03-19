<script lang="ts">
	import type { RoomRow, TaskRow } from '$lib/types/models';

	import * as Card from '$lib/components/ui/card';
	import { sessionContext } from '$lib/contexts/session';

	import CreateTaskForm from './create-task-form.svelte';
	import TasksListItem from './tasks-list-item.svelte';

	type Props = {
		room: RoomRow;
		tasks: TaskRow[];
	};

	const { room, tasks: initialTasks }: Props = $props();

	const tasks = $state(initialTasks);

	const session = sessionContext.get();
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl" tag="h2">List of tasks</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if session()?.user.id === room.owner_id}
			<CreateTaskForm roomId={room.id} />
		{/if}
		<ul>
			{#each tasks as task}
				<TasksListItem {task} />
			{/each}
		</ul>
	</Card.Content>
</Card.Root>

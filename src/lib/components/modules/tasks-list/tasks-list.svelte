<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { RoomRow, TaskRow } from '$lib/types/models';
	import CreateTaskForm from './create-task-form.svelte';
	import { sessionContext } from '$lib/contexts/session';
	import TasksListItem from './tasks-list-item.svelte';

	type Props = {
		room: RoomRow;
		tasks: TaskRow[];
	};

	const { room, tasks: initialTasks }: Props = $props();

	let tasks = $state(initialTasks);

	const session = sessionContext.get();
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title tag="h2" class="text-2xl">List of tasks</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if $session && $session.user.id === room.owner_id}
			<CreateTaskForm roomId={room.id} />
		{/if}
		<ul>
			{#each tasks as task}
				<TasksListItem {task} />
			{/each}
		</ul>
	</Card.Content>
</Card.Root>

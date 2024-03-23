<script lang="ts">
	import type { RoomRow, TaskRow } from '$lib/types/models';

	import * as Card from '$lib/components/ui/card';
	import { sessionContext } from '$lib/contexts/session';

	import CreateTaskForm from './create-task-form.svelte';
	import TasksListItem from './tasks-list-item.svelte';

	type Props = {
		onVoteTaskClick: (taskId: string) => void;
		room: RoomRow;
		tasks: TaskRow[];
	};

	const { onVoteTaskClick, room, tasks }: Props = $props();

	const session = sessionContext.get();

	const isOwner = $derived(session()?.user.id === room.owner_id);
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl" tag="h2">List of tasks</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if isOwner}
			<CreateTaskForm roomId={room.id} />
		{/if}
		<ul>
			{#each tasks as task}
				<TasksListItem {isOwner} onVoteClick={onVoteTaskClick} {task} />
			{/each}
		</ul>
	</Card.Content>
</Card.Root>

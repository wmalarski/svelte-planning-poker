<script lang="ts">
	import type { RoomRow, TaskRow } from '$lib/types/models';

	import * as Card from '$lib/components/ui/card';

	import CreateTaskForm from './create-task-form.svelte';
	import TasksListItem from './tasks-list-item.svelte';

	type Props = {
		isOwner: boolean;
		onVoteTaskClick: (taskId: string) => void;
		room: RoomRow;
		currentTask?: TaskRow;
		tasks: TaskRow[];
	};

	const { isOwner, onVoteTaskClick, room, currentTask, tasks }: Props = $props();
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
				<TasksListItem {isOwner} onVoteClick={onVoteTaskClick} {task} isCurrent={task.id === currentTask?.id}/>
			{/each}
		</ul>
	</Card.Content>
</Card.Root>

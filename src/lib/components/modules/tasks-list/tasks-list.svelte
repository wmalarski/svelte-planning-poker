<script lang="ts">
	import type { RoomRow, TaskRow } from '$lib/types/models';

	import * as Card from '$lib/components/ui/card';

	import CreateTaskForm from './create-task-form.svelte';
	import TasksListItem from './tasks-list-item.svelte';

	type Props = {
		currentTask?: TaskRow;
		isModerator: boolean;
		onVoteTaskClick: (taskId: string) => void;
		room: RoomRow;
		tasks: TaskRow[];
	};

	const { currentTask, isModerator, onVoteTaskClick, room, tasks }: Props =
		$props();
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl" tag="h2">List of tasks</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if isModerator}
			<CreateTaskForm roomId={room.id} />
		{/if}
		<ul class="flex flex-col gap-2">
			{#each tasks as task}
				<TasksListItem
					isCurrent={task.id === currentTask?.id}
					{isModerator}
					onVoteClick={onVoteTaskClick}
					{task}
				/>
			{/each}
		</ul>
	</Card.Content>
</Card.Root>

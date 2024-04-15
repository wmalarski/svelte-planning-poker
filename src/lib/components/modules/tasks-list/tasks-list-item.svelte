<script lang="ts">
	import type { TaskRow } from '$lib/types/models';

	import { Button } from '$lib/components/ui/button';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import { ChevronsUpDown } from 'lucide-svelte';

	import RemoveTaskAlertDialog from '../task-controls/remove-task-alert-dialog.svelte';
	import ResetTaskAlertDialog from '../task-controls/reset-task-alert-dialog.svelte';
	import TaskStatusBadge from './task-status-badge.svelte';

	type Props = {
		isCurrent: boolean;
		isModerator: boolean;
		onVoteClick: (taskId: string) => void;
		task: TaskRow;
	};

	const { isCurrent, isModerator, onVoteClick, task }: Props = $props();

	const onVote = () => {
		onVoteClick(task.id);
	};
</script>

<li class="flex gap-2 p-3 border rounded-lg shadow-sm">
	<Collapsible.Root>
		<div class="flex flex-col items-start gap-2">
			<TaskStatusBadge {isCurrent} {task} />
			<strong class="text-lg">{task.content}</strong>
			<div class="flex gap-2">
				{#if isModerator}
					{#if !isCurrent && !task.finished}
						<Button on:click={onVote} type="button" variant="secondary">
							Vote
						</Button>
					{/if}
					<RemoveTaskAlertDialog taskId={task.id} />
					{#if task.finished}
						<ResetTaskAlertDialog taskId={task.id} />
					{/if}
				{/if}
				{#if task.finished}
					<Collapsible.Trigger asChild let:builder>
						<Button
							builders={[builder]}
							size="sm"
							type="button"
							variant="ghost"
						>
							<span>Show results</span>
							<ChevronsUpDown class="h-4 w-4" />
						</Button>
					</Collapsible.Trigger>
				{/if}
			</div>
		</div>
		<Collapsible.Content>
			<pre>{JSON.stringify(task.results, null, 2)}</pre>
		</Collapsible.Content>
	</Collapsible.Root>
</li>

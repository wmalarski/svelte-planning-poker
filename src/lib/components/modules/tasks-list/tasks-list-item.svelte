<script lang="ts">
	import type { TaskRow } from '$lib/types/models';

	import { Button } from '$lib/components/ui/button';

	import RemoveTaskForm from './remove-task-form.svelte';

	type Props = {
		isOwner: boolean;
		onVoteClick: (taskId: string) => void;
		task: TaskRow;
	};

	const { isOwner, onVoteClick, task }: Props = $props();

	const onVote = async () => {
		onVoteClick(task.id);
	};
</script>

<li class="flex flex-col gap-2 p-3">
	<span>{task.id}</span>
	<strong class="text-lg">{task.content}</strong>
	<span>{task.finished}</span>
	<pre>{JSON.stringify(task.results, null, 2)}</pre>
	{#if isOwner}
		<Button onclick={onVote} variant="secondary">Vote</Button>
		<RemoveTaskForm taskId={task.id} />
	{/if}
</li>

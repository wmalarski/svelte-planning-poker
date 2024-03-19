<script lang="ts">
	import { sessionContext } from '$lib/contexts/session';
	import type { TaskRow } from '$lib/types/models';

	import RemoveTaskForm from './remove-task-form.svelte';

	type Props = {
		task: TaskRow;
		isOwner: boolean;
	};

	const { task, isOwner }: Props = $props();
</script>

<li class="flex flex-col gap-2 p-3">
	<span>{task.id}</span>
	<strong class="text-lg">{task.content}</strong>
	<span>{task.finished}</span>
	<pre>{JSON.stringify(task.results, null, 2)}</pre>
	{#if isOwner}
		<RemoveTaskForm taskId={task.id} />
	{/if}
</li>

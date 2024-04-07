<script lang="ts">
	import type { TaskRow } from '$lib/types/models';

	import { Badge } from '$lib/components/ui/badge';

	type Props = {
		isCurrent: boolean;
		task: TaskRow;
	};

	const { isCurrent, task }: Props = $props();
</script>

<div class="flex gap-2">
	{#if task.finished}
		<Badge variant="secondary">Finished</Badge>
	{/if}
	{#if isCurrent}
		<Badge>Current</Badge>
	{:else if !task.finished}
		<Badge variant="outline">Pending</Badge>
	{/if}
</div>

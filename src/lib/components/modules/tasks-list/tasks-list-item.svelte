<script lang="ts">
	import type { TaskRow } from '$lib/types/models';

	import { Button } from '$lib/components/ui/button';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import { ChevronsUpDown } from 'lucide-svelte';

	import RemoveTaskAlertDialog from './remove-task-alert-dialog.svelte';

	type Props = {
		isOwner: boolean;
		onVoteClick: (taskId: string) => void;
		task: TaskRow;
	};

	const { isOwner, onVoteClick, task }: Props = $props();

	const onVote = () => {
		onVoteClick(task.id);
	};
</script>

<li class="flex gap-2 p-3">
	<Collapsible.Root>
		<div class="flex gap-2">
			<strong class="text-lg">{task.content}</strong>
			{#if isOwner}
				<Button onclick={onVote} variant="secondary">Vote</Button>
				<RemoveTaskAlertDialog taskId={task.id} />
			{/if}
			{#if task.finished}
				<Collapsible.Trigger asChild let:builder>
					<Button builders={[builder]} size="sm" variant="ghost">
						<span>Show results</span>
						<ChevronsUpDown class="h-4 w-4" />
					</Button>
				</Collapsible.Trigger>
			{/if}
		</div>
		<Collapsible.Content>
			<pre>{JSON.stringify(task.results, null, 2)}</pre>
		</Collapsible.Content>
	</Collapsible.Root>
</li>

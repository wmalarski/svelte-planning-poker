<script lang="ts">
	import type { TaskRow } from '$lib/types/models';

	import * as Collapsible from '$lib/components/ui/collapsible';
	import { Button } from '$lib/components/ui/button';

	import RemoveTaskForm from './remove-task-form.svelte';
	import { ChevronsUpDown } from 'lucide-svelte';

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
				<RemoveTaskForm taskId={task.id} />
			{/if}
			{#if task.finished}
				<Collapsible.Trigger asChild let:builder>
					<Button builders={[builder]} variant="ghost" size="sm">
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

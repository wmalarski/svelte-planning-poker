<script lang="ts">
	import type { TaskRow } from '$lib/types/models';

	import { Button } from '$lib/components/ui/button';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import { ChevronsUpDown } from 'lucide-svelte';

	import RemoveTaskAlertDialog from '../task-controls/remove-task-alert-dialog.svelte';
	import ResetTaskAlertDialog from '../task-controls/reset-task-alert-dialog.svelte';
	import { supabaseContext } from '$lib/contexts/supabase';
	import { resetTask } from '$lib/services/tasks';

	type Props = {
		isOwner: boolean;
		onVoteClick: (taskId: string) => void;
		task: TaskRow;
		isCurrent: boolean;
	};

	const { isOwner, isCurrent, onVoteClick, task }: Props = $props();

	const supabaseGetter = supabaseContext.get();

	const onVote = () => {
		onVoteClick(task.id);
	};

	const onResetVoteClick = async () => {
		await resetTask({
			supabase: supabaseGetter(),
			taskId: task.id,
		});
	};
</script>

<li class="flex gap-2 p-3">
	<Collapsible.Root>
		<div class="flex gap-2">
			<strong class="text-lg">{task.content}</strong>
			{#if isOwner}
				{#if !isCurrent && !task.finished}
					<Button type="button" onclick={onVote} variant="secondary">Vote</Button>
				{/if}
				<RemoveTaskAlertDialog taskId={task.id} />
			{/if}
			{#if task.finished}
				<ResetTaskAlertDialog taskId={task.id} />
				<Collapsible.Trigger asChild let:builder>
					<Button type="button" builders={[builder]} size="sm" variant="ghost">
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

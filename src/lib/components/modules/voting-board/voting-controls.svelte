<script lang="ts">
	import type { TaskRow } from '$lib/types/models';

	import { Button } from '$lib/components/ui/button';
	import { supabaseContext } from '$lib/contexts/supabase';
	import { updateTask } from '$lib/services/tasks';

	import RemoveTaskAlertDialog from '../task-controls/remove-task-alert-dialog.svelte';
	import ResetTaskAlertDialog from '../task-controls/reset-task-alert-dialog.svelte';

	type Props = {
		onNextVoteClick: () => void;
		task: TaskRow;
	};

	const { onNextVoteClick, task }: Props = $props();

	const supabaseGetter = supabaseContext.get();

	const onEndVoteClick = async () => {
		await updateTask({
			finished: true,
			supabase: supabaseGetter(),
			taskId: task.id
		});
	};
</script>

<div>
	{#if task.finished}
		<Button onclick={onNextVoteClick}>Next vote</Button>
		<ResetTaskAlertDialog taskId={task.id} />
	{:else}
		<Button onclick={onEndVoteClick}>End voting</Button>
	{/if}
	<RemoveTaskAlertDialog taskId={task.id} />
</div>

<script lang="ts">
	import type { TaskRow } from '$lib/types/models';

	import { Button } from '$lib/components/ui/button';
	import { supabaseContext } from '$lib/contexts/supabase';
	import { updateTask } from '$lib/services/tasks';

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

	const onResetVoteClick = async () => {
		await updateTask({
			finished: false,
			results: {},
			supabase: supabaseGetter(),
			taskId: task.id
		});
	};
</script>

<div>
	{#if task.finished}
		<Button onclick={onNextVoteClick}>Next vote</Button>
		<Button onclick={onResetVoteClick}>Reset vote</Button>
	{:else}
		<Button onclick={onEndVoteClick}>End voting</Button>
	{/if}
</div>

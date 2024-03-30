<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { supabaseContext } from '$lib/contexts/supabase';
	import { updateTask } from '$lib/services/tasks';
	import type { TaskRow } from '$lib/types/models';

	type Props = {
		task: TaskRow;
		onNextVoteClick: () => void;
	};

	const { task, onNextVoteClick }: Props = $props();

	const supabaseGetter = supabaseContext.get();

	const onEndVoteClick = () => {
		updateTask({
			supabase: supabaseGetter(),
			taskId: task.id,
			finished: true
		});
	};

	const onResetVoteClick = () => {
		updateTask({
			supabase: supabaseGetter(),
			taskId: task.id,
			finished: false,
			results: {}
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

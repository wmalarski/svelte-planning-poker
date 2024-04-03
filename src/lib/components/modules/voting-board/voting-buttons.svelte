<script lang="ts">
	import type { PlayerState, TaskRow } from '$lib/types/models';

	import { Button } from '$lib/components/ui/button';
	import { supabaseContext } from '$lib/contexts/supabase';
	import { voteOnTask } from '$lib/services/tasks';

	type Props = {
		currentVote?: string;
		player: PlayerState;
		task: TaskRow;
		onVoteSubmit: (vote: string) => void;
	};

	const { currentVote, player, task, onVoteSubmit }: Props = $props();

	const supabaseGetter = supabaseContext.get();

	const cards = ['1', '2', '3', '5', '8', '13', '21', '?'];

	const onClick = (card: string) => {
		return async () => {
			onVoteSubmit(card);
			await voteOnTask({
				name: player.name,
				playerId: player.id,
				supabase: supabaseGetter(),
				taskId: task.id,
				value: card
			});
		};
	};
</script>

<ul class="flex gap-2">
	{#each cards as card}
		<li>
			<Button
				disabled={task.finished}
				variant={currentVote === card ? 'default' : 'secondary'}
				onclick={onClick(card)}
			>
				{card}
			</Button>
		</li>
	{/each}
</ul>

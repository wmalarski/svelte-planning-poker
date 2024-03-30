<script lang="ts">
	import type { PlayerState } from '$lib/server/players';
	import type { TaskResults, TaskRow } from '$lib/types/models';

	import { Button } from '$lib/components/ui/button';
	import { supabaseContext } from '$lib/contexts/supabase';
	import { voteOnTask } from '$lib/services/tasks';

	type Props = {
		player: PlayerState;
		task: TaskRow;
	};

	const { player, task }: Props = $props();

	const supabaseGetter = supabaseContext.get();

	const cards = ['1', '2', '3', '5', '8', '13', '21', '?'];

	const onClick = (card: string) => {
		return async () => {
			await voteOnTask({
				current: (task.results as TaskResults) ?? {},
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
			<Button onclick={onClick(card)}>
				{card}
			</Button>
		</li>
	{/each}
</ul>

<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { PlayerState } from '$lib/services/players';
	import type { TaskResults, TaskRow } from '$lib/types/models';
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
			const result = await voteOnTask({
				current: task.results as TaskResults ?? {},
				name: player.name,
				playerId: player.id,
				supabase: supabaseGetter(),
				taskId: task.id,
				value: card
			});
		};
	};
</script>

<ul>
	{#each cards as card}
		<li>
			<Button onclick={onClick(card)}>
				{card}
			</Button>
		</li>
	{/each}
</ul>

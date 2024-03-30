<script lang="ts">
	import type { PlayerState } from '$lib/services/players';
	import type { RoomRow, TaskRow } from '$lib/types/models';

	import { Button } from '$lib/components/ui/button';
	import { supabaseContext } from '$lib/contexts/supabase';
	import { voteOnTask } from '$lib/services/tasks'

	type Props = {
		player: PlayerState;
		room: RoomRow;
		task: TaskRow;
	};
	
	const { task, player }: Props = $props();

	const supabaseGetter = supabaseContext.get();
	
	const cards = ['1', '2', '3', '5', '8', '13', '21', '?'];

	const onClick = (card: string) => {
		return () => {
			voteOnTask({
				name: player.name,
				playerId: player.id,
				supabase: supabaseGetter(),
				taskId: task.id,
				value: card,
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

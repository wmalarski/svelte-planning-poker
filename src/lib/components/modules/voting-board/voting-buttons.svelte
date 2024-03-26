<script lang="ts">
	import type { RoomRow, TaskRow } from '$lib/types/models';
	import type { PlayerState } from '$lib/services/players';
	import { sessionContext } from '$lib/contexts/session';
	import { Button } from '$lib/components/ui/button';

	type Props = {
		room: RoomRow;
		task: TaskRow;
		player: PlayerState;
	};

	const { room, task }: Props = $props();

	const session = sessionContext.get();

	const cards = ['1', '2', '3', '5', '8', '13', '21', '?']

	const onClick = (card: string) => {
		return () => {
			//
		}
	} 
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

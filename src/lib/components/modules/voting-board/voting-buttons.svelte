<script lang="ts">
	import type { PlayerState } from '$lib/services/players';
	import type { RoomRow, TaskRow } from '$lib/types/models';

	import { Button } from '$lib/components/ui/button';

	type Props = {
		onVoteClick: (vote: string) => void;
		player: PlayerState;
		room: RoomRow;
		task: TaskRow;
	};

	const { onVoteClick }: Props = $props();

	const cards = ['1', '2', '3', '5', '8', '13', '21', '?'];

	const onClick = (card: string) => {
		return () => {
			onVoteClick(card);
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

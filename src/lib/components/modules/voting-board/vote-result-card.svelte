<script lang="ts">
	import type { PlayerState, RoomRow, TaskVote } from '$lib/types/models';

	import { Badge } from '$lib/components/ui/badge';

	type Props = {
		currentPlayer: PlayerState;
		finished: boolean;
		player: PlayerState;
		room: RoomRow;
		vote?: TaskVote;
	};

	const { currentPlayer, finished, player, room, vote }: Props = $props();
</script>

<li class="flex flex-col gap-2 p-3 border rounded-lg shadow-sm">
	<span>
		{#if player.spectator}
			Spectator
		{:else if finished && vote}
			{vote.value}
		{:else if finished}
			Vote skipped
		{:else if vote}
			Voted
		{:else}
			Waiting for vote
		{/if}
	</span>
	<div>
		<b>{player.name}</b>
		{#if player.id === currentPlayer.id}
			<Badge>Me</Badge>
		{/if}
		{#if player.id === room.owner_id}
			<Badge variant="secondary">Owner</Badge>
		{:else if room.moderators.includes(player.id)}
			<Badge variant="secondary">Moderator</Badge>
		{:else}
			<Badge variant="secondary">Player</Badge>
		{/if}
	</div>
</li>

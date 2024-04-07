import type { PlayerState } from '$lib/types/models';

import { supabaseContext } from '$lib/contexts/supabase';
import { type UpdatePlayerArgs, updatePlayer } from '$lib/services/players';
import {
	REALTIME_LISTEN_TYPES,
	REALTIME_PRESENCE_LISTEN_EVENTS,
	REALTIME_SUBSCRIBE_STATES
} from '@supabase/supabase-js';

type CreateTasksArgs = {
	initialPlayer: PlayerState;
	roomId: string;
};

const PRESENCE_CHANNEL_NAME = 'playerPresence';

export const createPlayersState = ({
	initialPlayer,
	roomId
}: CreateTasksArgs) => {
	let players = $state<PlayerState[]>([]);

	let updateJoinPayload = $state<(player: PlayerState) => void>();

	const supabaseGetter = supabaseContext.get();

	$effect(() => {
		console.log('initialPlayer', initialPlayer);

		const supabase = supabaseGetter();
		const channelName = `${PRESENCE_CHANNEL_NAME}:${roomId}`;

		const channel = supabase
			.channel(channelName, { config: { presence: { key: roomId } } })
			.on(
				REALTIME_LISTEN_TYPES.PRESENCE,
				{ event: REALTIME_PRESENCE_LISTEN_EVENTS.SYNC },
				() => {
					console.log('SYNC');
					const newState = channel.presenceState<PlayerState>();
					players = newState[roomId] ?? [];
				}
			)
			.on<PlayerState>(
				REALTIME_LISTEN_TYPES.PRESENCE,
				{ event: REALTIME_PRESENCE_LISTEN_EVENTS.JOIN },
				({ newPresences }) => {
					console.log('JOIN');
					players.push(...newPresences);
				}
			)
			.on(
				REALTIME_LISTEN_TYPES.PRESENCE,
				{ event: REALTIME_PRESENCE_LISTEN_EVENTS.LEAVE },
				({ leftPresences }) => {
					console.log('LEAVE');
					const leftIds = leftPresences.map((presence) => presence.id);
					players = players.filter((player) => !leftIds.includes(player.id));
				}
			)
			.subscribe(async (status) => {
				if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
					await channel.track(initialPlayer);

					updateJoinPayload = channel.updateJoinPayload;
				}
			});

		return () => {
			const untrackPresence = async () => {
				await channel.unsubscribe();
				await channel.untrack();
				await supabase.removeChannel(channel);
			};
			untrackPresence();
		};
	});

	return {
		get players() {
			return players;
		},
		async updatePlayer(player: UpdatePlayerArgs) {
			await updatePlayer(player);

			updateJoinPayload?.({ ...player, id: initialPlayer.id });
		}
	};
};

import type { playerCookieSchema } from '$lib/services/players';
import type { Output } from 'valibot';

import { supabaseContext } from '$lib/contexts/supabase';
import {
	REALTIME_LISTEN_TYPES,
	REALTIME_PRESENCE_LISTEN_EVENTS,
	REALTIME_SUBSCRIBE_STATES
} from '@supabase/supabase-js';

export type PlayerState = Output<typeof playerCookieSchema>;

type CreateTasksArgs = {
	currentPlayer: PlayerState;
	roomId: string;
};

const PRESENCE_CHANNEL_NAME = 'playerPresence';

export const createPlayersState = ({
	currentPlayer,
	roomId
}: CreateTasksArgs) => {
	let players = $state<PlayerState[]>([]);

	const supabaseGetter = supabaseContext.get();

	$effect(() => {
		const supabase = supabaseGetter();
		const channelName = `${PRESENCE_CHANNEL_NAME}:${roomId}`;

		const channel = supabase
			.channel(channelName, { config: { presence: { key: roomId } } })
			.on(
				REALTIME_LISTEN_TYPES.PRESENCE,
				{ event: REALTIME_PRESENCE_LISTEN_EVENTS.SYNC },
				() => {
					const newState = channel.presenceState<PlayerState>();
					players = newState[roomId] ?? [];
				}
			)
			.on<PlayerState>(
				REALTIME_LISTEN_TYPES.PRESENCE,
				{ event: REALTIME_PRESENCE_LISTEN_EVENTS.JOIN },
				({ newPresences }) => {
					players.push(...newPresences);
				}
			)
			.on(
				REALTIME_LISTEN_TYPES.PRESENCE,
				{ event: REALTIME_PRESENCE_LISTEN_EVENTS.LEAVE },
				({ leftPresences }) => {
					const leftIds = leftPresences.map((presence) => presence.id);
					players = players.filter((player) => !leftIds.includes(player.id));
				}
			)
			.subscribe(async (status) => {
				if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
					await channel.track(currentPlayer);
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
		}
	};
};

import { supabaseContext } from '$lib/contexts/supabase';
import {
	REALTIME_LISTEN_TYPES,
	REALTIME_SUBSCRIBE_STATES,
	type RealtimeChannelSendResponse
} from '@supabase/supabase-js';

const VOTING_CHANNEL_NAME = 'voting';
const CHANGE_CURRENT_TASK_EVENT_NAME = 'voting:changeCurrentTask';
const STOP_VOTING_EVENT_NAME = 'voting:stopVoting';
const START_VOTING_EVENT_NAME = 'voting:startVoting';

type ChangeCurrentTaskPayload = {
	id: null | string;
};

type VotingEvent =
	| {
			event: typeof CHANGE_CURRENT_TASK_EVENT_NAME;
			payload: { id: null | string };
	  }
	| {
			event: typeof START_VOTING_EVENT_NAME;
	  }
	| {
			event: typeof STOP_VOTING_EVENT_NAME;
	  };

type CreateVotingArgs = {
	initialCurrentTaskId: null | string;
	roomId: string;
};

export const createVotingState = ({
	initialCurrentTaskId,
	roomId
}: CreateVotingArgs) => {
	let taskId = $state(initialCurrentTaskId);

	let isVoting = $state(false);

	let sendEvent =
		$state<(args: VotingEvent) => Promise<RealtimeChannelSendResponse>>();

	const supabaseGetter = supabaseContext.get();

	$effect(() => {
		const supabase = supabaseGetter();
		const channelName = `${VOTING_CHANNEL_NAME}:${roomId}`;

		const channel = supabase.channel(channelName);

		channel
			.on<ChangeCurrentTaskPayload>(
				REALTIME_LISTEN_TYPES.BROADCAST,
				{ event: CHANGE_CURRENT_TASK_EVENT_NAME },
				({ payload }) => {
					taskId = payload.id;
				}
			)
			.on<ChangeCurrentTaskPayload>(
				REALTIME_LISTEN_TYPES.BROADCAST,
				{ event: START_VOTING_EVENT_NAME },
				() => {
					isVoting = true;
				}
			)
			.on<ChangeCurrentTaskPayload>(
				REALTIME_LISTEN_TYPES.BROADCAST,
				{ event: STOP_VOTING_EVENT_NAME },
				() => {
					isVoting = false;
				}
			)
			.subscribe((status) => {
				if (status !== REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
					return;
				}

				sendEvent = (args) => {
					return channel.send({
						...args,
						type: REALTIME_LISTEN_TYPES.BROADCAST
					});
				};
			});

		return () => {
			supabase.removeChannel(channel);
		};
	});

	return {
		get currentTaskId() {
			return taskId;
		},
		set currentTaskId(nextTaskId: null | string) {
			taskId = nextTaskId;

			sendEvent?.({
				event: CHANGE_CURRENT_TASK_EVENT_NAME,
				payload: { id: taskId }
			});
		},
		get isVoting() {
			return isVoting;
		},
		set isVoting(nextIsVoting: boolean) {
			isVoting = nextIsVoting;

			sendEvent?.({
				event: nextIsVoting ? START_VOTING_EVENT_NAME : STOP_VOTING_EVENT_NAME
			});
		}
	};
};

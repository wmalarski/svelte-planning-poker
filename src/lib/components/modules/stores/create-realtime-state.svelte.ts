import type { RoomRow, TaskRow } from '$lib/types/models';

import { supabaseContext } from '$lib/contexts/supabase';
import { updateRoom } from '$lib/services/rooms';
import {
	REALTIME_LISTEN_TYPES,
	REALTIME_POSTGRES_CHANGES_LISTEN_EVENT
} from '@supabase/supabase-js';

type CreateTasksArgs = {
	initialRoom: RoomRow;
	initialTasks: TaskRow[];
};

const POSTGRES_CHANGES_CHANNEL_NAME = 'postgres_changes';

export const createRealtimeState = ({
	initialRoom,
	initialTasks
}: CreateTasksArgs) => {
	const tasks = $state(initialTasks);

	let room = $state(initialRoom);

	const supabaseGetter = supabaseContext.get();

	$effect(() => {
		const supabase = supabaseGetter();

		const options = {
			filter: `room_id=eq.${room.id}`,
			schema: 'public',
			table: 'tasks'
		};

		const channel = supabase
			.channel(POSTGRES_CHANGES_CHANNEL_NAME)
			.on(
				REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
				{ event: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.DELETE, ...options },
				(payload) => {
					const index = tasks.findIndex((task) => task.id === payload.old.id);

					if (index >= 0) {
						tasks.splice(index, 1);
					}
				}
			)
			.on<TaskRow>(
				REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
				{ event: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.INSERT, ...options },
				(payload) => {
					tasks.push(payload.new);
				}
			)
			.on<TaskRow>(
				REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
				{ event: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.UPDATE, ...options },
				(payload) => {
					const index = tasks.findIndex((task) => task.id === payload.old.id);
					if (index >= 0) {
						tasks.splice(index, 1, payload.new);
					}
				}
			)
			.on<RoomRow>(
				REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
				{
					event: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.UPDATE,
					filter: `id=eq.${room.id}`,
					schema: 'public',
					table: 'rooms'
				},
				(payload) => {
					room = payload.new;
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	});

	// window.addEventListener('visibilitychange', handleFocus, false)
	// window.addEventListener('focus', handleFocus, false)

	const currentTask = $derived.by(() => {
		const currentTaskId = room.current_task_id;
		return tasks.find((task) => task.id === currentTaskId);
	});

	return {
		get currentTask() {
			return currentTask;
		},
		set currentTaskId(nextTaskId: null | string) {
			updateRoom({
				currentTaskId: nextTaskId,
				roomId: room.id,
				supabase: supabaseGetter()
			});
		},
		nextTask() {
			const currentTaskId = room.current_task_id;
			if (!currentTaskId) {
				return;
			}

			const currentIndex = tasks.findIndex((task) => task.id === currentTaskId);
			if (currentIndex < 0) {
				return;
			}

			const newTask = tasks[currentIndex + 1];
			if (!newTask) {
				return;
			}

			updateRoom({
				currentTaskId: newTask.id,
				roomId: room.id,
				supabase: supabaseGetter()
			});
		},
		get room() {
			return room;
		},
		get tasks() {
			return tasks;
		}
	};
};

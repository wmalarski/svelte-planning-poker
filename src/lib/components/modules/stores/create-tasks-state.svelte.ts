import type { TaskRow } from '$lib/types/models';

import { supabaseContext } from '$lib/contexts/supabase';
import {
	REALTIME_LISTEN_TYPES,
	REALTIME_POSTGRES_CHANGES_LISTEN_EVENT
} from '@supabase/supabase-js';

type CreateTasksArgs = {
	initialTasks: TaskRow[];
	roomId: string;
};

const TASKS_UPDATE_CHANNEL_NAME = 'tasksUpdate';

export const createTasksState = ({ initialTasks, roomId }: CreateTasksArgs) => {
	const tasks = $state(initialTasks);

	const supabaseGetter = supabaseContext.get();

	$effect(() => {
		const supabase = supabaseGetter();

		const options = {
			filter: `room_id=eq.${roomId}`,
			schema: 'public',
			table: 'tasks'
		};

		const channel = supabase
			.channel(TASKS_UPDATE_CHANNEL_NAME)
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
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	});

	// window.addEventListener('visibilitychange', handleFocus, false)
	// window.addEventListener('focus', handleFocus, false)

	return {
		nextTask(taskId: string | undefined) {
			if (!taskId) {
				return null;
			}

			const currentIndex = tasks.findIndex((task) => task.id === taskId);
			if (currentIndex < 0) {
				return null;
			}

			return tasks[currentIndex] ?? null;
		},
		get tasks() {
			return tasks;
		}
	};
};

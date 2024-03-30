import type { TaskResults } from '$lib/types/models';

import type { WithSupabase } from './types';

type SelectTasksArgs = WithSupabase<{
	roomId: string;
}>;

export const selectTasks = async ({ roomId, supabase }: SelectTasksArgs) => {
	const tasksResult = await supabase
		.from('tasks')
		.select()
		.eq('room_id', roomId)
		.range(0, 100);

	return tasksResult.data || [];
};

type InsertTaskArgs = WithSupabase<{
	content: string;
	roomId: string;
}>;

export const insertTask = ({ content, roomId, supabase }: InsertTaskArgs) => {
	return supabase
		.from('tasks')
		.insert({ content, finished: false, room_id: roomId })
		.select()
		.single();
};

type DeleteTaskArgs = WithSupabase<{
	taskId: string;
}>;

export const deleteTask = ({ supabase, taskId }: DeleteTaskArgs) => {
	return supabase.from('tasks').delete().eq('id', taskId);
};

type UpdateTaskArgs = WithSupabase<{
	content?: string;
	finished?: boolean;
	order?: number;
	results?: TaskResults;
	taskId: string;
}>;

export const updateTask = ({
	content,
	finished,
	order,
	results,
	supabase,
	taskId
}: UpdateTaskArgs) => {
	return supabase
		.from('tasks')
		.update({ content, finished, order, results })
		.eq('id', taskId)
		.select();
};

type VoteOnTaskArgs = WithSupabase<{
	current: TaskResults;
	name: string;
	playerId: string;
	taskId: string;
	value: string;
}>;

export const voteOnTask = ({
	current,
	name,
	playerId,
	supabase,
	taskId,
	value
}: VoteOnTaskArgs) => {
	const taskVote = { name, playerId, value };

	return supabase
		.from('tasks')
		.update({ results: { ...current, [playerId]: taskVote } })
		.eq('id', taskId)
		.select();
};

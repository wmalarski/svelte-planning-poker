import type { WithSupabase } from './types';

type SelectTasksArgs = WithSupabase<{
	roomId: string;
}>;

export const selectTasks = async ({ roomId, supabase }: SelectTasksArgs) => {
	const tasksResult = await supabase.from('tasks').select().eq('room_id', roomId).range(0, 100);

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

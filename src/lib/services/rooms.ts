import type { Json } from '$lib/types/supabase';

import type { WithSupabase } from './types';

type SelectRoomArgs = WithSupabase<{
	roomId: string;
}>;

export const selectRoom = ({ roomId, supabase }: SelectRoomArgs) => {
	return supabase.from('rooms').select().eq('id', roomId).single();
};

type SelectRoomsArgs = WithSupabase<{
	ownerId: string;
}>;

export const selectsRoom = ({ ownerId, supabase }: SelectRoomsArgs) => {
	return supabase.from('rooms').select().eq('owner_id', ownerId).range(0, 100);
};

type InsertRoomArgs = WithSupabase<{
	description: string;
	name: string;
	playerId: string;
}>;

export const insertRoom = ({
	description,
	name,
	playerId,
	supabase
}: InsertRoomArgs) => {
	return supabase
		.from('rooms')
		.insert({ config: {}, description, moderators: [playerId], name })
		.select()
		.single();
};

type UpdateTaskArgs = WithSupabase<{
	config?: Json;
	currentTaskId?: null | string;
	description?: string;
	moderators?: string[];
	name?: string;
	roomId: string;
}>;

export const updateRoom = ({
	config,
	currentTaskId,
	description,
	moderators,
	name,
	roomId,
	supabase
}: UpdateTaskArgs) => {
	return supabase
		.from('rooms')
		.update({
			config,
			current_task_id: currentTaskId,
			description,
			moderators,
			name
		})
		.eq('id', roomId)
		.select();
};

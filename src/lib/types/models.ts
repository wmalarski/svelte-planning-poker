import type { Database } from './supabase';

export type RoomRow = Database['public']['Tables']['rooms']['Row'];
export type TaskRow = Database['public']['Tables']['tasks']['Row'];

export type TaskVote = {
	name: string;
	playerId: string;
	value: string;
};

export type TaskResults = Record<string, TaskVote>;

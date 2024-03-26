import type { Database } from './supabase';

export type RoomRow = Database['public']['Tables']['rooms']['Row'];
export type TaskRow = Database['public']['Tables']['tasks']['Row'];

export type TaskVote = {
	id: string;
	playerId: string;
	playerName: string;
	vote: string;
};

export type TaskResults = {
	votes: TaskVote[];
};

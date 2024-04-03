import {
	type Output,
	boolean,
	coerce,
	object,
	optional,
	string
} from 'valibot';

import type { Database } from './supabase';

export type RoomRow = Database['public']['Tables']['rooms']['Row'];
export type TaskRow = Database['public']['Tables']['tasks']['Row'];

export type TaskVote = {
	name: string;
	playerId: string;
	value: string;
};

export type TaskResults = Record<string, TaskVote>;

export const playerCookieSchema = object({
	id: optional(string(), crypto.randomUUID()),
	name: string(),
	spectator: optional(coerce(boolean(), Boolean), false)
});

export type PlayerState = Output<typeof playerCookieSchema>;

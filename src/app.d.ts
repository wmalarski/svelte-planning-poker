/* eslint-disable @typescript-eslint/consistent-type-definitions */
// See https://kit.svelte.dev/docs/types#app

import type { Session, SupabaseClient } from '@supabase/supabase-js';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			getSession: () => Promise<Session | null>;
			supabase: SupabaseClient;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

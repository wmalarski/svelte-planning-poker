import { paths } from '$lib/utils/paths';
import { redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals: { supabase } }) => {
	await supabase.auth.signOut();

	return redirect(302, paths.home);
};

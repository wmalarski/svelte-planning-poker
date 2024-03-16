import { paths } from '$lib/utils/paths';
import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { supabase }, params }) => {
	const result = await supabase.from('rooms').select().eq('id', params.roomId).single();

	if (result.error) {
		return redirect(302, paths.notFound);
	}

	return { room: result.data };
};

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getUser } }) => {
	return { user: await getUser() };
};

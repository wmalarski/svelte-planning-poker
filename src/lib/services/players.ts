import { paths } from '$lib/utils/paths';

type UpdatePlayerArgs = {
	name: string;
	spectator: boolean;
};

export const updatePlayer = (args: UpdatePlayerArgs) => {
	return fetch(paths.playerApi, {
		body: JSON.stringify(args),
		method: 'post'
	});
};

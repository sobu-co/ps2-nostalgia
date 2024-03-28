import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	return {
		accessToken: cookies.get('accessToken')
	};
}) satisfies PageServerLoad;

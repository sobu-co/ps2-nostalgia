import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	return {
		accessCode: cookies.get('accessToken')
	};
}) satisfies PageServerLoad;

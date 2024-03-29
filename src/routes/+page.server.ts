import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const accessCode = cookies.get('accessToken');

	return { accessCode };
}) satisfies PageServerLoad;

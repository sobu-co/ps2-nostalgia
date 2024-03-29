import type { Actions, PageServerLoad } from './$types';
import accessCodes from '$lib/access_codes.json';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const { accessToken } = Object.fromEntries(await request.formData()) as {
            accessToken: string,
        }

        const normalizedCodes = accessCodes.map((code) => code.toLowerCase());

        const validCode = accessToken && normalizedCodes.includes(accessToken.toLowerCase());

        if (validCode) {
            cookies.set('accessToken', accessToken, {
                secure: true,
                httpOnly: true,
                path: '/'
            });

            redirect(303, "/");
        }

        return fail(500, { error: 'UH OH! SEEMS LIKE THAT ACCESS CODE IS INVALID' })
    },
}

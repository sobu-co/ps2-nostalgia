import type { Actions, PageServerLoad } from './$types';
import accessCodes from '$lib/access_codes.json';
import { fail, json, redirect } from '@sveltejs/kit';

export const load = (async ({ cookies }) => {
    const accessCode = cookies.get('accessToken');

    return { accessCode };
}) satisfies PageServerLoad;

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

        return fail(500, { error: 'woopsie daisie!! seems like that access code is invalid' })
    },
}

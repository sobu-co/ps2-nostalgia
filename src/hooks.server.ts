import { redirect, type Handle } from "@sveltejs/kit";
import accessCodes from '$lib/access_codes.json';

export const handle: Handle = async ({ event, resolve }) => {

    const isPayToWinPage = event.url.pathname.startsWith('/pay-to-win');

    const accessCode = event.cookies.get('accessToken');
    const normalizedCodes = accessCodes.map((code) => code.toLowerCase());

    const validCode = accessCode && normalizedCodes.includes(accessCode.toLowerCase());

    if (!isPayToWinPage) {
        if (!validCode) {
            throw redirect(301, `/pay-to-win`);
        }
    }

    return await resolve(event);
}
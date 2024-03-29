import { redirect, type Handle } from "@sveltejs/kit";
import accessCodes from '$lib/access_codes.json';

export const handle: Handle = async ({ event, resolve }) => {
    const isPaywallPage = event.url.pathname.startsWith('/pay-to-win');

    // if it is their first image generation direct them to home page
    const visitId = event.cookies.get('ps_vid');
    if (!visitId && isPaywallPage) {
        redirect(303, "/");
    }
    // allow first generation for users
    if (!visitId) {
        return await resolve(event);
    }

    const accessCode = event.cookies.get('accessToken');
    const normalizedCodes = accessCodes.map((code) => code.toLowerCase());

    const validCode = accessCode && normalizedCodes.includes(accessCode.toLowerCase());

    if (!isPaywallPage && !validCode) {
        throw redirect(301, `/pay-to-win`);
    }

    return await resolve(event);
}
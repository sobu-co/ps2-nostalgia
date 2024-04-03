import { redirect, type Handle } from "@sveltejs/kit";
import { accessAllowed } from "$lib/utils/cookieUtils";

export const handle: Handle = async ({ event, resolve }) => {
    const isPaywallPage = event.url.pathname.startsWith('/pay-to-win');

    if (accessAllowed(event.cookies)) {
        // if access is allowed redirect from paywall to home
        if (isPaywallPage) {
            redirect(303, "/");
        }
    } else {
        if (!isPaywallPage) {
            redirect(301, `/pay-to-win`);
        }
    }

    return await resolve(event);
}
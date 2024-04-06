import { accessAllowed } from "$lib/utils/cookieUtils";
import { redirect } from "@sveltejs/kit";

export function load({ cookies }) {
    if (!accessAllowed(cookies)) {
        redirect(301, `/pay-to-win`);
    }

    return {};
}
import type { Cookies } from "@sveltejs/kit";
import accessCodes from '$lib/access_codes.json';

export function getNumGeneratedFromCookies(cookies: Cookies) {
    const visitId = cookies.get('ps_vid');
    const numGeneratedFromCookie = visitId?.split(":")[1];
    return numGeneratedFromCookie ? +numGeneratedFromCookie : 0;
}

export function validAccessCodeInCookies(cookies: Cookies) {
    const accessCode = cookies.get('accessToken');
    if (!accessCode) return false;

    const normalizedCodes = accessCodes.map((code) => code.toLowerCase());
    return normalizedCodes.includes(accessCode.toLowerCase());
}

export function accessAllowed(cookies: Cookies) {
    return getNumGeneratedFromCookies(cookies) < 3 || validAccessCodeInCookies(cookies);
}
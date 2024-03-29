import { REPLICATE_API_KEY, VENMO_ACCOUNT } from '$env/static/private';
import accessCodes from '$lib/access_codes.json';
import { json, redirect } from '@sveltejs/kit';
import Replicate from 'replicate';

export const POST = async ({ request, cookies }) => {
	const body = await request.json();
	const imageData: string = body.imageData;
	const accessToken: string = body.accessToken;

	const visitId = cookies.get('ps_vid');
	const normalizedCodes = accessCodes.map((code) => code.toLowerCase());
	const validCode = accessToken && normalizedCodes.includes(accessToken.toLowerCase());

	// if they've already visited, and don't have a valid accessToken
	// this should not be reachable
	if (visitId && !validCode) {
		return json({ error: "UH OH SOMETHING WENT TERRIBLY WRONG" });
	}

	const replicate = new Replicate({ auth: REPLICATE_API_KEY });
	try {
		const output = (await replicate.run(
			'fofr/face-to-many:35cea9c3164d9fb7fbd48b51503eabdb39c9d04fdaef9a68f368bed8087ec5f9',
			{
				input: {
					image: imageData,
					style: 'Video game',
					prompt: 'ps1, ps2, gamecube, pixelated, sims gta style',
					denoising_strength: 0.45
				}
			}
		)) as string[];

		if (output && output[0]) {
			// if they successfuly made an image, save a visitId in cookies
			// so that we can paywall next attempt
			cookies.set('ps_vid', generateVisitId(), {
				secure: true,
				httpOnly: true,
				path: '/'
			});

			const generatedImgUri = output[0];
			return json({ generatedImgUri });
		}
	} catch (e) {
		return json({ error: "SOMETHING WENT WRONG, TRY AGAIN IN A BIT" });
	}

	return json({ error: 'WOOPSIE DAISIE!! TRY A DIFFERENT IMAGE' });
};

function generateVisitId(): string {
	let result = '';
	const charset = 'abcdefghijklmnopqrstuvwxyz1234567890';
	for (let i = 0; i < 10; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		result += charset.charAt(randomIndex);
	}
	return result;
}

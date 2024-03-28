import { REPLICATE_API_KEY, VENMO_ACCOUNT } from '$env/static/private';
import accessCodes from '$lib/access_codes.json';
import { json } from '@sveltejs/kit';
import Replicate from 'replicate';

export const POST = async ({ request }) => {
	const body = await request.json();
	const imageData: string = body.imageData;
	const accessToken: string = body.accessToken;
	const normalizedCodes = accessCodes.map((code) => code.toLowerCase());

	if (!accessToken || !normalizedCodes.includes(accessToken.toLowerCase())) {
		return json({
			error: `oh nooo!! your access token is invalid`
		});
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
			const generatedImgUri = output[0];

			return json({ generatedImgUri });
		}
	} catch (e) {
		return json({ error: "UNDER MAINTENANCE, WE'LL BE WITH YOU IN A BIT" });
	}

	return json({ error: 'woopsie daisie!! try a different image' });
};

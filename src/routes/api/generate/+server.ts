import { REPLICATE_API_KEY } from "$env/static/private";
import { json } from '@sveltejs/kit';
import Replicate from "replicate";

export const POST = async ({ request }) => {

	const body = await request.json();
	const imageData: string = body.imageData;

	const replicate = new Replicate({ auth: REPLICATE_API_KEY });

	const output = await replicate.run(
		'fofr/face-to-many:35cea9c3164d9fb7fbd48b51503eabdb39c9d04fdaef9a68f368bed8087ec5f9',
		{
			input: {
				image: imageData,
				style: 'Video game',
				prompt: 'ps1, ps2, gamecube, pixelated, sims gta style',
				denoising_strength: 0.45
			}
		}
	) as string[];

	if (output && output[0]) {
		const generatedImgUri = output[0];

		return json({ generatedImgUri });
	}

	return json({ error: "woopsie daisie!! try a different image" });
}
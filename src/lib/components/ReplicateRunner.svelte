<script lang="ts">
	import Replicate from 'replicate';

	export let imageData: string | null = null;

	let loadingText: string | null = null;
	let generatedImageUri: string | null = null;

	let apiKey = 'r8_Cd1u5Sb61ecwrIJw6uw51e8bElDBYa23HZQVs';
	const replicate = new Replicate({ auth: apiKey });

	const runModel = async () => {
		loadingText = 'Reaching out to Rockstar games ...... one sec';
		const output = await replicate.run(
			'fofr/face-to-many:35cea9c3164d9fb7fbd48b51503eabdb39c9d04fdaef9a68f368bed8087ec5f9',
			{
				input: {
					image: imageData,
					style: 'Video game',
					prompt: 'ps2 gamecube, pixelated, sims gta style',
					denoising_strength: 0.4
				}
			}
		);
		console.log('model output', output);
		generatedImageUri = output.toString();
		loadingText = null;
	};
</script>

{#if imageData}
	<div class="flex flex-col gap-2">
		<button
			class="rounded-xl hover:bg-black hover:text-white border px-2"
			on:click|preventDefault={runModel}
		>
			ps2 time
		</button>
		{#if loadingText}
			<div>{loadingText}</div>
		{/if}
		{#if generatedImageUri}
			<div>Generated: {generatedImageUri}</div>
		{/if}
	</div>
{/if}

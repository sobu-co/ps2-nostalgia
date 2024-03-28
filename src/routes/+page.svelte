<script lang="ts">
	import ImageUploader from '$lib/components/ImageUploader.svelte';
	import PixelatedPreview from '$lib/components/PixelatedPreview.svelte';
	import Button from '$lib/components/Button.svelte';
	import Generating from '$lib/components/Generating.svelte';
	import { saveImage } from '$lib/utils/imageUtils';

	export let data;

	let uploadedImage: string | null = null;

	let pixelatedImage: string | null = null;
	let pixelSize = 50;

	let generatedImage: string | null = null;
	let generatedError: string | null = null;
	let focusGenerated = true;

	let accessToken = data.accessCode;
	let generatingStatus: 'PRELOAD' | 'SUCCESS' | 'FAILED' | 'LOADING' = 'PRELOAD';

	function restart() {
		uploadedImage = null;

		pixelatedImage = null;
		pixelSize = 50;

		generatedImage = null;
		generatedError = null;
		focusGenerated = true;

		generatingStatus = 'PRELOAD';
	}

	function save() {
		generatedImage && saveImage(generatedImage);
	}

	function imageUploaded(event: CustomEvent<any>) {
		uploadedImage = event.detail.imageData;
		generatedError = null; // empty out potential old error

		runModel();
	}

	const runModel = async () => {
		for (let i = 0; i < 10; i++) {
			setTimeout(() => (pixelSize = 50 - i * 3), i * 3000);
		}
		// add a tiny delay to prevent flicker if access code is incorrect
		const loadingTimeout = setTimeout(() => (generatingStatus = 'LOADING'), 500);

		const response = await fetch(`/api/generate`, {
			method: 'POST',
			body: JSON.stringify({ imageData: uploadedImage, accessToken })
		});

		const json = await response.json();
		clearTimeout(loadingTimeout);

		if (json.error) {
			restart();
			generatedError = json.error;
		} else {
			generatedImage = json.generatedImgUri;
			generatingStatus = 'SUCCESS';
		}

		// setTimeout(
		// 	() =>
		// 		(generatedImage =
		// 			'https://replicate.delivery/pbxt/NVfckGeGopq1lE5u9tMxK2Fv4yl5NIh1TtZ1z7n3QOffLwQKB/ComfyUI_00001_.png?fbclid=IwAR3eK1fTkWKVGaV59jLez_9404FJ1k2tMSM1TbDiV_TtvvhYrcNMiVyHO7I_aem_AahKJOJBbfpiP82zknsxxsJNN7rMVGNFOt1y6Lsbyoq4DFRbj8m34q3sJCDFmd8G_10loVSSFrbZbFqcztMNd1tJ'),
		// 	10000
		// );
	};
</script>

{#if !accessToken || generatedError}
	<div class="text-center text-lg font-bold p-2 rounded-md bg-black text-white opacity-80">
		<label for="accessToken">Access code</label>
		<input name="accessToken" id="accessToken" class="text-black" bind:value={accessToken} />
	</div>
{/if}

{#if generatedError}
	<div class="flex justify-center mb-5">
		<div class="text-red-500 text-lg font-bold absolute">
			{generatedError}
		</div>
	</div>
{/if}

{#if generatingStatus === 'PRELOAD' || generatingStatus === 'FAILED'}
	<!-- <div class="text-center text-lg font-bold p-2 rounded-md bg-black text-white opacity-80">
		UNDER MAINTENANCE, WE'LL BE WITH YOU IN A BIT
		<br />
		THX 4 THE PATIENCE
	</div> -->
	<ImageUploader on:upload={imageUploaded} />
	<img src={'example_crop.png'} alt="example" class="max-h-[600px]" />
{:else if generatingStatus === 'SUCCESS'}
	<div class="h-[30px] flex gap-5">
		<Button label={'SAVE'} type="x" on:click={save} />
		<Button label={'RESTART'} type="o" on:click={restart} />
	</div>
	{#if focusGenerated}
		<img src={generatedImage} alt="generated" class="max-h-[600px]" />
	{:else}
		<img src={uploadedImage} alt="original" class="max-h-[600px]" />
	{/if}
	<div class="h-[30px]">
		<Button
			label={focusGenerated ? 'VIEW ORIGINAL' : 'VIEW PS2'}
			on:click={() => (focusGenerated = !focusGenerated)}
		/>
	</div>
{:else if generatingStatus === 'LOADING' && uploadedImage}
	<!-- empty divs below make for the lack of buttons while generating -->
	<div class="h-[30px]" />
	<Generating>
		<PixelatedPreview image={uploadedImage} {pixelSize} />
	</Generating>
	<div class="h-[30px]" />
{/if}

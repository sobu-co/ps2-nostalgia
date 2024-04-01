<script lang="ts">
	import ImageUploader from '$lib/components/ImageUploader.svelte';
	import PixelatedPreview from '$lib/components/PixelatedPreview.svelte';
	import Button from '$lib/components/Button.svelte';
	import Generating from '$lib/components/Generating.svelte';
	import { saveImage } from '$lib/utils/imageUtils';
	import ImageComparerView from '$lib/components/ImageComparerView.svelte';
	import InfoText from '$lib/components/InfoText.svelte';
	import ErrorText from '$lib/components/ErrorText.svelte';

	export let data;

	let uploadedImage: string | null = null;

	let pixelSize = 50; // pixelation while generatingStatus is LOADING

	let generatedImage: string | null = null;
	let generatedError: string | null = null;

	let accessToken = data.accessCode;
	let generatingStatus: 'PRELOAD' | 'SUCCESS' | 'FAILED' | 'LOADING' = 'PRELOAD';

	function restart() {
		uploadedImage = null;

		pixelSize = 50;

		generatedImage = null;
		generatedError = null;

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
	};
</script>

{#if generatingStatus === 'PRELOAD' || generatingStatus === 'FAILED'}
	<InfoText label="MAKE A PS2 VERSION OF YOUR GRANDPA" />
	<ImageComparerView
		imgSrc={'examples/gramps_ps2.png'}
		altSrc={'examples/gramps_og.png'}
		alt={'example image of my grandpa'}
	/>
	<InfoText label="(OR ANYTHING ELSE)" />
	<ImageUploader on:upload={imageUploaded} />
{:else if generatingStatus === 'SUCCESS'}
	<div class="h-[25px]">
		<Button label={'GO AGAIN'} type="o" on:click={restart} />
	</div>
	<ImageComparerView
		imgSrc={generatedImage ?? ''}
		altSrc={uploadedImage ?? ''}
		alt={'result comparison'}
	/>
{:else if generatingStatus === 'LOADING' && uploadedImage}
	<!-- empty div below make up for the lack of restart button while generating -->
	<div class="h-[25px]" />
	<Generating>
		<PixelatedPreview image={uploadedImage} {pixelSize} />
	</Generating>
{/if}

{#if generatedError}
	<ErrorText label={generatedError} />
{/if}

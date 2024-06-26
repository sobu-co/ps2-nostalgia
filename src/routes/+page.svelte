<script lang="ts">
	import ImageUploader from '$lib/components/ImageUploader.svelte';
	import PixelatedPreview from '$lib/components/PixelatedPreview.svelte';
	import Button from '$lib/components/Button.svelte';
	import Generating from '$lib/components/Generating.svelte';
	import ImageComparerView from '$lib/components/ImageComparerView.svelte';
	import InfoText from '$lib/components/InfoText.svelte';
	import ErrorText from '$lib/components/ErrorText.svelte';
	import { invalidateAll } from '$app/navigation';

	let uploadedImage: string | null = null;

	let pixelSize = 30; // pixelation while generatingStatus is LOADING

	let generatedImage: string | null = null;
	let generatedError: string | null = null;

	let generatingStatus: 'PRELOAD' | 'SUCCESS' | 'FAILED' | 'LOADING' = 'PRELOAD';

	function restart() {
		invalidateAll();

		uploadedImage = null;

		pixelSize = 30;

		generatedImage = null;
		generatedError = null;

		generatingStatus = 'PRELOAD';
	}

	function imageUploaded(event: CustomEvent<any>) {
		uploadedImage = event.detail.imageData;
		generatedError = null; // empty out potential old error

		runModel();
	}

	const runModel = async () => {
		let upcomingPixelations = [];

		for (let i = 0; i < 10; i++) {
			let upcoming = setTimeout(() => (pixelSize = 30 - i * 2), i * 3000);
			upcomingPixelations.push(upcoming);
		}
		// add a tiny delay to prevent flicker if access code is incorrect
		generatingStatus = 'LOADING';

		const response = await fetch(`/api/generate`, {
			method: 'POST',
			body: JSON.stringify({ imageData: uploadedImage })
		});

		const json = await response.json();

		for (let upcoming of upcomingPixelations) {
			clearTimeout(upcoming);
		}

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
	<ImageComparerView
		imgSrc={generatedImage ?? ''}
		altSrc={uploadedImage ?? ''}
		alt={'result comparison'}
	/>
	<div class="h-[25px]">
		<Button label={'GO AGAIN'} type="o" on:click={restart} />
	</div>
{:else if generatingStatus === 'LOADING' && uploadedImage}
	<Generating>
		<PixelatedPreview image={uploadedImage} {pixelSize} />
	</Generating>
{/if}

{#if generatedError}
	<ErrorText label={generatedError} />
{/if}

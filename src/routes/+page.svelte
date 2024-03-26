<script lang="ts">
	import ImageUploader from '$lib/components/ImageUploader.svelte';
	import ReplicateRunner from '$lib/components/ReplicateRunner.svelte';
	import PixelatedPreview from '$lib/components/PixelatedPreview.svelte';
	import Button from '$lib/components/Button.svelte';
	import Generating from '$lib/components/Generating.svelte';
	import { saveImage } from '$lib/utils/imageUtils';
	import { onMount } from 'svelte';

	let uploadedImage: string | null = null;
	let pixelatedImage: string | null = null;
	let generatedImage: string | null = null;
	let generatedError: string | null = null;
	let generating = false;
	let pixelSize = 50;

	onMount(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	});

	const handleKeyDown = (event: KeyboardEvent) => {
		if (generatedImage && event.key === 'x') {
			save();
		}
		if (event.key === 'o') {
			restart();
		}
	};

	function restart() {
		uploadedImage = null;
		pixelatedImage = null;
		generatedImage = null;
		generatedError = null;
	}

	function save() {
		generatedImage && saveImage(generatedImage);
	}

	function imageUploaded(event: CustomEvent<any>) {
		uploadedImage = event.detail.imageData;
		generatedError = null;
	}

	function generateStarted() {
		generating = true;

		for (let i = 0; i < 10; i++) {
			setTimeout(() => (pixelSize = 50 - i * 3), i * 3000);
		}
	}

	function generateEnded(event: CustomEvent<any>) {
		generating = false;
		pixelSize = 50;

		if (event.detail.error) {
			restart();
			generatedError = event.detail.error;
		}

		generatedImage = event.detail.imageData;
	}
</script>

<!-- <h1 class="flex justify-center items-center text-6xl gap-2 mt-10 mb-5">PS2 Nostalgia</h1> -->

<div class="h-[30px]">
	{#if !uploadedImage}
		<ImageUploader on:upload={imageUploaded} />
	{:else}
		<div class="flex gap-5">
			{#if generatedImage}
				<Button label={'SAVE'} on:click={save} />
				<Button label={'RESTART'} type="o" on:click={restart} />
			{:else if !generating}
				<ReplicateRunner
					{uploadedImage}
					on:generateStarted={generateStarted}
					on:generateEnded={generateEnded}
				/>
				<Button label={'RESTART'} type="o" on:click={restart} />
			{/if}
		</div>
	{/if}
</div>

<div class="max-w-[600px] h-[600px] flex justify-center items-center">
	{#if !uploadedImage}
		<img src={'example_crop.png'} alt="example" class="max-h-[600px]" />
	{:else if generatedImage}
		<img src={generatedImage} alt="generated" class="max-h-[600px]" />
	{:else if generating}
		<Generating>
			<PixelatedPreview image={uploadedImage} {pixelSize} />
		</Generating>
	{:else}
		<PixelatedPreview image={uploadedImage} {pixelSize} />
	{/if}

	{#if generatedError}
		<div class="flex justify-center">
			<div class="text-red-500 text-lg font-bold absolute">
				{generatedError}
			</div>
		</div>
	{/if}
</div>

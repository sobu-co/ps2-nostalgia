<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Button from './Button.svelte';
	import { pixelateRawImageData, saveImage } from '$lib/utils/imageUtils';

	export let imageData: string;
	export let pixelatedPreview: string | null;

	const dispatch = createEventDispatcher();

	onMount(() => {
		pixelateRawImageData(imageData, 40).then((data) => {
			dispatch('pixelate', { imageData: data });
		});
	});

	let loadingText: string | null = null;
	let generatedImageUri: string | null = null;

	const runModel = async () => {
		loadingText = 'REACHING OUT TO ROCKSTAR GAMES ... ONE SEC';

		// 15 pixelations in 15 seconds -- each a bit less strong than the previous
		for (let i = 0; i < 15; i++) {
			pixelateRawImageData(imageData, 50 - i).then((data) => {
				setTimeout(() => dispatch('pixelate', { imageData: data }), i * 1000);
			});
		}

		const response = await fetch(`/`, {
			method: 'POST',
			body: JSON.stringify({ imageData: imageData })
		});

		const json = await response.json();

		if (json.error) {
			loadingText = json.error;
		} else {
			generatedImageUri = json.generatedImgUri;
			loadingText = null;
		}

		setTimeout(() => (loadingText = null), 5000);
	};
</script>

<div class="flex flex-col items-center gap-5">
	{#if generatedImageUri}
		<div class="flex gap-5">
			<Button label={'SAVE'} on:click={() => generatedImageUri && saveImage(generatedImageUri)} />
			<Button label={'RESTART'} type="o" on:click={() => dispatch('restart')} />
		</div>
		<img src={generatedImageUri} alt="generated" class="max-h-[600px] w-auto" />
	{:else}
		<div class="flex gap-5">
			<Button label={'CONVERT'} on:click={runModel} />
			<Button label={'RESTART'} type="o" on:click={() => dispatch('restart')} />
		</div>
		<div class="relative">
			<img src={pixelatedPreview} alt="preview" class="max-h-[600px] w-auto" />

			{#if loadingText}
				<div class="absolute inset-0 flex items-center justify-center">
					<div
						class="animate-pulse bg-white text-center rounded-lg border border-5 border-black px-4 py-2 flex items-center justify-center text-lg font-bold"
					>
						{loadingText}
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style lang="postcss">
	.animate-pulse {
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0% {
			opacity: 80%;
		}
		50% {
			opacity: 100%;
		}
		100% {
			opacity: 80%;
		}
	}
</style>

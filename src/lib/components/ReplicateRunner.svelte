<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Button from './Button.svelte';
	import { pixelateImageData } from '$lib/utils/imageUtils';

	export let imageData: string;
	export let pixelatedPreview: string | null;

	const dispatch = createEventDispatcher();

	let loadingText: string | null = null;
	let generatedImageUri: string | null = null;

	const runModel = async () => {
		loadingText = 'REACHING OUT TO ROCKSTAR GAMES ... ONE SEC';

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
	};

	$: {
		const img = new Image();
		img.onload = () => {
			dispatch('pixelate', { imageData: pixelateImageData(img) });
		};
		img.src = imageData;
	}
</script>

<div class="flex flex-col items-center gap-2">
	{#if generatedImageUri}
		<img src={generatedImageUri} alt="generated" class="max-h-[600px] w-fit" />
	{:else if pixelatedPreview}
		<div class="relative">
			<img src={pixelatedPreview} alt="generated preview" class="max-h-[600px] w-fit" />
			<div class="absolute inset-0 flex items-center justify-center">
				<div
					class="bg-white text-center rounded-lg border border-5 border-black px-4 py-2 flex items-center justify-center text-lg font-bold"
				>
					<Button label={'PS2 TIME'} type="o" on:click={runModel} />
				</div>
			</div>
		</div>
	{/if}
</div>

{#if loadingText}
	<div class="fixed inset-0 flex items-center justify-center z-50">
		<div
			class="animate-pulse bg-white text-center rounded-lg border border-5 border-black px-4 py-2 flex items-center justify-center text-lg font-bold"
		>
			{loadingText}
		</div>
	</div>
{/if}

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

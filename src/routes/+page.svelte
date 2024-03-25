<script lang="ts">
	import ImageUploader from '$lib/components/ImageUploader.svelte';
	import ReplicateRunner from '$lib/components/ReplicateRunner.svelte';

	$: imageData = null;
	$: pixelatedPreview = null;

	function imageDataChanged(event: CustomEvent<any>) {
		imageData = event.detail.imageData;
	}

	function restart() {
		imageData = null;
	}

	function pixelate(event: CustomEvent<any>) {
		pixelatedPreview = event.detail.imageData;
	}
</script>

<h1 class="flex justify-center items-center text-6xl gap-2 mb-5">PS2 Nostalgia</h1>

{#if !imageData}
	<ImageUploader {imageData} on:change={imageDataChanged} />
{:else}
	<ReplicateRunner {imageData} {pixelatedPreview} on:restart={restart} on:pixelate={pixelate} />
{/if}

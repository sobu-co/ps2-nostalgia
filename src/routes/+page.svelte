<script lang="ts">
	import ImageUploader from '$lib/components/ImageUploader.svelte';
	import ReplicateRunner from '$lib/components/ReplicateRunner.svelte';

	$: imageData = null;

	function imageDataChanged(event: CustomEvent<any>) {
		imageData = event.detail.imageData;
	}
</script>

<h1 class="text-xl font-bold text-center">ps2-nostalgia</h1>

<ImageUploader {imageData} on:change={imageDataChanged} />

<ReplicateRunner {imageData} />

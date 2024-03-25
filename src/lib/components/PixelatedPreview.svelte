<script lang="ts">
	import { pixelateRawImageData } from '$lib/utils/imageUtils';

	export let image: string;
	export let pixelSize: number;

	let pixelatedImage: string | null;

	$: {
		pixelateRawImageData(image, pixelSize).then((data) => (pixelatedImage = data));
	}
</script>

{#if pixelatedImage}
	<img src={pixelatedImage} alt="preview" class="max-h-[600px]" />
{/if}

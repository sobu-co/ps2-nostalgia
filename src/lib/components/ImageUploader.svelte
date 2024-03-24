<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';
	import { resizeAndConvertToJPEG } from '$lib/utils/imageUtils';

	export let imageData: string | null = null;

	const dispatch = createEventDispatcher();

	const openFileInput = () => {
		const fileInput = document.getElementById('capture') as HTMLInputElement;
		fileInput.click();
	};

	const captureMedia = (event: Event) => {
		const input = event.target as HTMLInputElement;

		if (input && input.files && input.files.length > 0) {
			const file = input.files[0];
			if (file.type.includes('image')) {
				const reader = new FileReader();

				reader.onload = function (e) {
					const img = new Image();
					img.onload = () => {
						dispatch('change', { imageData: resizeAndConvertToJPEG(img) });
					};
					img.src = e.target?.result as string;
				};

				reader.readAsDataURL(file);
			}
		}
	};
</script>

<div class="flex flex-col items-center gap-2">
	<Button label={'CHOOSE AN IMAGE'} on:click={openFileInput} />

	{#if imageData}
		<img src={imageData} alt="user upload" class="max-h-[600px] w-fit" />
	{/if}
</div>

<!-- TODO: eventually add ", video/*" to the accept prop below to allow capturing video -->
<input type="file" id="capture" accept="image/*" on:change={captureMedia} hidden />

<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Button from './Button.svelte';
	import { resizeAndConvertToJPEG } from '$lib/utils/imageUtils';

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
						dispatch('upload', { imageData: resizeAndConvertToJPEG(img) });
					};
					img.src = e.target?.result as string;
				};

				reader.readAsDataURL(file);
			}
		}
	};
</script>

<Button label={'SELECT PHOTO'} type="x" on:click={openFileInput} />

<!-- TODO: eventually add ", video/*" to the accept prop below to allow capturing video -->
<input type="file" id="capture" accept="image/*" on:change={captureMedia} hidden />

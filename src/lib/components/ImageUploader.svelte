<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let imageData: string | null = null;

	const dispatch = createEventDispatcher();

	const openFileInput = () => {
		const fileInput = document.getElementById('capture') as HTMLInputElement;
		fileInput.click();
	};

	const resizeAndConvertToJPEG = (img: HTMLImageElement): string => {
		const maxDimension = 800;

		let { width, height } = img;

		// downscaling if necessary
		if (width > maxDimension || height > maxDimension) {
			const widthRatio = maxDimension / width;
			const heightRatio = maxDimension / height;

			const scaleFactor = Math.min(widthRatio, heightRatio);
			width *= scaleFactor;
			height *= scaleFactor;
		}

		// draw the image on a canvas with new dimensions
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d')!;

		canvas.width = width;
		canvas.height = height;
		ctx.drawImage(img, 0, 0, width, height);

		let dataUrl = canvas.toDataURL('image/jpeg');

		return dataUrl;
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

<div class="flex flex-col gap-2">
	<button
		class="rounded-xl hover:bg-black hover:text-white border px-2"
		on:click|preventDefault={openFileInput}
	>
		Choose image
	</button>

	{#if imageData}
		<img src={imageData} alt="preview" class="" />
	{/if}
</div>

<!-- TODO: eventually add ", video/*" to the accept prop below to allow capturing video -->
<input type="file" id="capture" accept="image/*" on:change={captureMedia} hidden />

<!-- The following hidden input stores the capture's data -->
<input type="text" name="imageData" value={imageData} hidden />

<script lang="ts">
	export let imageData: string | null = null;

	let loadingText: string | null = null;
	let generatedImageUri: string | null = null;

	const runModel = async () => {
		loadingText = 'Reaching out to Rockstar games ...... one sec';

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
</script>

{#if imageData}
	<button class="rounded-xl hover:bg-black hover:text-white border px-2" on:click={runModel}>
		ps2 time
	</button>

	{#if loadingText}
		<div>{loadingText}</div>
	{/if}

	{#if generatedImageUri}
		<img src={generatedImageUri} alt="generated" class="" />
	{/if}
{/if}

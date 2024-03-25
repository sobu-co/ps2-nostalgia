<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Button from './Button.svelte';

	export let uploadedImage: string;

	const dispatch = createEventDispatcher();

	onMount(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	});

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'x') {
			runModel();
		}
	};

	const runModel = async () => {
		// if we're already generating, don't rerun
		dispatch('generateStarted');

		const response = await fetch(`/`, {
			method: 'POST',
			body: JSON.stringify({ imageData: uploadedImage })
		});

		const json = await response.json();

		if (json.error) {
			dispatch('generateEnded', { error: json.error });
		} else {
			dispatch('generateEnded', { imageData: json.generatedImgUri });
		}
		// setTimeout(() => (loadingText = null), 30000);
	};
</script>

<Button label={'CONVERT'} on:click={runModel} />

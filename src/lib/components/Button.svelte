<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let label: string;
	export let type: 'x' | 'o' | null = null;

	const dispatch = createEventDispatcher();

	onMount(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	});

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === type) {
			onClick();
		}
	};

	function onClick() {
		dispatch('click');
	}
</script>

<button class="rounded-3xl px-4 py-1 flex items-center justify-center gap-2" on:click={onClick}>
	{#if type === 'x'}
		<img src="x.png" alt="playstation x button" />
	{:else if type === 'o'}
		<img src="o.png" alt="playstation o button" />
	{/if}

	<div class="font-black">
		<!-- A bit hacky ... oh well lol -->
		{#if label === 'SUBMIT'}
			&rarr;
		{:else}
			{label}
		{/if}
	</div>
</button>

<style lang="postcss">
	button {
		background-color: rgba(231, 247, 231, 0.85);
		box-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
	}

	button img {
		height: 20px;
		border-radius: 50px;
	}

	button:hover {
		text-shadow: 0 0 5px rgb(0, 255, 0); /* Green glow */
	}

	button:hover img {
		box-shadow: 0 0 5px rgba(0, 255, 0);
	}
</style>

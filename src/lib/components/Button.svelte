<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let type: 'x' | 'o' = 'x';

	const dispatch = createEventDispatcher();

	function onClick() {
		dispatch('click');
	}
</script>

<button class="rounded-3xl flex justify-center" on:click={onClick}>
	<div
		class="rounded-3xl opacity-80 bg-white px-4 py-1 flex w-fit items-center justify-center gap-2"
	>
		{#if type === 'x'}
			<img src="x.png" alt="playstation x button" />
		{:else}
			<img src="o.png" alt="playstation o button" />
		{/if}

		<div class="text-lg font-bold">
			{label}
		</div>
	</div>
</button>

<style lang="postcss">
	button {
		background-color: rgba(136, 238, 136, 0.8);
		box-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
	}

	button img {
		height: 20px;
		border-radius: 50px;
	}

	button:hover {
		text-shadow: 0 0 2px rgba(0, 255, 0, 0.8); /* Green glow with 8px blur radius */
		background-color: rgba(193, 243, 193, 0.8);
	}

	button:hover img {
		box-shadow: 0 0 2px rgba(0, 255, 0, 0.8);
	}
</style>

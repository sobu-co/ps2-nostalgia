<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let type: 'x' | 'o' = 'x';

	const dispatch = createEventDispatcher();

	function onClick() {
		dispatch('click');
	}
</script>

<button class="flex justify-center text-lg font-bold" on:click={onClick}>
	<div class="hover:bg-black hover:text-white px-2 flex w-fit items-center justify-center gap-2">
		{#if type === 'x'}
			<img src="x.png" alt="playstation x button" class="h-5" />
		{:else}
			<img src="o.png" alt="playstation o button" class="h-5" />
		{/if}

		<div>
			{label}
		</div>
	</div>
</button>

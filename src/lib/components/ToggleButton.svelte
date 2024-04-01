<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let optionOne: string;
	export let optionTwo: string;

	const dispatch = createEventDispatcher();

	let focusOne = true;

	function onClick() {
		dispatch('click');

		focusOne = !focusOne;
	}
</script>

<button class="rounded-sm px-2 flex items-center justify-center gap-2 font-bold" on:click={onClick}>
	<div class={focusOne ? '' : 'text-gray-400'}>
		{optionOne}
	</div>
	/
	<div class={focusOne ? 'text-gray-400' : ''}>
		{optionTwo}
	</div>
</button>

<style lang="postcss">
	button {
		background-color: rgba(231, 247, 231, 0.9);
	}
</style>

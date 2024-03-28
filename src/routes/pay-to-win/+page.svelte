<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { ActionData } from '../$types';

	export let form: ActionData;
</script>

<div
	class="flex flex-col gap-2 text-center font-bold px-4 p-2 rounded-md bg-black text-white opacity-80"
>
	<div class="text-xs">VENMO US A DOLLAR FOR AN ACCESS CODE</div>
	<div class="text-xs">(we'll comment your code on the venmo transaction)</div>
	<div class="text-lg">@ps2cash</div>
</div>

<form class="flex flex-col items-center gap-2" method="POST" enctype="multipart/form-data">
	<div class="flex items-center gap-5">
		<input
			type="text"
			required
			id="accessToken"
			name="accessToken"
			placeholder="ACCESS CODE"
			class="p-2 rounded-md opacity-80 bg-black text-lg text-white font-bold text-center"
		/>

		<Button label={'SUBMIT'} />
	</div>

	{#if form?.error}
		<div class="text-sm text-center font-bold p-2 rounded-md bg-black text-red-500 opacity-80">
			{form?.error}
		</div>
	{/if}
</form>

<div class="scroll-container">
	<div class="flex gap-2 px-2">
		<!-- <img src={'examples/example_1.png'} alt="example" class="max-h-[600px]" /> -->
		<!-- <img src={'examples/example_2.jpg'} alt="example" class="max-h-[600px]" /> -->
		<!-- <img src={'examples/example_3.png'} alt="example" class="max-h-[600px]" /> -->
		<!-- <img src={'examples/example_4.png'} alt="example" class="max-h-[600px]" /> -->
		<img src={'examples/example_5.png'} alt="example" class="max-h-[600px]" />
	</div>
</div>

<style lang="postcss">
	.scroll-container {
		overflow-x: auto; /* Enable horizontal scrolling */
		/* width: 100vw; Take up the whole width of the screen */
		white-space: nowrap; /* Prevent content from wrapping */
	}
</style>

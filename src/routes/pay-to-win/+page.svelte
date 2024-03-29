<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ErrorText from '$lib/components/ErrorText.svelte';
	import InfoText from '$lib/components/InfoText.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<InfoText label={'THANKS FOR USING PS2 NOSTALGIA'} />

<InfoText
	label={'TO GENERATE MORE IMAGES, PLEASE SUPPORT US'}
	sublabels={[
		'venmo 1$ to @ps2cash',
		'',
		'we will comment your code on the transaction. allow up to 8 hours for us to get back to you.',
		'we may be asleep',
		'',
		'all codes are valid for 20 images'
	]}
/>

<div class="flex flex-col items-center gap-2">
	<form method="POST" enctype="multipart/form-data">
		<div class="flex w-full items-center gap-2">
			<input
				type="text"
				required
				id="accessToken"
				name="accessToken"
				placeholder="ENTER CODE"
				class="font-black px-2 py-1 rounded-md text-center"
				maxlength="20"
			/>
			<Button label={'SUBMIT'} />
		</div>
	</form>
	{#if form?.error}
		<ErrorText label={form?.error} />
	{/if}
</div>

<img src={'example_crop.png'} alt="example" class="max-h-[600px]" />

<style lang="postcss">
	input {
		box-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
	}
</style>

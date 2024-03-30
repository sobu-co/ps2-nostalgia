<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ErrorText from '$lib/components/ErrorText.svelte';
	import InfoText from '$lib/components/InfoText.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="relative">
	<div class="absolute inset-0 flex flex-col gap-8 items-center justify-center">
		<InfoText label={'THANKS FOR USING <3'} />
		<InfoText label={'SADLY, EVERY CONVERSION COSTS US $$$'} />
		<InfoText label={'IF YOU WANT TO MAKE MORE:'} />
		<InfoText
			label={'venmo @ps2cash a dollar'}
			sublabels={[
				"we'll comment a code like: 'LOVE' on the payment",
				'enter that code below to get back to making images'
			]}
		/>
		<InfoText
			label={'notes:'}
			sublabels={['please allow up to 8 hours for us to get back to you', 'we may be asleep']}
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
	</div>

	<img src={'example.png'} alt="example" class="w-screen h-screen object-cover" />
</div>

<style lang="postcss">
	input {
		background-color: rgba(231, 247, 231, 0.85);
		box-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
	}
</style>

<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ErrorText from '$lib/components/ErrorText.svelte';
	import InfoText from '$lib/components/InfoText.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="relative">
	<div class="absolute inset-0 flex flex-col gap-5 items-center justify-center">
		<InfoText label={'THANKS FOR USING <3'} />
		<InfoText label={'SADLY, EVERY CONVERSION COSTS US $$$'} />
		<InfoText label={'IF YOU WANT TO MAKE MORE:'} />
		<div class="flex flex-col gap-1 items-center">
			<InfoText label={'1. venmo @ps2cash a dollar'} smaller />
			<InfoText label={"2. we'll comment a code like 'LOVE' on the payment"} smaller />
			<InfoText label={'3. enter that code below to get back to ps2 fun'} smaller />
		</div>
		<div class="flex flex-col items-center gap-2">
			<form method="POST" enctype="multipart/form-data">
				<div class="flex items-center gap-2">
					<input
						type="text"
						required
						id="accessToken"
						name="accessToken"
						placeholder="ENTER CODE"
						class="font-bold rounded-sm text-center"
						maxlength="20"
					/>
					<Button label={'SUBMIT'} />
				</div>
			</form>
			{#if form?.error}
				<ErrorText label={form?.error} />
			{/if}
		</div>
		<div class="flex flex-col gap-1 items-center">
			<InfoText label={'note'} smaller />
			<InfoText label={'please allow up to 8 hours for us to get back to you'} smaller />
			<InfoText label="we may be asleep" smaller />
		</div>
	</div>

	<img src={'example.png'} alt="example" class="w-screen h-screen object-cover" />
</div>

<style lang="postcss">
	input {
		background-color: rgba(231, 247, 231, 0.8);
		box-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
	}
</style>

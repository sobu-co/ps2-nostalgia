<script lang="ts">
	export let label: string;
	export let sublabels: string[] | null = null;
</script>

<div class="flex flex-col gap-1 items-center text-center font-black">
	<div class="px-2 py-1 rounded-md bg-zinc-900 text-white opacity-90">
		{label}
	</div>
	{#if sublabels}
		<div class="px-2 py-1 rounded-md bg-zinc-900 text-white opacity-90">
			{#each sublabels as sublabel}
				<div class="text-center text-xs">{sublabel}</div>
			{/each}
		</div>
	{/if}
</div>

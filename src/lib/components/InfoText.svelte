<script lang="ts">
	export let label: string;
	export let sublabels: string[] | null = null;
</script>

<div
	class="flex flex-col gap-1 items-center text-center px-2 py-1 font-black rounded-md bg-black text-white opacity-80"
>
	{label}
	{#if sublabels}
		{#each sublabels as sublabel}
			<div class="text-center text-xs max-w-[300px]">{sublabel}</div>
		{/each}
	{/if}
</div>

<script lang="ts">
	export let label: string;
	export let smaller: boolean = false;
</script>

<div class="font-bold text-white">
	<div class={`${smaller ? 'text-sm' : ''} px-2 rounded-sm bg-black bg-opacity-60`}>
		{label}
	</div>
</div>

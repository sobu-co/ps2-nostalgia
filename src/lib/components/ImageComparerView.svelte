<script lang="ts">
	import ToggleButton from './ToggleButton.svelte';

	export let imgSrc: string;
	export let altSrc: string;
	export let alt: string;

	let src = imgSrc;

	function toggleImageSrc() {
		src = src === imgSrc ? altSrc : imgSrc;
	}
</script>

<div class="relative">
	<div class="absolute top-2 left-1/2 transform -translate-x-1/2">
		<ToggleButton optionOne={'PS2'} optionTwo={'ORIGINAL'} on:click={toggleImageSrc} />
	</div>

	<img {src} {alt} class="max-h-[600px] w-auto" />
</div>

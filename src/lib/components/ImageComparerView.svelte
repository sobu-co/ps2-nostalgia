<script lang="ts">
	export let imgSrc: string;
	export let altSrc: string;
	export let alt: string;

	let src = imgSrc;

	function toggleImageSrc() {
		src = src === imgSrc ? altSrc : imgSrc;
	}
</script>

<button on:click={toggleImageSrc}>
	<img {src} {alt} class="max-h-[600px] w-auto" />
</button>

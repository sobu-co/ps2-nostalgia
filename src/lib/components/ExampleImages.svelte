<script lang="ts">
	import ImageComparerView from './ImageComparerView.svelte';

	let exampleImages = [
		// {
		// 	imgSrc: 'examples/example_rocker.png',
		// 	altSrc: 'examples/example_rocker_og.png',
		// 	alt: 'example output'
		// },
		{
			imgSrc: 'examples/example_chinese_2.png',
			altSrc: 'examples/example_chinese_og.png',
			alt: 'example output'
		}
	];
</script>

<div class="scroll-container">
	{#each exampleImages as { imgSrc, altSrc, alt }, index}
		<ImageComparerView {imgSrc} {altSrc} {alt} />
	{/each}
</div>

<style lang="postcss">
	.scroll-container {
		overflow-x: auto;
		width: full;
		white-space: nowrap;
	}
</style>

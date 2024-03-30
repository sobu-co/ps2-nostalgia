<script lang="ts">
	import '../app.css';
</script>

<div class="flex flex-grow justify-center min-h-full py-3">
	<video autoplay muted loop>
		<source src="ps2_startup.mp4" type="video/mp4" />
	</video>
	<div class="flex flex-col max-w-[700px] gap-3 items-center justify-center">
		<slot />
	</div>
</div>

<style lang="postcss">
	video {
		position: absolute;
		top: 0;
		left: 0;
		min-width: 100%;
		min-height: 100%;
		z-index: -10;
		object-fit: cover;
		opacity: 80%;
	}
</style>

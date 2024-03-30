<script lang="ts">
	import '../app.css';
</script>

<div class="flex justify-center min-h-[calc(100vh-80px)] items-center justify-center">
	<video autoplay muted loop>
		<source src="ps2_startup.mp4" type="video/mp4" />
	</video>
	<div class="flex flex-col gap-3 items-center justify-center">
		<slot />
	</div>
</div>

<style lang="postcss">
	video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -10;
		object-fit: cover;
		opacity: 80%;
	}
</style>

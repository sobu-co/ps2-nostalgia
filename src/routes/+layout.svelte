<script lang="ts">
	import '../app.css';
</script>

<div class="flex items-center justify-center min-h-[calc(100vh-50px)]">
	<video autoplay playsinline muted loop>
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
		width: 100vw;
		height: 100vh;
		z-index: -10;
		object-fit: cover;
		opacity: 80%;
	}
</style>

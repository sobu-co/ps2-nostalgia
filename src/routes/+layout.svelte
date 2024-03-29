<script lang="ts">
	import '../app.css';
</script>

<div class="flex justify-center min-h-screen">
	<div class="flex max-w-[700px] flex-col gap-5 px-2 py-5 justify-center items-center">
		<video autoplay muted loop>
			<source src="ps2_startup.mp4" type="video/mp4" />
		</video>
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
		z-index: -100;
		object-fit: cover;
		opacity: 80%;
	}
</style>

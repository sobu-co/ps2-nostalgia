<script>
	import '../app.css';
</script>

<div class="flex justify-center min-h-screen pulsing-background">
	<div class="flex w-screen max-w-[700px] flex-col gap-5 py-5 px-2">
		<slot />
	</div>
</div>

<style lang="postcss">
	.pulsing-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		background: radial-gradient(
			circle,
			#ffffff,
			#4d72ec
		); /* White in the middle, dark blue around the edges */
		animation: pulse 10s ease-in-out infinite alternate;
		background-position: center center; /* Center the background */
	}

	@keyframes pulse {
		0% {
			background-size: 200% 200%; /* Start with full size */
		}
		50% {
			background-size: 120% 120%; /* Expand to 120% of original size */
		}
		100% {
			background-size: 200% 200%; /* Expand to 120% of original size */
		}
	}
</style>

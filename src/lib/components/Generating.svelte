<script lang="ts">
	let loadingText: string | null = 'REACHING OUT TO ROCKSTAR GAMES...';
</script>

<div class="max-w-[600px] h-[600px]">
	<div class="relative">
		<slot />
		<div class="x absolute inset-0 flex items-center justify-center">
			<img class="y w-[100px]" src="ps_logo_3d.png" alt="bouncy ps logo" />
		</div>
		<div class="absolute inset-0 flex items-end justify-center">
			<div class="bg-white animate-pulse px-4 py-2 text-md font-bold">
				{loadingText}
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.animate-pulse {
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0% {
			opacity: 80%;
		}
		50% {
			opacity: 100%;
		}
		100% {
			opacity: 80%;
		}
	}

	.x {
		animation: x 3s linear infinite alternate;
	}

	.y {
		animation: y 7s linear infinite alternate;
	}

	@keyframes x {
		0% {
			transform: translateX(-100px);
		}
		100% {
			transform: translateX(100px);
		}
	}

	@keyframes y {
		0% {
			transform: translateY(-100px);
		}
		100% {
			transform: translateY(100px);
		}
	}
</style>

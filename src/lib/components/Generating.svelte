<script lang="ts">
	let loadingText: string | null = 'REACHING OUT TO ROCKSTAR GAMES...';
</script>

<div class="relative">
	<slot />
	<div class="absolute top-2 left-1/2 transform -translate-x-1/2">
		<div class="rounded-sm bg-white px-2 font-bold">
			{loadingText}
		</div>
	</div>
	<div class="x absolute inset-0 flex items-center justify-center">
		<img class="y w-[100px]" src="favicon.png" alt="bouncy ps logo" />
	</div>
</div>

<style lang="postcss">
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

<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import InfoText from './InfoText.svelte';

	let loadingText: string = 'REACHING OUT TO ROCKSTAR GAMES';
	let dots: string = '';

	let slotElement: HTMLElement;
	let xRange = 0; // Default values
	let yRange = 0; // Default values

	function updateAnimationRange() {
		if (slotElement) {
			const { width, height } = slotElement.getBoundingClientRect();
			if (width > 0 && height > 0) {
				xRange = width / 2 - 35;
				yRange = height / 2 - 38;
			}
		}
	}

	afterUpdate(() => {
		updateAnimationRange();
	});

	onMount(() => {
		const interval = setInterval(() => {
			if (dots.length < 3) {
				dots += '.';
			} else {
				dots = '';
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div id="generating" class="relative" style="--x-range: {xRange}px; --y-range: {yRange}px;">
	<div bind:this={slotElement}>
		<slot />
	</div>
	{#if xRange > 0 || yRange > 0}
		<div class="x absolute inset-0 flex items-center justify-center">
			<img class="y w-[70px]" src="favicon.ico" alt="bouncy ps logo" />
		</div>
	{:else}
		<img class="absolute top-0 left-0 w-[70px] top-0 left-0" src="favicon.ico" alt="bouncy ps logo" />
	{/if}
</div>

<div class="z-10 h-[25px] flex justify-center">
	<InfoText label={loadingText + dots}></InfoText>
</div>

<style lang="postcss">
	#generating {
		--x-range: 0px;
		--y-range: 0px;
	}

	.x {
		animation: x 7s linear infinite alternate;
	}

	.y {
		animation: y 13s linear infinite alternate;
	}

	img {
		image-rendering: pixelated;
		image-rendering: -moz-crisp-edges;
	}

	@keyframes x {
		0% {
			transform: translateX(calc(-1 * var(--x-range)));
		}
		100% {
			transform: translateX(var(--x-range));
		}
	}

	@keyframes y {
		0% {
			transform: translateY(calc(-1 * var(--y-range)));
		}
		100% {
			transform: translateY(var(--y-range));
		}
	}
</style>

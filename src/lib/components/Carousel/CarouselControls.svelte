<script>
	import { createEventDispatcher } from 'svelte';

	export let slides;
	export let currentIndex;
	export let prevSlide;
	export let nextSlide;

	const dispatch = createEventDispatcher();

	function selectSlide(index) {
		dispatch('selectSlide', index);
	}
</script>

<div class="flex w-full md:px-6">
	<div class="flex mx-auto items-center">
		<div
			class="flex items-center space-x-2 bg-white rounded-full shadow-md font-dela-gothic-one text-sm p-2"
		>
			<!-- Previous Button -->
			<button
				on:click={prevSlide}
				type="button"
				class="w-8 md:w-10 h-8 md:h-10 shadow-md rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 ease-out transform hover:scale-[1.15]"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="3"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>

			<!-- Weekday Buttons -->
			{#each slides as slide, i (slide.day)}
				<button
					class="cursor-pointer rounded-full p-2 hover:bg-red-100"
					class:font-bold={i === currentIndex}
					class:bg-brand={i === currentIndex}
					class:text-white={i === currentIndex}
					on:click={() => selectSlide(i)}
				>
					{slide.day.slice(0, 3)}
				</button>
			{/each}

			<!-- Next Button -->
			<button
				on:click={nextSlide}
				class="w-8 md:w-10 h-8 md:h-10 shadow-md rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 ease-out transform hover:scale-[1.15]"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>
	</div>
</div>

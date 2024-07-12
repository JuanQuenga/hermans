<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { days } from '$lib/data/cafe.json';

	let currentIndex = 0;
	let interval: number;
	let startX: number;
	let isDragging = false;
	let carouselWidth = 0;
	let slideWidth = 0;
	let visibleSlidesCount = 3;
	let carouselElement: any;
	let isAnimating = false;

	$: visibleDays = Array(visibleSlidesCount + 4)
		.fill(0)
		.map((_, i) => {
			const index = (currentIndex - 2 + i + days.length) % days.length;
			return days[index];
		});

	function animateSlide(direction: string) {
		if (isAnimating) return;
		isAnimating = true;
		const currentTransform = -slideWidth;
		const targetTransform = direction === 'next' ? -(slideWidth * 2) : 0;

		carouselElement.style.transition = 'transform 0.3s ease-in-out';
		carouselElement.style.transform = `translateX(${targetTransform}px)`;

		setTimeout(() => {
			carouselElement.style.transition = 'none';
			carouselElement.style.transform = `translateX(${currentTransform}px)`;
			isAnimating = false;
			if (direction === 'next') {
				currentIndex = (currentIndex + 1) % days.length;
			} else {
				currentIndex = (currentIndex - 1 + days.length) % days.length;
			}
		}, 300);
	}

	function nextSlide() {
		animateSlide('next');
		resetAutoSlide();
	}

	function prevSlide() {
		animateSlide('prev');
		resetAutoSlide();
	}

	function startAutoSlide() {
		stopAutoSlide();
		interval = setInterval(() => {
			nextSlide();
		}, 5000);
	}

	function stopAutoSlide() {
		if (interval) {
			clearInterval(interval);
		}
	}

	function resetAutoSlide() {
		stopAutoSlide();
		startAutoSlide();
	}

	function handleDragStart(event: MouseEvent | TouchEvent) {
		isDragging = true;
		startX = 'touches' in event ? event.touches[0].clientX : (event as MouseEvent).clientX;
		stopAutoSlide();
	}

	function handleDragMove(event: MouseEvent | TouchEvent) {
		if (!isDragging) return;

		const currentX = 'touches' in event ? event.touches[0].clientX : (event as MouseEvent).clientX;
		const diff = startX - currentX;

		if (Math.abs(diff) > slideWidth / 3) {
			if (diff > 0) {
				nextSlide();
			} else {
				prevSlide();
			}
			isDragging = false;
			resetAutoSlide();
		}
	}

	function handleDragEnd() {
		isDragging = false;
		resetAutoSlide();
	}

	function carouselAction(node: HTMLElement) {
		carouselElement = node;
		const resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				carouselWidth = entry.contentRect.width;
				visibleSlidesCount = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
				slideWidth = carouselWidth / visibleSlidesCount;
				node.style.transform = `translateX(-${slideWidth}px)`;
			}
		});

		resizeObserver.observe(node);

		node.addEventListener('mousedown', handleDragStart);
		node.addEventListener('touchstart', handleDragStart);
		window.addEventListener('mousemove', handleDragMove);
		window.addEventListener('touchmove', handleDragMove);
		window.addEventListener('mouseup', handleDragEnd);
		window.addEventListener('touchend', handleDragEnd);

		return {
			destroy() {
				resizeObserver.unobserve(node);
				node.removeEventListener('mousedown', handleDragStart);
				node.removeEventListener('touchstart', handleDragStart);
				window.removeEventListener('mousemove', handleDragMove);
				window.removeEventListener('touchmove', handleDragMove);
				window.removeEventListener('mouseup', handleDragEnd);
				window.removeEventListener('touchend', handleDragEnd);
			}
		};
	}

	onMount(() => {
		startAutoSlide();
	});

	onDestroy(() => {
		stopAutoSlide();
	});
</script>

<div class="mx-auto">
	<div
		class="flex flex-col md:flex-row md:px-8 pb-4 text-right md:space-x-4 md:text-2xl items-center text-gray-700 font-bold font-dela-gothic-one"
	>
		<div class="flex grow">June 24th - 28th</div>
		<div class="">10:30AM - 2:00PM</div>
	</div>

	<!-- Carousel -->
	<div class="carousel relative overflow-hidden">
		<div use:carouselAction class="flex transition-transform duration-300 ease-in-out pb-4">
			{#each visibleDays as day, index (day.day + index)}
				<div class="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4" style="width: {slideWidth}px">
					<div class="bg-white shadow-lg rounded-2xl overflow-hidden">
						<div class="p-6">
							<div class="flex">
								<div class="flex-grow">
									<h2 class="text-md text-gray-500 font-dela-gothic-one">{day.theme}</h2>
									<h3 class="text-2xl font-bold mb-4 font-dela-gothic-one text-gray-700">
										{day.day}
									</h3>
								</div>
								<div class=" text-brand font-bold font-dela-gothic-one text-2xl">${day.price}</div>
							</div>
							<div class="dishes space-y-2">
								{#each day.items as item}
									<span
										class="side-dish block bg-brand text-white text-md p-2 font-extrabold rounded"
										>{item}</span
									>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Control Buttons -->
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
				{#each days as weekday, i (weekday.day)}
					<button
						class="cursor-pointer rounded-full p-2 hover:bg-red-100"
						class:font-bold={i === currentIndex}
						class:bg-brand={i === currentIndex}
						class:text-white={i === currentIndex}
						on:click={() => {
							currentIndex = i;
							resetAutoSlide();
						}}
					>
						{weekday.day.slice(0, 3)}
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
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="3"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<div class="w-full text-center text-base font-bold italic pt-8 text-gray-500">
		* Menu items are subject to change without notice.
	</div>
</div>

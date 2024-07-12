<script>
	import { onMount, onDestroy } from 'svelte';
	import CarouselSlide from './CarouselSlide.svelte';
	import CarouselControls from './CarouselControls.svelte';

	export let slides = [];
	export let visibleSlidesCount = 3;
	export let autoSlideInterval = 5000;

	let currentIndex = 0;
	let interval;
	let startX;
	let isDragging = false;
	let carouselWidth = 0;
	let slideWidth = 0;
	let carouselElement;
	let isAnimating = false;

	$: normalizedSlides = slides.map((slide, index) =>
		typeof slide === 'string' ? { content: slide, id: index } : { ...slide, id: slide.id || index }
	);

	$: visibleSlides = Array(visibleSlidesCount + 4)
		.fill()
		.map((_, i) => {
			const index = (currentIndex - 2 + i + normalizedSlides.length) % normalizedSlides.length;
			return { ...normalizedSlides[index], uniqueKey: `slide-${normalizedSlides[index].id}-${i}` };
		});

	function animateSlide(direction) {
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
				currentIndex = (currentIndex + 1) % normalizedSlides.length;
			} else {
				currentIndex = (currentIndex - 1 + normalizedSlides.length) % normalizedSlides.length;
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
		interval = setInterval(nextSlide, autoSlideInterval);
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

	function handleDragStart(event) {
		isDragging = true;
		startX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
		stopAutoSlide();
	}

	function handleDragMove(event) {
		if (!isDragging) return;

		const currentX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
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

	function carouselAction(node) {
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

<div class="carousel relative overflow-hidden">
	<div use:carouselAction class="flex transition-transform duration-300 ease-in-out pb-4">
		{#each visibleSlides as slide (slide.uniqueKey)}
			<CarouselSlide {slide} {slideWidth} />
		{/each}
	</div>
</div>

<CarouselControls
	slides={normalizedSlides}
	{currentIndex}
	{prevSlide}
	{nextSlide}
	on:selectSlide={(event) => {
		currentIndex = event.detail;
		resetAutoSlide();
	}}
/>

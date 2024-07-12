<script>
	import RandomPlatePhoto from '$lib/components/common/RandomPlatePhoto.svelte';
	import { onMount } from 'svelte';

	let images = [
		{ src: '/api/placeholder/100/100', width: 100, height: 100 },
		{ src: '/api/placeholder/120/120', width: 120, height: 120 },
		{ src: '/api/placeholder/80/80', width: 80, height: 80 },
		{ src: '/api/placeholder/110/110', width: 110, height: 110 },
		{ src: '/api/placeholder/90/90', width: 90, height: 90 },
		{ src: '/api/placeholder/120/120', width: 120, height: 120 },
		{ src: '/api/placeholder/80/80', width: 80, height: 80 },
		{ src: '/api/placeholder/110/110', width: 110, height: 110 },
		{ src: '/api/placeholder/90/90', width: 90, height: 90 },
		{ src: '/api/placeholder/120/120', width: 120, height: 120 },
		{ src: '/api/placeholder/80/80', width: 80, height: 80 },
		{ src: '/api/placeholder/110/110', width: 110, height: 110 },
		{ src: '/api/placeholder/90/90', width: 90, height: 90 },
		{ src: '/api/placeholder/120/120', width: 120, height: 120 },
		{ src: '/api/placeholder/80/80', width: 80, height: 80 },
		{ src: '/api/placeholder/110/110', width: 110, height: 110 },
		{ src: '/api/placeholder/90/90', width: 90, height: 90 }
	];

	let container;
	let imageElements = [];
	let placedImages = [];

	onMount(() => {
		placeImages();
		imageElements = Array.from(container.querySelectorAll('img'));
		animateImages();

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function placeImages() {
		const containerRect = { width: window.innerWidth, height: window.innerHeight };

		images.forEach((image) => {
			let attempts = 0;
			let placed = false;

			while (!placed && attempts < 100) {
				const x = Math.random() * (containerRect.width - image.width);
				const y = Math.random() * (containerRect.height - image.height);

				if (!checkCollision({ x, y, width: image.width, height: image.height })) {
					placedImages.push({ ...image, x, y });
					placed = true;
				}

				attempts++;
			}
		});

		placedImages = placedImages;
	}

	function checkCollision(rect) {
		return placedImages.some(
			(placedImage) =>
				rect.x < placedImage.x + placedImage.width &&
				rect.x + rect.width > placedImage.x &&
				rect.y < placedImage.y + placedImage.height &&
				rect.y + rect.height > placedImage.y
		);
	}

	function animateImages() {
		imageElements.forEach((img, index) => {
			const duration = 5 + Math.random() * 5;
			const delay = Math.random() * 5;
			img.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
		});
	}

	function handleMouseMove(e) {
		const { clientX, clientY } = e;
		imageElements.forEach((img) => {
			const rect = img.getBoundingClientRect();
			const x = (clientX - rect.left) / 50;
			const y = (clientY - rect.top) / 50;
			img.style.transform = `translate(${x}px, ${y}px)`;
		});
	}

	function handleScroll() {
		const scrollY = window.scrollY;
		imageElements.forEach((img) => {
			const speed = parseFloat(img.dataset.speed) || 0.1;
			const yPos = -scrollY * speed;
			img.style.transform = `translateY(${yPos}px)`;
		});
	}
</script>

<div bind:this={container} class="fixed inset-0 overflow-hidden pointer-events-none">
	{#each placedImages as image, i}
		<!-- <img
      src={image.src}
      alt="Floating image"
      class="absolute rounded-lg shadow-lg"
      style="left: {image.x}px; top: {image.y}px; width: {image.width}px; height: {image.height}px;"
      data-speed={0.05 + Math.random() * 0.1}
    /> -->
		<div
			class="absolute rounded-lg shadow-lg w-[100px]"
			style="left: {image.x}px; top: {image.y}px; width: {image.width}px; height: {image.height}px;"
			data-speed={0.05 + Math.random() * 0.1}
		>
			<RandomPlatePhoto />
		</div>
	{/each}
</div>

<style>
	@keyframes float {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-20px);
		}
	}
</style>

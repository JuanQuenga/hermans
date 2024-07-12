<script>
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	import { days } from '$lib/data/cafe.json';
</script>

<div class="mx-auto">
	<div
		class="flex flex-col md:flex-row md:px-8 pb-4 text-right md:space-x-4 md:text-2xl items-center text-gray-700 font-bold font-dela-gothic-one"
	>
		<div class="flex grow">June 24th - 28th</div>
		<div class="">10:30AM - 2:00PM</div>
	</div>

	<Carousel slides={days} visibleSlidesCount={3} autoSlideInterval={5000} />

	<div class="w-full text-center text-base font-bold italic pt-8 text-gray-500">
		* Menu items are subject to change without notice.
	</div>
</div>

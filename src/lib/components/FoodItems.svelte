<script>
	import CafeName from './common/CafeName.svelte';
	import NewCarousel from './NewCarousel.svelte';
	import Section from './common/Section.svelte';
</script>

<Section
	><div class="flex flex-col md:p-4 rounded-full text-brand font-bold text-2x mb-6">
		<div
			class="flex justify-center text-3xl md:text-5xl font-dela-gothic-one font-normal drop-shadow-md"
		>
			<CafeName />
		</div>
		<div
			class="flex flex-col md:flex-row md:space-x-16 text-nowrap justify-center text-lg md:text-3xl font-bold items-center font-dela-gothic-one text-gray-700"
		>
			<div class="text-xl md:text-3xl">Weekly Lunch Specials</div>
		</div>
		<div class="text-gray-700 w-full text-center text-sm md:text-lg italic">
			Includes rice, soup, salad, and iced tea.
		</div>
	</div>

	<NewCarousel />
</Section>

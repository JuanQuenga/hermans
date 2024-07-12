<script>
	export let slide;
	export let slideWidth;
</script>

<div class="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4" style="width: {slideWidth}px">
	<div class="bg-white shadow-lg rounded-2xl overflow-hidden">
		<div class="p-6">
			<div class="flex">
				<div class="flex-grow">
					<h2 class="text-md text-gray-500 font-dela-gothic-one">{slide.theme}</h2>
					<h3 class="text-2xl font-bold mb-4 font-dela-gothic-one text-gray-700">
						{slide.day}
					</h3>
				</div>
				<div class="text-brand font-bold font-dela-gothic-one text-2xl">${slide.price}</div>
			</div>
			<div class="dishes space-y-2">
				{#each slide.items as item}
					<span class="side-dish block bg-brand text-white text-md p-2 font-extrabold rounded"
						>{item}</span
					>
				{/each}
			</div>
		</div>
	</div>
</div>

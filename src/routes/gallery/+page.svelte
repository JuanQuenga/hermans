<script>
	import RandomPlatePhoto from '$lib/components/common/RandomPlatePhoto.svelte';
</script>

<div class="container mx-auto px-4 py-8">
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
		{#each Array(8) as _, i}
			<div class="bg-white rounded-lg shadow-md overflow-hidden">
				<div class="w-full h-48 object-cover block">
					<RandomPlatePhoto />
				</div>
			</div>
		{/each}
	</div>
</div>

<script>
	import WavyDivider from './dividers/WavyDivider.svelte';
	import HeaderBackground from '$lib/assets/bannerBackground.png';
</script>

<section
	class="h-80 md:h-[600px] w-full bg-background bg-contain md:bg-cover bg-no-repeat bg-bottom"
	style="background-image: url('{HeaderBackground}')"
>
	<div class="relative flex flex-col items-center justify-center h-full">
		<h1
			class="text-center text-3xl md:text-4xl lg:text-7xl text-gray-700 font-caveat font-extrabold"
		>
			Saipan's First And Finest
		</h1>

		<div
			class="rounded-full p-1 box-border mt-8 bg-white overflow-hidden ring-red-300 focus:ring-4 w-96 flex items-center"
		>
			<input
				type="text"
				class=" rounded-full px-4 focus:outline-none w-full bg-transparent"
				placeholder="Search here ......."
			/>
			<button
				class="text-sm bg-primary py-3 px-6 rounded-full text-white poppins ring-red-300 focus:ring-4 transition duration-300 hover:scale-105 transform"
				>Search</button
			>
		</div>
	</div>
	<!-- <div class="relative -top-[2rem] mb-6"><WavyDivider /></div> -->
</section>

<style>
	.header-banner {
		background-image: url('$lib/assets/bannerBackground.png');
		height: 600px !important;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
	.banner {
		background-image: url('../assets/bannerbackground.png');
	}
</style>

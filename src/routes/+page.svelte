<script>
	import Section from '$lib/components/common/Section.svelte';
	import FoodItems from '$lib/components/FoodItems.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import NewMap from '$lib/components/Map/NewMap.svelte';
	import Navbar from '$lib/components/navbars/Navbar.svelte';
	import NewNavbar from '$lib/components/navbars/NewNavbar.svelte';
	import Header from '../lib/components/Header.svelte';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<!-- <Navbar /> -->
<NewNavbar />
<Header />
<FoodItems />
<Gallery />
<Section>
	<NewMap />
</Section>
<Footer />

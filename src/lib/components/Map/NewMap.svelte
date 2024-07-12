<script lang="ts">
	import { onMount } from 'svelte';
	import CompanyNumber from '../common/CompanyNumber.svelte';
	import CompanyAddress from '../common/CompanyAddress.svelte';

	// https://maps.apple.com/?address=Airport%20Road,%20San%20Vicente,%20Northern%20Mariana%20Islands&auid=7781500312549419017&ll=15.142735,145.730424&lsp=9902&q=Herman's%20Modern%20Bakery

	export let apiKey: string = 'AIzaSyBBUGFvsSJJ8yPLOZbOGafn-_Fzg4hYWiM';
	export let lat: number = 15.14305786427874; //
	export let lng: number = 145.7304914448438;
	export let address: string =
		'4PVJ+453, 500002 Tun Herman Pan Rd., Dan Dan, Saipan 96950, Northern Mariana Islands';
	export let oldAddress: string =
		'5040 Chalan Tun Herman Pan PO Box 500002 96950 Saipan, Northern Mariana Islands, Northern Mariana Islands';

	let mapElement: HTMLDivElement;
	let map: google.maps.Map;
	let mapLoaded = false;

	onMount(() => {
		const loadGoogleMapsScript = () => {
			return new Promise<void>((resolve, reject) => {
				const script = document.createElement('script');
				script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&v=weekly`;
				script.async = true;
				script.defer = true;
				script.onerror = () => reject(new Error('Google Maps script failed to load'));
				window.initMap = () => {
					resolve();
				};
				document.head.appendChild(script);
			});
		};

		const initMap = async () => {
			try {
				await loadGoogleMapsScript();
				const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;
				const { AdvancedMarkerElement } = (await google.maps.importLibrary(
					'marker'
				)) as google.maps.MarkerLibrary;

				map = new Map(mapElement, {
					center: { lat, lng },
					zoom: 16,
					mapId: 'DEMO_MAP_ID' // Replace with your actual Map ID
				});

				new AdvancedMarkerElement({
					map,
					position: { lat, lng },
					title: 'Restaurant Location'
				});

				mapLoaded = true;
			} catch (error) {
				console.error('Error initializing map:', error);
			}
		};

		initMap();
	});

	function zoomIn() {
		if (map) {
			map.setZoom((map.getZoom() || 0) + 1);
		}
	}

	function zoomOut() {
		if (map) {
			map.setZoom((map.getZoom() || 0) - 1);
		}
	}

	function openGoogleMaps() {
		const encodedAddress = encodeURIComponent(address);
		window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
	}

	function openAppleMaps() {
		const encodedAddress = encodeURIComponent(address);
		window.open(
			"https://maps.apple.com/?address=Airport%20Road,%20San%20Vicente,%20Northern%20Mariana%20Islands&auid=7781500312549419017&ll=15.142735,145.730424&lsp=9902&q=Herman's%20Modern%20Bakery",
			'_blank'
		);
		// window.open(`http://maps.apple.com/?q=${encodedAddress}`, '_blank');
	}
</script>

<div class="flex flex-col md:flex-row h-[50vh] bg-background-light">
	<div
		class="bg-white p-4 rounded-xl w-full md:w-2/3 shadow-xl hover:scale-[101%] transition duration-300 ease-in-out"
	>
		<div bind:this={mapElement} class="w-full h-full"></div>
	</div>
	<div class="w-full md:w-1/3 p-4 flex flex-col">
		<h2 class="text-3xl font-bold mb-4 font-dela-gothic-one">Come Visit Us</h2>
		<p class="text-md text-stone-600 pb-4"><CompanyAddress /></p>

		<div class="flex space-x-2 mb-4">
			<button
				on:click={openGoogleMaps}
				class="bg-brand text-white px-4 py-2 flex rounded-full shadow-lg font-dela-gothic-one items-center hover:scale-105 transition duration-300 ease-in-out"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-8 mr-2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
					/>
				</svg>

				Get Directions
			</button>
		</div>
		{#if mapLoaded}
			<!-- <div class="mt-4">
				<button on:click={zoomIn} class="bg-blue-500 text-white px-4 py-2 rounded mr-2">
					Zoom In
				</button>
				<button on:click={zoomOut} class="bg-blue-500 text-white px-4 py-2 rounded">
					Zoom Out
				</button>
			</div> -->
		{:else}
			<p>Map is loading...</p>
		{/if}
	</div>
</div>

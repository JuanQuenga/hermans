<script lang="ts">
	import { onMount } from 'svelte';
	import Logo from '$lib/assets/logo-filled.svg';
	import NavLink from '../Navbar/NavLink.svelte';

	let scrollY: number = 0;
	$: hasScrolled = scrollY > 25;
</script>

<svelte:window bind:scrollY />

<header
	class:bg-brand={hasScrolled}
	class="fixed z-50 top-0 left-0 w-full transition duration-500 font-dela-gothic-one"
>
	<div class="relative w-full">
		<nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="border-none transition duration-300">
				<div class="flex h-16 items-center justify-between">
					<!-- Left side nav links -->
					<NavLink bind:hasScrolled>About</NavLink>
					<NavLink bind:hasScrolled>Catering</NavLink>

					<!-- Logo container -->
					<a tabindex="0" href="#" class="flex h-full transition-all duration-300 ease-in-out">
						<span class="sr-only">Hermans</span>
						<img
							class:scale-[60%]={hasScrolled}
							class:top-20={hasScrolled}
							class:mt-0={hasScrolled}
							class="w-auto h-28 mt-2 drop-shadow-lg transition duration-300"
							src={Logo}
							alt=""
						/>
					</a>

					<!-- Right side nav links -->
					<NavLink bind:hasScrolled>Café</NavLink>
					<NavLink bind:hasScrolled>Bakery</NavLink>
				</div>
			</div>
		</nav>
	</div>
</header>

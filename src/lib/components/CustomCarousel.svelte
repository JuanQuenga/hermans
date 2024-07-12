<script>
	import { onMount, tick } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { days } from '$lib/data/cafe.json';
	import RandomPlatePhoto from './common/RandomPlatePhoto.svelte';

	const daysOfTheWeek = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];

	const now = new Date();
	const currentDay = daysOfTheWeek[now.getDay()];
	function isToday(day) {
		return currentDay === day;
	}

	let currentIndex = 0;
	let direction = 1;
	async function nextSlide() {
		direction = 50;
		await tick();
		currentIndex = (currentIndex + 1) % days.length;
	}
	async function prevSlide() {
		direction = -1;
		await tick();
		currentIndex = (currentIndex - 1 + days.length) % days.length;
	}
	$: visibleMenus = [
		days[(currentIndex - 1 + days.length) % days.length],
		days[currentIndex],
		days[(currentIndex + 1) % days.length]
	];

	onMount(() => {
		const interval = setInterval(nextSlide, 5000);
		return () => clearInterval(interval);
	});
</script>

<div class="w-full m-4">
	<div class="mx-auto">
		<div class="relative">
			<div class="flex items-center justify-between">
				<div class="flex space-x-4 w-full">
					{#each visibleMenus as menu, i (menu.day)}
						{#if i < 3}
							<div
								class="flex-1 rounded-2xl p-4 shadow-lg transition-all duration-300 ease-out border-2 border-gray-100"
								class:bg-pink-200={isToday(menu.day)}
								class:border-brand={menu.day === days[currentIndex].day}
								in:fly={{ x: 100 * direction, duration: 300, easing: cubicOut }}
								out:fly={{ x: -100 * direction, duration: 300, easing: cubicOut }}
							>
								<p class="text-sm text-gray-600">{menu.theme}</p>
								<h2 class="text-xl font-bold mb-2">{menu.day}</h2>
								<div class="px-4"><RandomPlatePhoto /></div>
								<div class=" pt-4 pb-2">
									{#each menu.items as item}
										<span
											class="inline-block bg-brand text-white rounded-r-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
											>{item}</span
										>
									{/each}
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>

		<div class="flex justify-center mt-4 space-x-2">
			<button
				on:click={prevSlide}
				class="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>

			<div class="flex items-center space-x-2 px-2">
				{#each days as weekday, i (weekday.day)}
					<button
						class="cursor-pointer rounded-full px-2"
						class:font-bold={i === currentIndex}
						class:bg-brand={i === currentIndex}
						class:text-white={i === currentIndex}
						on:click={() => (currentIndex = i)}
					>
						{weekday.day.slice(0, 3)}
					</button>
				{/each}
			</div>

			<button
				on:click={nextSlide}
				class="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>
	</div>
</div>

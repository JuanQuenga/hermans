<script>
	export let href = '#';
	export let active = false;
	export let tabindex = undefined;
	export let hasScrolled = false;
</script>

<div
	class:hover:border-brand={!hasScrolled}
	class:hover:border-white={hasScrolled}
	class="h-full border-b-8 border-transparent transition duration-500"
>
	<a
		{href}
		tabindex="0"
		class:text-gray-700={!hasScrolled}
		class:text-white={hasScrolled}
		class="flex drop-shadow-lg h-full items-center text-xl font-bold hover:scale-125 transition duration-300"
	>
		<slot />
	</a>
</div>

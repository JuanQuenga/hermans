<script>
	import Logo from '$lib/components/Logo.svelte';
	import LogoSvg from '$lib/assets/logo-filled.svg';
</script>

<!-- <header
		? 'bg-white fixed z-50 top-0 left-0 w-full shadow-md transition duration-500'
		: 'bg-transparent fixed z-50 top-0 left-0 w-full transition duration-500'}
> -->
<header class="bg-transparent fixed z-50 top-0 left-0 w-full transition duration-500">
	<nav class="flex items-center max-w-screen-xl mx-auto px-6 py-3">
		<!-- {/* left  */} -->
		<div class="flex flex-grow">
			<!-- <svg class="w-36 cursor-pointer" src={logo} alt="logo" /> -->
			<!-- <Logo classes="text-red-400" /> -->
			<img src={LogoSvg} alt="logo" class="w-20 cursor-pointer" />
		</div>
		<!-- {/* right  */} -->
		<!-- {user.displayName ? ( -->
		<!-- <> -->
		<!-- <div class="flex items-center justify-end space-x-4">
      <NavLink to="/admin" class="text-gray-600">Admin</NavLink>
      <div class="relative flex cursor-pointer" onClick={() => history.push('/orders')}>
          <span class="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white poppins absolute -right-2 -top-2">{order.length}</span>
          <BsCart2 class="cursor-pointer w-6 h-6 text-gray-700" />
      </div>
      <img src={user.photoURL} alt={user.displayName} class="w-10 h-10 rounded-full" />
      <p class="text-gray-700 poppins hidden md:block lg:block">{user.displayName}</p>
      <FiLogOut class="cursor-pointer w-6 h-6 text-gray-700" onClick={signOutUser} />
  </div> -->
		<div class="flex items-center justify-end space-x-6">
			<button class="poppins">Sign In</button>
			<button
				class=" bg-primary px-6 py-3 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"
				>Sign Up</button
			>
		</div>
	</nav>
</header>

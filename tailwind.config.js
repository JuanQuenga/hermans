/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				background: '#FCF4E0',
				'background-light': '#FFFBF0',
				'background-dark': '#faefd1',
				brand: '#f11a23'
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				'dela-gothic-one': ['Dela Gothic One'],
				caveat: ['Caveat', 'cursive']
			}
		}
	},
	plugins: []
};

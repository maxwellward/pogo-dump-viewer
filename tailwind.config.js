/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['Manrope', 'sans'],
		},
		extend: {
			colors: {
				// I need better names for these
				title: '#F6866A',
				primary: '#23262F',
				secondary: '#6A6C73',
				active: '#6956E5',
				inactive: '#878787',
				background: {
					secondary: `#F9F9F9`,
				},
			},
		},
	},
	plugins: [],
};

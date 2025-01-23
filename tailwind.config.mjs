/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'bg-primary': 'var(--bg-body)',
				'bg-secondary': 'var(--bg-header)',
				'text-primary': 'var(--text-primary)',
				'text-secondary': 'var(--text-secondary)',
			},
		},
	},
	plugins: [],
}

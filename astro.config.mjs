// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "its'khem",
			social: {
				github: 'https://github.com/Khemraj9815/itskhemblog',
			},
			sidebar: [
				{
					label: 'Linux',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Linux Fundamentals', slug: 'hackthebox/linux' },
						{label: "Linux Distros", slug: 'hackthebox/linux_distros'},
						{label: "Shell", slug: "hackthebox/shell"},
						{label: "Getting Help", slug: "hackthebox/gettinghelp"},
						{label: "System Information", slug: "hackthebox/systeminfo"},
						{label: "Navigation", slug: "hackthebox/navigation"},
						{label: "Managing file and Directory", slug: "hackthebox/workingwfnd"},
						
					],
				},
				{
					label: 'HACKTHEBOX MACHINE',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'CAP', slug: 'htbmachine/cap' },
						{ label: 'CHEMISTRY', slug: 'htbmachine/chemistry' },
					],
				},
				// {
				// 	label: 'Guides',
				// 	items: [
				// 		// Each item here is one entry in the navigation menu.
				// 		{ label: 'Example Guide', slug: 'guides/example' },
				// 	],
				// },
				// {
				// 	label: 'Reference',
				// 	autogenerate: { directory: 'reference' },
				// },
			],
		}),
	],
});

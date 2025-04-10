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
						{ label: 'TITANIC', slug: 'htbmachine/titanic' },
						{ label: 'Link Vortex', slug: 'htbmachine/linkvortex' },
						{label: "TwoMillion", slug: "htbmachine/2million"},	
						{label: "Active", slug: "htbmachine/active"},	
						{label: "CICADA", slug: "htbmachine/cicada"},						
						{label: "Blue", slug: "htbmachine/blue"},
						{label: "Oopsie", slug: "htbmachine/oopsie"}						

					],
				},
				{
					label: 'TRYHACKME',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Hakcer Vs H4ck3r', slug: 'tryhackme/hackervshacker' },
						{ label: 'Cyborg', slug: 'tryhackme/cyborg' },
						{ label: 'Opacity', slug: 'tryhackme/opacity' },
						{ label: 'Mr Robot', slug: 'tryhackme/mrrobot' },
						{ label: 'Brooklyn Nine Nine', slug: 'tryhackme/brooklyn99' },
						{ label: 'CHILL HACK', slug: 'tryhackme/chillhack' },
						{ label: 'AGENT SUDO', slug: 'tryhackme/agentsudo' },
						{ label: 'Bolt', slug: 'tryhackme/bolt' },
						{ label: 'HA Joker CTF', slug: 'tryhackme/joker' },

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

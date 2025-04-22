// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "its'khem",
			social: [
			 {
				icon: 'github', label: 'GitHub', href: 'https://github.com/Khemraj9815/itskhemblog',
			},
		],
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
						{label: "editing file", slug:"hackthebox/edit"},
						{label: "find file", slug:"hackthebox/findfile"},
						{label: "Filter Content", slug:"hackthebox/filtercontent"},
						{label: "Regular Expression", slug:"hackthebox/regularexpression"},
						{label: "Permission Management", slug:"hackthebox/permission"},

						
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
						{label: "Active Directory Basics", slug: "tryhackme/activedir"}

					],
				},
				{
					label: 'Nmap',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Intro to Nmap', slug: 'nmap/intro' },
						{ label: 'Host Discovery', slug: 'nmap/hostdiscovery' },
						{ label: 'Host and Port Scan', slug: 'nmap/hostandportscan' },
						{ label: 'Saving Result', slug: 'nmap/saveresult' },
						{ label: "Service Enumeration", slug: "nmap/serviceenu"},
						{label: "Nmap Scripting Engine", slug: "nmap/nmapscripteng"}
						


					],
				},
				{
					label: 'Foot Printing',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Enumeration Principles', slug: 'footprinting/enumerationp' },
						{ label: 'Enumeration Methodlogy', slug: 'footprinting/enummethod' },
						{ label: 'Domain Information', slug: 'footprinting/domaininfo' },
						{ label: 'Cloud Resources', slug: 'footprinting/cloudres' },
						{ label: "STAFF", slug: "footprinting/staff"},
						{label: "FTP", slug: "footprinting/ftp"}
						


					],
				},
				{
					label: 'Information Gathering - Web Edition',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Introduction', slug: 'infoweb/intro' },
						{ label: 'UTILIZING WHOIS', slug: 'infoweb/utiwhois' },
						{ label: 'DNS', slug: 'infoweb/dns' },
						{ label: 'Subdomain', slug: 'infoweb/subdomain' },
						{ label: "Digging DNS", slug: "infoweb/digdns"},
						{label: "Subdomain Brute-forcing", slug: "infoweb/subdomainbrutef"}
						


					],
				},
				// {
				// 	label: 'Reference',
				// 	autogenerate: { directory: 'reference' },
				// },
			],
		}),
	],
});

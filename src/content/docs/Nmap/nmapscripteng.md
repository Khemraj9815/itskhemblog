---
title: Nmap Scripting Engine
description: nmap script engine
---

The Nmap Scripting Engine (NSE) enables the creation of Lua scripts to interact with services, organized into 14 distinct categories

| **Category** | **Description** |
| --- | --- |
| `auth` | Determination of authentication credentials. |
| `broadcast` | Scripts used for host discovery via broadcasting; discovered hosts can be automatically added to remaining scans. |
| `brute` | Executes scripts that attempt to log in to services using brute-force credential attacks. |
| `default` | Default scripts executed with the `-sC` option. |
| `discovery` | Evaluation of accessible services. |
| `dos` | Checks services for denial-of-service (DoS) vulnerabilities. Use with caution as they may harm target services. |
| `exploit` | Tries to exploit known vulnerabilities on the scanned ports. |
| `external` | Scripts that interact with external services for additional processing. |
| `fuzzer` | Sends various unexpected fields to identify vulnerabilities or abnormal behavior; may be time-consuming. |
| `intrusive` | Scripts that could negatively impact or disrupt the target system. |
| `malware` | Checks if the target system is infected with known malware. |
| `safe` | Non-intrusive scripts that avoid harmful or aggressive actions. |
| `version` | Extends service detection with more detailed versioning information. |
| `vuln` | Identifies specific known vulnerabilities on the target. |

We have several ways to define the desired scripts in Nmap.

### Default Scripts

```python
[!bash!]$ sudo nmap <target> -sC
```

### Specific Scripts Category

```python
[!bash!]$ sudo nmap <target> --script <category>
```

- learn about types of scripts

### Defined Scripts

```python
[!bash!]$ sudo nmap <target> --script <script-name>,<script-name>,...
```

- we can define multiple scripts

### Nmap - Specifying Scripts

```python
[!bash!]$ sudo nmap 10.129.2.28 -p 25 --script banner,smtp-commands

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-16 23:21 CEST
Nmap scan report for 10.129.2.28
Host is up (0.050s latency).

PORT   STATE SERVICE
25/tcp open  smtp
|_banner: 220 inlane ESMTP Postfix (Ubuntu)
|_smtp-commands: inlane, PIPELINING, SIZE 10240000, VRFY, ETRN, STARTTLS, ENHANCEDSTATUSCODES, 8BITMIME, DSN, SMTPUTF8,
MAC Address: DE:AD:00:00:BE:EF (Intel Corporate)
```

| **Scanning Option** | **Description** |
| --- | --- |
| `10.129.2.28` | Scans the specified target. |
| `-p 25` | Scans only the specified port. |
| `--script banner,smtp-commands` | Uses specified NSE scripts (`banner`, `smtp-commands`). |

As we can see the banner script in Nmap helps to identify the OS on target system, while the smtp-commands script shows available commands for smtp server, potentially revealing user info. The aggressive scan (-A) combines several scans: (-sV), (-O), traceroute(—traceroute) and default NSE scripts (-sC) for compressive assessment.

### Nmap - Aggressive Scan

```python
[!bash!]$ sudo nmap 10.129.2.28 -p 80 -A
Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-17 01:38 CEST
Nmap scan report for 10.129.2.28
Host is up (0.012s latency).

PORT   STATE SERVICE VERSION
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-generator: WordPress 5.3.4
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: blog.inlanefreight.com
MAC Address: DE:AD:00:00:BE:EF (Intel Corporate)
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Aggressive OS guesses: Linux 2.6.32 (96%), Linux 3.2 - 4.9 (96%), Linux 2.6.32 - 3.10 (96%), Linux 3.4 - 3.10 (95%), Linux 3.1 (95%), Linux 3.2 (95%), 
AXIS 210A or 211 Network Camera (Linux 2.6.17) (94%), Synology DiskStation Manager 5.2-5644 (94%), Netgear RAIDiator 4.2.28 (94%), 
Linux 2.6.32 - 2.6.35 (94%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 1 hop

TRACEROUTE
HOP RTT      ADDRESS
1   11.91 ms 10.129.2.28

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 11.36 seconds
```

Using the aggressive scan option (-A), Nmap identified the web server (Apache 2.4.29), web application (WordPress 5.3.4), and the webpage title ([blog.inlanefreight.com](http://blog.inlanefreight.com/)). It also estimated a 96% likelihood that the system is running Linux. 

# **Vulnerability Assessment**

Now let us move on to HTTP port 80 and see what information and vulnerabilities we can find using the vuln category from NSE.

```bash
[!bash!]$ sudo nmap 10.129.2.28 -p 80 -sV --script vuln 

Nmap scan report for 10.129.2.28
Host is up (0.036s latency).

PORT   STATE SERVICE VERSION
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
| http-enum:
|   /wp-login.php: Possible admin folder
|   /readme.html: Wordpress version: 2
|   /: WordPress version: 5.3.4
|   /wp-includes/images/rss.png: Wordpress version 2.2 found.
|   /wp-includes/js/jquery/suggest.js: Wordpress version 2.5 found.
|   /wp-includes/images/blank.gif: Wordpress version 2.6 found.
|   /wp-includes/js/comment-reply.js: Wordpress version 2.7 found.
|   /wp-login.php: Wordpress login page.
|   /wp-admin/upgrade.php: Wordpress login page.
|_  /readme.html: Interesting, a readme.
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-stored-xss: Couldn't find any stored XSS vulnerabilities.
| http-wordpress-users:
| Username found: admin
|_Search stopped at ID #25. Increase the upper limit if necessary with 'http-wordpress-users.limit'
| vulners:
|   cpe:/a:apache:http_server:2.4.29:
|     	CVE-2019-0211	7.2	https://vulners.com/cve/CVE-2019-0211
|     	CVE-2018-1312	6.8	https://vulners.com/cve/CVE-2018-1312
|     	CVE-2017-15715	6.8	https://vulners.com/cve/CVE-2017-15715
<SNIP>
```

| **Scanning Option** | **Description** |
| --- | --- |
| `--script vuln` | Uses all related scripts from the `vuln` category to find vulnerabilities. |

last scan’s script interacted with the web server and application to gather version details and check for known vulnerabilities
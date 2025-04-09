---
title: Oopsie
description: Oopsie walkthrough
---

Difficulty: Very Easy

![image.png](../../../assets/Oopsie/image.png)

## Information Gathering Phase

### Nmap

```python
khemrajghalley@pop-os:~$ nmap -sVC 10.129.119.82
Starting Nmap 7.80 ( https://nmap.org ) at 2024-12-06 09:30 +06
Nmap scan report for 10.129.119.82
Host is up (0.30s latency).
Not shown: 997 closed ports
PORT     STATE    SERVICE       VERSION
22/tcp   open     ssh           OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 61:e4:3f:d4:1e:e2:b2:f1:0d:3c:ed:36:28:36:67:c7 (RSA)
|   256 24:1d:a4:17:d4:e3:2a:9c:90:5c:30:58:8f:60:77:8d (ECDSA)
|_  256 78:03:0e:b4:a1:af:e5:c2:f9:8d:29:05:3e:29:c9:f2 (ED25519)
80/tcp   open     http          Apache httpd 2.4.29 ((Ubuntu))
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Welcome
3871/tcp filtered avocent-adsap
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

found 2 ports open, port 22 ssh and port 80 http. lets visit port 80 using browser

![image.png](../../../assets/Oopsie/image%201.png)

![image.png](../../../assets/Oopsie/image%202.png)

This information shows that this website has login page 

![image.png](../../../assets/Oopsie/image%203.png)

in the scan it is not not showing the hidden directory

![image.png](../../../assets/Oopsie/image%204.png)

this are the hidden directories, I liked how hidden directories are found

![image.png](../../../assets/Oopsie/image%205.png)

we don’t have legitimate credential to login, so lets try to login as guest 

![image.png](../../../assets/Oopsie/image%206.png)

Since we are logged in as Guest User, we don’t have enough privilege to navigate where ever we want. We need to find a way to escalate privilege from Guest to main Admin. So it definitely work based on role. One way to try this is if we can manipulate cookie and sessions.

![image.png](../../../assets/Oopsie/image%207.png)

![image.png](../../../assets/Oopsie/image%208.png)

![image.png](../../../assets/Oopsie/image%209.png)

![image.png](../../../assets/Oopsie/image%2010.png)

Now we know the access ID for the admin, lets visit the page that were not able to visit earlier. Before that don’t forget to replace role and access ID that we got for admin.

![image.png](../../../assets/Oopsie/image%2011.png)

Now lets try to upload reverse shell

![image.png](../../../assets/Oopsie/image%2012.png)

now lets go to uploads and give the endpoint shell.php

![image.png](../../../assets/Oopsie/image%2013.png)

![image.png](../../../assets/Oopsie/image%2014.png)

got the shell as www-data

![image.png](../../../assets/Oopsie/image%2015.png)

these are the file that for the web page I guess

![image.png](../../../assets/Oopsie/image%2016.png)

As expected we got credential for user robert. Lets login to user robert

![image.png](../../../assets/Oopsie/image%2017.png)

This is regarding the bugtracker, which I am hearing for the first time. Lets check it out how it react.

![image.png](../../../assets/Oopsie/image%2018.png)

![image.png](../../../assets/Oopsie/image%2019.png)

we can see here it is checking for hello file or directory. We can let it read root.txt file.

![image.png](../../../assets/Oopsie/image%2020.png)

There we go! The Oopsie has been pawned.

## Final Thought

This room was awesome, it is teaching the basic things like session manipulation, I liked this part. Though I see follow the official write-up, it gives a precise direction/thoughts on what to next or what need to be done according to situations. So I would like to recommend this room to my friend who is at my level. Thank You…
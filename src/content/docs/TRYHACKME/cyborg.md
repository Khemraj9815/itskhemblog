---
title: CYBORG
decription: cyborg walkthrough
---

September 17, 2024 

Level: Easy

![image.png](../../../assets/CYBORG/image.png)

**Information Gathering Phase**

**Nmap**

PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http

2 ports open 

port 22 is less vulnerable unless we get correct credential for it.

So, lets check for web 

**Gobuster** 

![image.png](../../../assets/CYBORG/image%201.png)

lets check for admin and then etc. it seems interesting.

![image.png](../../../assets/CYBORG/image%202.png)

![image.png](../../../assets/CYBORG/image%203.png)

Lets sneak around to find something useful.

![image.png](../../../assets/CYBORG/image%204.png)

I got something to download

before analyzing downloaded file lets see ‘etc’ directory

![image.png](../../../assets/CYBORG/image%205.png)

![image.png](../../../assets/CYBORG/image%206.png)

got two files
lets see what message it can provide

![image.png](../../../assets/CYBORG/image%207.png)

this is what I got. it seems like hash. I might need it. lets try to crack it using john 

![image.png](../../../assets/CYBORG/image%208.png)

![image.png](../../../assets/CYBORG/image%209.png)

I have cracked the hash. I don’t know where to use this password.

![image.png](../../../assets/CYBORG/image%2010.png)

this is what I got in squid.conf file

now lets check what we got in the file what we downloaded earlier.

when I extract the file it is gives new directory called home and it contain bunch of other files.

![image.png](../../../assets/CYBORG/image%2011.png)

![image.png](../../../assets/CYBORG/image%2012.png)

Ooo lots of like to see. lets check one by one.

![image.png](../../../assets/CYBORG/image%2013.png)

It doesn’t make sense. I don’t know what is this.

![image.png](../../../assets/CYBORG/image%2014.png)

![image.png](../../../assets/CYBORG/image%2015.png)

this is what I got from given link.

It says that it is used for backup.

let me read this document usage as I am already done with installation.

![image.png](../../../assets/CYBORG/image%2016.png)

it says that we are able to get information on the repository.

![image.png](../../../assets/CYBORG/image%2017.png)

wow it is really something to do with those files.

it needs password to open. ahh I remember we crack a hash earlier. may be that could be the password.

![image.png](../../../assets/CYBORG/image%2018.png)

thank god it worked. it is just the detail of the file inside the archive file.

there is a option “list” lets see what we got.

![image.png](../../../assets/CYBORG/image%2019.png)

oohhh there is a file called “music_archive” 

![image.png](../../../assets/CYBORG/image%2020.png)

The borg document is important for us to find the details of archive file.

![image.png](../../../assets/CYBORG/image%2021.png)

we got new directory called “home”. lets see what we got there.

![image.png](../../../assets/CYBORG/image%2022.png)

we got more directory to see.

![image.png](../../../assets/CYBORG/image%2023.png)

we got note.txt and secret.txt. lets see what we got here.

![image.png](../../../assets/CYBORG/image%2024.png)

![image.png](../../../assets/CYBORG/image%2025.png)

woah 😮😮😮 it looks like sensitive credential. 

now lets try to login to ssh as we have seen it open earlier.

![image.png](../../../assets/CYBORG/image%2026.png)

we are able to login to alex

![image.png](../../../assets/CYBORG/image%2027.png)

![image.png](../../../assets/CYBORG/image%2028.png)

we got user.txt

![image.png](../../../assets/CYBORG/image%2029.png)

we got hint for root.txt

![image.png](../../../assets/CYBORG/image%2030.png)

we will be able to run the file above without needing root 

![image.png](../../../assets/CYBORG/image%2031.png)

we gonna take advantage of this script.

![image.png](../../../assets/CYBORG/image%2032.png)

lets change the permission for “backup.sh” to make changes.

![image.png](../../../assets/CYBORG/image%2033.png)

![image.png](../../../assets/CYBORG/image%2034.png)

since we can execute the file(backup.sh) as root without using password  I have made changes on the script which will change to root.

![image.png](../../../assets/CYBORG/image%2035.png)

There we go.

![image.png](../../../assets/CYBORG/image%2036.png)

**Final Thought**

This room is pretty good for beginner! Bit difficult to reach near the root user. But easy to get root access.  I would recommend this room to someone who has done a few lessons.

See you😉😉😉

![0_itpzC5GEVl-EOaax.gif](../../../assets/CYBORG/0_itpzC5GEVl-EOaax.gif)

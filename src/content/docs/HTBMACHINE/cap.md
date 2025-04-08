---
title: CAP
description: walkthrough
---
# CAP

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image.png)

### Summary

Initial state

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%201.png)

### Recon

lets do a simple nmap scan

![nmap scan](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%202.png)

nmap scan

1. How many TCP ports are open?
    
    ⇒ 3
    

1. After running a "Security Snapshot", the browser is redirected to a path of the format /[something]/[id], where [id] represents the id number of the scan. What is the [something]?
    
    ⇒ data
    

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%203.png)

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%204.png)

feels like noting to do with it

while checking the feature and content of the website 

there was a download feature which downloads .pcap file

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%205.png)

I remember this kind of file while doing tryhackme room long time back

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%206.png)

config 

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%207.png)

network status

![inter-process communication on the system](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%208.png)

inter-process communication on the system

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%209.png)

brute-forcing the hidden directories

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2010.png)

found nothing

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2011.png)

try to see the request and response from the burp suite, still nothing

I know that there is port 21 ftp is open 

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2012.png)

anonymous user is not allowed 

hint*

1. What is the ID of the PCAP file that contains sensitive data?

tried 7 at first but didn’t work 

I check for the pcap file with id 7

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2013.png)

there is noting. that means this is not the main file with sensitive data

that means the data/[id] can be changed 

I tried another number instead of 7

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2014.png)

tried 6 but didn’t work

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2015.png)

there was ssh protocol used.

the information is not readable 

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2016.png)

it was encrypted 

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2017.png)

not possible to make it readable because we don’t have private key

need to change the data id 

I submit the random answer 
tried  1, 2,… 

finally the answer was 0

**what kind of vulnerabilities is this?**

IDOR

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2018.png)

downloaded the file and inspect it using wire shark 

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2019.png)

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2020.png)

Buck3tH4TF0RM3!

there we go

got the credential for user nathan

the credential was for ftp

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2021.png)

logged into ftp and got the user flag.txt

there were file that attacker have written to escalate privilege 

since there is port 22 ssh is open, I search for ssh traffic 

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2022.png)

no traffic for ssh

let me give it a try with ftp password

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2023.png)

oh it worked 

### Lateral Movement

Q. What is the full path to the binary on this machine has special capabilities that can be abused to obtain root privileges?

hint* ⇒ linpeas

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2024.png)

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2025.png)

automated task that runs at specific time as a root

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2026.png)

![network info](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2027.png)

network info

![only user nathan exist](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2028.png)

only user nathan exist

![these user can execute bash file](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2029.png)

these user can execute bash file

there is new user called “pooler” with id 1002

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2030.png)

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2031.png)

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2032.png)

cap_setuid ⇒ allows changing user ID without needing root

cap_net_bind_service ⇒ it allows the normal user to access important ports 

In this blog they are setting the environment to perform this vulnerability attack 

[Potential Privilege Escalation via Python cap_setuid | Elastic Security Solution [8.17] | Elastic](https://www.elastic.co/guide/en/security/8.17/potential-privilege-escalation-via-python-cap-setuid.html)

Practical Example 

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2033.png)

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2034.png)

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2035.png)

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2036.png)

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2037.png)

I am confident that this vulnerability exists, which can be used to change the normal user ID to root 

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2038.png)

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2039.png)

[Gtfobins](https://gtfobins.github.io/gtfobins/python/?source=post_page-----eb9c97f2259c---------------------------------------#capabilities)

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2040.png)

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2041.png)

This is the script that I found, which was uploaded by attacker 

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2042.png)

When I run the python script it gives same result. I forgot to see the malicious code.

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2043.png)

![image.png](../../../assets/CAP%201a8ab0f53d1d803296a5c07f9b264669/image%2044.png)
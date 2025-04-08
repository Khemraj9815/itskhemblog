---
title: CICADA
description: cicada walkthrough
---

Difficulty: Windows Easy Machine

![image.png](../../../assets/CACIDA/image.png)

### Initial State

![image.png](../../../assets/CACIDA/image%201.png)

### Recon

**Nmap**

![image.png](../../../assets/CACIDA/image%202.png)

![image.png](../../../assets/CACIDA/image%203.png)

there are 11 ports open. Now I don’t really care how many ports are open in the window machine, I just have to see whether smb port is open or not. Since it is most used in every machine. 

![image.png](../../../assets/CACIDA/image%204.png)

![image.png](../../../assets/CACIDA/image%205.png)

![image.png](../../../assets/CACIDA/image%206.png)

this is about the password changing method for the new developer where default password is given up there. Now I have to Enumerate the domain users with Impacket's lookupsid or netexec. 

![image.png](../../../assets/CACIDA/image%207.png)

For this I used the walk through to brute-force enumerate domain usernames by using RID enumeration. So that I can have list of username.

![image.png](../../../assets/CACIDA/image%208.png)

![image.png](../../../assets/CACIDA/image%209.png)

```bash
┌──(khem㉿kali)-[~]
└─$ crackmapexec smb cicada.htb -u anonymous -p '' --rid-brute
[*] First time use detected
[*] Creating home directory structure
[*] Creating default workspace
[*] Initializing RDP protocol database
[*] Initializing FTP protocol database
[*] Initializing MSSQL protocol database
[*] Initializing LDAP protocol database
[*] Initializing SSH protocol database
[*] Initializing WINRM protocol database
[*] Initializing SMB protocol database
[*] Copying default configuration file
[*] Generating SSL certificate
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        [*] Windows Server 2022 Build 20348 x64 (name:CICADA-DC) (domain:cicada.htb) (signing:True) (SMBv1:False)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        [+] cicada.htb\anonymous: 
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        [+] Brute forcing RIDs
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        498: CICADA\Enterprise Read-only Domain Controllers (SidTypeGroup)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        500: CICADA\Administrator (SidTypeUser)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        501: CICADA\Guest (SidTypeUser)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        502: CICADA\krbtgt (SidTypeUser)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        512: CICADA\Domain Admins (SidTypeGroup)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        513: CICADA\Domain Users (SidTypeGroup)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        514: CICADA\Domain Guests (SidTypeGroup)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        515: CICADA\Domain Computers (SidTypeGroup)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        516: CICADA\Domain Controllers (SidTypeGroup)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        517: CICADA\Cert Publishers (SidTypeAlias)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        518: CICADA\Schema Admins (SidTypeGroup)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        519: CICADA\Enterprise Admins (SidTypeGroup)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        520: CICADA\Group Policy Creator Owners (SidTypeGroup)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        521: CICADA\Read-only Domain Controllers (SidTypeGroup)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        522: CICADA\Cloneable Domain Controllers (SidTypeGroup)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        525: CICADA\Protected Users (SidTypeGroup)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        526: CICADA\Key Admins (SidTypeGroup)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        527: CICADA\Enterprise Key Admins (SidTypeGroup)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        553: CICADA\RAS and IAS Servers (SidTypeAlias)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        571: CICADA\Allowed RODC Password Replication Group (SidTypeAlias)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        572: CICADA\Denied RODC Password Replication Group (SidTypeAlias)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        1000: CICADA\CICADA-DC$ (SidTypeUser)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        1101: CICADA\DnsAdmins (SidTypeAlias)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        1102: CICADA\DnsUpdateProxy (SidTypeGroup)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        1103: CICADA\Groups (SidTypeGroup)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        1104: CICADA\john.smoulder (SidTypeUser)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        1105: CICADA\sarah.dantelia (SidTypeUser)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        1106: CICADA\michael.wrightson (SidTypeUser)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        1108: CICADA\david.orelious (SidTypeUser)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        1109: CICADA\Dev Support (SidTypeGroup)
SMB         CICADA-DC.cicada.htb 445    CICADA-DC        1601: CICADA\emily.oscars (SidTypeUser)
   
```

here we have list of username. Now I have to list the username and conduct password spray. 

![image.png](../../../assets/CACIDA/image%2010.png)

the response for the user michael.wrightson is different. so that should be the valid username.  Since we have password for user, we can list all the users form the domain. 

![image.png](../../../assets/CACIDA/image%2011.png)

we found that, one of the user have mentioned the password in the account description. Lets connect to the new user that we have.

![image.png](../../../assets/CACIDA/image%2012.png)

![image.png](../../../assets/CACIDA/image%2013.png)

![image.png](../../../assets/CACIDA/image%2014.png)

connected to the 10.10.11.35\\DEV 

![image.png](../../../assets/CACIDA/image%2015.png)

1. This file automates backing up a folder ‘smb’ to a destination folder ‘Backup’. To do this, they are using a credentials. So this must be the password for that user on the server. Let’s try evil-winrm. we have found the new username and password. lets see what are the shares that new user have access to. 

![image.png](../../../assets/CACIDA/image%2016.png)

![image.png](../../../assets/CACIDA/image%2017.png)

![image.png](../../../assets/CACIDA/image%2018.png)

As we can see that “SeBackupPrivilege” is enabled for the use emily.oscars.

What is SeBackupPrivilege?

SeBackupPrivilege is a special Windows permission that allows a user to create system backups. Since backups require full access to all files, this privilege bypasses security restrictions (ACLs) and grants read access to the entire file system, including sensitive files. 

[Windows Privilege Escalation: SeBackupPrivilege - Hacking Articles](https://www.hackingarticles.in/windows-privilege-escalation-sebackupprivilege/?source=post_page-----a78ff36f869d---------------------------------------)

The user "emily.oscars" can read any file on the system because they have SeBackupPrivilege. This means they can access important files like SAM and SYSTEM, which store user account details and password hashes. These files can be used to gain higher privileges on the system.

What are the SAM and SYSTEM files?

The SAM and SYSTEM files are important Windows system files that store user account details, passwords, and system settings.

- SAM (Security Account Manager):  Stores user account information and password hashes.
- SYSTEM: Contains system settings and encryption keys that protect the SAM file’s password hashes.

These files are critical for system security and can be used to recover passwords or gain higher privileges on a machine. 

To avoid detection, the user moved to the Temp folder and saved copies of the SAM and SYSTEM files there for later use.

![image.png](../../../assets/CACIDA/image%2019.png)

![image.png](../../../assets/CACIDA/image%2020.png)

we can  extract administrator hash from these two files

![image.png](../../../assets/CACIDA/image%2021.png)

Now we got the administrator hash, lets login as administrator using Evil-WinRM

![image.png](../../../assets/CACIDA/image%2022.png)

got the root flag 

![image.png](../../../assets/CACIDA/image%2023.png)

![image.png](../../../assets/CACIDA/image%2024.png)

![image.png](../../../assets/CACIDA/image%2025.png)

### Learning

Now I am being familiar with the windows machine, which introduce new tool to deal with it. More over in every machine I am getting new concepts like for now is SAM database which is just like shadow file in linux. Whatever we find in linux its different in windows, I feels like totally new environment. I am glad I can always relate to the linux OS when new thing approach. Not only that I am introduced to active directory where there will be multiple user in the same system. Windows machine feels like easy if we understand how it works compared to linux. 

### Reference

[Cicada-HTB-Walkthrough-By-Reju-Kole](https://infosecwriteups.com/cicada-htb-walkthrough-by-reju-kole-8a056b906b97)

[Cicada Walkthrough — HackTheBox](https://infosecwriteups.com/cicada-walkthrough-hackthebox-a78ff36f869d)

[Cicada - HackTheBox CTF Walkthrough](https://www.youtube.com/watch?v=J5RRpRg3scc)

[Windows Privilege Escalation: SeBackupPrivilege - Hacking Articles](https://www.hackingarticles.in/windows-privilege-escalation-sebackupprivilege/?source=post_page-----a78ff36f869d---------------------------------------)

[https://github.com/fortra/impacket/blob/master/examples/secretsdump.py](https://github.com/fortra/impacket/blob/master/examples/secretsdump.py)
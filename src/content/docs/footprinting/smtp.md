---
title: SMTP
description: smtp
---

Simple Mail Transfer Protocol is an application used by mail servers to send, receive and relay outgoing email between senders and receivers. 

- by default it use port 25
- new SMTP server use other ports such as 587

MTA(main Transfer Agent)

MSA(Mail Submission Agent)

- **Authentication**: Uses SMTP-Auth to prevent spam by allowing only authorized users.
- **Email Structure:** MUA organizes email into header and body, then sends to SMTP server.
- **MTA Role**: Checks email size, scans for spam, and stores it for delivery.
- **MSA (Relay Server)**: Verifies email origin before MTA to filter invalid emails.
- **Open Relay Risk**: Mis-configuration may allow unauthorized email relaying (Open Relay Attack).

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/3af77eaa-2067-4012-8f99-416adebc73a4/61205872-ab31-4bd3-a2ee-a5494b7685e7/image.png)

SMTP has 2 disadvanteges

1. When sending an email with SMTP, you don’t get a clear delivery confirmation. Although the protocol allows for delivery notifications, the format isn’t standardized. Usually, you’ll only receive an English error message with the header if the email wasn’t delivered.
2. SMTP connections don’t authenticate users at the start, making sender addresses unreliable. This allows open SMTP relays to be exploited for spam, often using fake sender addresses (mail spoofing) to avoid detection. Today, various security methods like DKIM and SPF help prevent misuse by identifying suspicious emails and either rejecting them or moving them to the spam folder.

- Extended SMTP (ESMTP) enhances SMTP by adding encryption with TLS through the STARTTLS command after EHLO. This creates a secure, encrypted connection, allowing for safer authentication using the AUTH PLAIN method.

**Default Configuration**

```python
$ cat /etc/postfix/main.cf | grep -v "#" | sed -r "/^\s*$/d"

smtpd_banner = ESMTP Server 
biff = no
append_dot_mydomain = no
readme_directory = no
compatibility_level = 2
smtp_tls_session_cache_database = btree:${data_directory}/smtp_scache
myhostname = mail1.inlanefreight.htb
alias_maps = hash:/etc/aliases
alias_database = hash:/etc/aliases
smtp_generic_maps = hash:/etc/postfix/generic
mydestination = $myhostname, localhost 
masquerade_domains = $myhostname
mynetworks = 127.0.0.0/8 10.129.0.0/16
mailbox_size_limit = 0
recipient_delimiter = +
smtp_bind_address = 0.0.0.0
inet_protocols = ipv4
smtpd_helo_restrictions = reject_invalid_hostname
home_mailbox = /home/postfix
```

- The sending and communication are also done by special commands that cause the SMTP server to do what the user requires.

| **Command** | **Description** |
| --- | --- |
| **AUTH PLAIN** | Used to **authenticate** the client with the server using the **AUTH** extension (in plain text). |
| **HELO** | Initiates the SMTP session; the client identifies itself with its **hostname**. |
| **MAIL FROM** | Specifies the **sender's email address**. |
| **RCPT TO** | Specifies the **recipient's email address**. |
| **DATA** | Indicates the start of the **email content** (body and headers); ends with a single `.` on a line. |
| **RSET** | **Aborts** the current email transaction but **maintains the connection**. |
| **VRFY** | Verifies if a **specific email address** or user is valid. |
| **EXPN** | Checks if a **mailing list or alias** can be expanded into actual recipient addresses. |
| **NOOP** | Sends a no-operation command – server replies with an acknowledgment to keep the **connection alive**. |
| **QUIT** | **Terminates** the SMTP session cleanly. |
- to interact with the SMTP we can use telnet to initialize connections
- initialization command HELO or EHLO

**Telnet - HELO/EHLO**

```python
$ telnet 10.129.14.128 25

Trying 10.129.14.128...
Connected to 10.129.14.128.
Escape character is '^]'.
220 ESMTP Server 

HELO mail1.inlanefreight.htb

250 mail1.inlanefreight.htb

EHLO mail1

250-mail1.inlanefreight.htb
250-PIPELINING
250-SIZE 10240000
250-ETRN
250-ENHANCEDSTATUSCODES
250-8BITMIME
250-DSN
250-SMTPUTF8
250 CHUNKING
```

- the VRFY command checks for existing users on an SMTP server, but it doesn’t always provide accurate results. Some servers might return a code 252, confirming a user exists even if they don't. A complete list of SMTP response codes is available for reference.

### **Telnet - VRFY**

```python
$ telnet 10.129.14.128 25

Trying 10.129.14.128...
Connected to 10.129.14.128.
Escape character is '^]'.
220 ESMTP Server 

VRFY root

252 2.0.0 root

VRFY cry0l1t3

252 2.0.0 cry0l1t3

VRFY testuser

252 2.0.0 testuser

VRFY aaaaaaaaaaaaaaaaaaaaaaaaaaaa

252 2.0.0 aaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

- since automatic tools run pre-configured commands, their results shouldn't be fully trusted. The way an administrator configures the server can affect the outcomes, which these tools may not account for.
- When using a web proxy to connect to an SMTP server, you can send a command like this:
    
    ```python
    CONNECT 10.129.14.128:25 HTTP/1.0
    ```
    

### **Send an Email**

```python
$ telnet 10.129.14.128 25

Trying 10.129.14.128...
Connected to 10.129.14.128.
Escape character is '^]'.
220 ESMTP Server

EHLO inlanefreight.htb

250-mail1.inlanefreight.htb
250-PIPELINING
250-SIZE 10240000
250-ETRN
250-ENHANCEDSTATUSCODES
250-8BITMIME
250-DSN
250-SMTPUTF8
250 CHUNKING

MAIL FROM: <cry0l1t3@inlanefreight.htb>

250 2.1.0 Ok

RCPT TO: <mrb3n@inlanefreight.htb> NOTIFY=success,failure

250 2.1.5 Ok

DATA

354 End data with <CR><LF>.<CR><LF>

From: <cry0l1t3@inlanefreight.htb>
To: <mrb3n@inlanefreight.htb>
Subject: DB
Date: Tue, 28 Sept 2021 16:32:51 +0200
Hey man, I am trying to access our XY-DB but the creds don't work. 
Did you make any changes there?
.

250 2.0.0 Ok: queued as 6E1CF1681AB

QUIT

221 2.0.0 Bye
Connection closed by foreign host.
```

- **Purpose**: The email header contains crucial information about an email.
- **Key Information**:
    - Sender and recipient details
    - Sending and arrival times
    - Path the email took between servers
    - Content type and format
- **Mandatory Information**: Includes sender details and creation time of the email.
- **Optional Information**: Additional metadata that may be included.
- **Technical Delivery**: The header does not include information needed for the technical delivery of the email; this is handled by the transmission protocol.
- **Access**: Both sender and recipient can access the email header, though it is not immediately visible.
- **Structure**: Defined by RFC5322.

# **Dangerous Settings**

- To prevent emails from being blocked by spam filters, the sender can use a relay server. This is an SMTP server that is trusted by other servers. Typically, the sender must log in to the relay server before using it.
- Administrators often lack visibility into the IP ranges they need to allow, leading to mis-configurations of the SMTP server. To avoid errors in email traffic and prevent disruptions in communication with customers, they may allow all IP addresses, which can create security vulnerabilities.

# **Footprinting the Service**

- The default Nmap scripts include smtp-commands, which uses the EHLO command to list all possible commands that can be executed on the target SMTP server.

### **Nmap**

```python
$ sudo nmap 10.129.14.128 -sC -sV -p25

Starting Nmap 7.80 ( https://nmap.org ) at 2021-09-27 17:56 CEST
Nmap scan report for 10.129.14.128
Host is up (0.00025s latency).

PORT   STATE SERVICE VERSION
25/tcp open  smtp    Postfix smtpd
|_smtp-commands: mail1.inlanefreight.htb, PIPELINING, SIZE 10240000, VRFY, ETRN, ENHANCEDSTATUSCODES, 8BITMIME, DSN, SMTPUTF8, CHUNKING, 
MAC Address: 00:00:00:00:00:00 (VMware)

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 14.09 seconds
```

[smtp-open-relay](https://nmap.org/nsedoc/scripts/smtp-open-relay.html) reference

### **Nmap - Open Relay**

```python
$ sudo nmap 10.129.14.128 -p25 --script smtp-open-relay -v

Starting Nmap 7.80 ( https://nmap.org ) at 2021-09-30 02:29 CEST
NSE: Loaded 1 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 02:29
Completed NSE at 02:29, 0.00s elapsed
Initiating ARP Ping Scan at 02:29
Scanning 10.129.14.128 [1 port]
Completed ARP Ping Scan at 02:29, 0.06s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 02:29
Completed Parallel DNS resolution of 1 host. at 02:29, 0.03s elapsed
Initiating SYN Stealth Scan at 02:29
Scanning 10.129.14.128 [1 port]
Discovered open port 25/tcp on 10.129.14.128
Completed SYN Stealth Scan at 02:29, 0.06s elapsed (1 total ports)
NSE: Script scanning 10.129.14.128.
Initiating NSE at 02:29
Completed NSE at 02:29, 0.07s elapsed
Nmap scan report for 10.129.14.128
Host is up (0.00020s latency).

PORT   STATE SERVICE
25/tcp open  smtp
| smtp-open-relay: Server is an open relay (16/16 tests)
|  MAIL FROM:<> -> RCPT TO:<relaytest@nmap.scanme.org>
|  MAIL FROM:<antispam@nmap.scanme.org> -> RCPT TO:<relaytest@nmap.scanme.org>
|  MAIL FROM:<antispam@ESMTP> -> RCPT TO:<relaytest@nmap.scanme.org>
|  MAIL FROM:<antispam@[10.129.14.128]> -> RCPT TO:<relaytest@nmap.scanme.org>
|  MAIL FROM:<antispam@[10.129.14.128]> -> RCPT TO:<relaytest%nmap.scanme.org@[10.129.14.128]>
|  MAIL FROM:<antispam@[10.129.14.128]> -> RCPT TO:<relaytest%nmap.scanme.org@ESMTP>
|  MAIL FROM:<antispam@[10.129.14.128]> -> RCPT TO:<"relaytest@nmap.scanme.org">
|  MAIL FROM:<antispam@[10.129.14.128]> -> RCPT TO:<"relaytest%nmap.scanme.org">
|  MAIL FROM:<antispam@[10.129.14.128]> -> RCPT TO:<relaytest@nmap.scanme.org@[10.129.14.128]>
|  MAIL FROM:<antispam@[10.129.14.128]> -> RCPT TO:<"relaytest@nmap.scanme.org"@[10.129.14.128]>
|  MAIL FROM:<antispam@[10.129.14.128]> -> RCPT TO:<relaytest@nmap.scanme.org@ESMTP>
|  MAIL FROM:<antispam@[10.129.14.128]> -> RCPT TO:<@[10.129.14.128]:relaytest@nmap.scanme.org>
|  MAIL FROM:<antispam@[10.129.14.128]> -> RCPT TO:<@ESMTP:relaytest@nmap.scanme.org>
|  MAIL FROM:<antispam@[10.129.14.128]> -> RCPT TO:<nmap.scanme.org!relaytest>
|  MAIL FROM:<antispam@[10.129.14.128]> -> RCPT TO:<nmap.scanme.org!relaytest@[10.129.14.128]>
|_ MAIL FROM:<antispam@[10.129.14.128]> -> RCPT TO:<nmap.scanme.org!relaytest@ESMTP>
MAC Address: 00:00:00:00:00:00 (VMware)

NSE: Script Post-scanning.
Initiating NSE at 02:29
Completed NSE at 02:29, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.48 seconds
           Raw packets sent: 2 (72B) | Rcvd: 2 (72B)
```

walkthrough: https://medium.com/@timothy.tanzijing/footprinting-htb-smtp-writeup-83b2cfcb3777

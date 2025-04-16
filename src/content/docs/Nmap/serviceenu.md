---
title: Service Enumeration
description: service enum
---

It is important to find the exact service and version in use. This helps us to look up for known vulnerabilities and analyze source code. With the exact version we can see for precise vulnerabilities.

### Service Version Detection

scanning with a quick port scan can give brief overview of open ports, creating less traffic and reducing the risk of being detected by security systems. Using the version scan can helps to identify specific services and their versions.

```bash
itskhem@htb[/htb]$ sudo nmap 10.129.2.28 -p- -sV

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-15 19:44 CEST
[Space Bar]
Stats: 0:00:03 elapsed; 0 hosts completed (1 up), 1 undergoing SYN Stealth Scan
SYN Stealth Scan Timing: About 3.64% done; ETC: 19:45 (0:00:53 remaining)
```

--stats-every=5s:  shows progress in every 5 sec

We can also increase the verbosity level (-v / -vv), which will show us the open ports directly when Nmap detects them

Nmap checks port banners for information and displays them. it it does not work it uses signature-based method to identify versions, which takes more time.  However automatic scan is not perfect-Nmap and may miss some details.

```python
itskhem@htb[/htb]$ sudo nmap 10.129.2.28 -p- -sV -Pn -n --disable-arp-ping --packet-trace

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-16 20:10 CEST
<SNIP>
NSOCK INFO [0.4200s] nsock_trace_handler_callback(): Callback: READ SUCCESS for EID 18 [10.129.2.28:25] (35 bytes): 220 inlane ESMTP Postfix (Ubuntu)..
Service scan match (Probe NULL matched with NULL line 3104): 10.129.2.28:25 is smtp.  Version: |Postfix smtpd|||
NSOCK INFO [0.4200s] nsock_iod_delete(): nsock_iod_delete (IOD #1)
Nmap scan report for 10.129.2.28
Host is up (0.076s latency).

PORT   STATE SERVICE VERSION
25/tcp open  smtp    Postfix smtpd
MAC Address: DE:AD:00:00:BE:EF (Intel Corporate)
Service Info: Host:  inlane

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 0.47 seconds
```

When we check Nmap results, we can see each port’s status, service, and hostname. However, in cases like this line:

```python
NSOCK INFO [0.4200s] nsock_trace_handler_callback(): Callback: READ SUCCESS
for EID 18 [10.129.2.28:25] (35 bytes): 220 inlane ESMTP Postfix (Ubuntu)..
```

we can see that SMTP reveals extra information, like the linux distribution(Ubuntu). which Nmap doesn’t show directly. After successful TCP handshake, servers send a banner to identify the service, marked by a PSH flag in the TCP header. Some services doesn’t show these info. Manually connecting to the server with nc, grabbing the banner, and inspecting the traffic with tcpdump can reveal details Nmap might miss

  

```python
itskhem@htb[/htb]$ sudo tcpdump -i eth0 host 10.10.14.2 and 10.129.2.28

tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
```

```python
itskhem@htb[/htb]$  nc -nv 10.129.2.28 25

Connection to 10.129.2.28 port 25 [tcp/*] succeeded!
220 inlane ESMTP Postfix (Ubuntu)
```

### **Tcpdump - Intercepted Traffic**

```python
18:28:07.128564 IP 10.10.14.2.59618 > 10.129.2.28.smtp: Flags [S], seq 1798872233, win 65535, options [mss 1460,nop,wscale 6,nop,nop,TS val 331260178 ecr 0,sackOK,eol], length 0
18:28:07.255151 IP 10.129.2.28.smtp > 10.10.14.2.59618: Flags [S.], seq 1130574379, ack 1798872234, win 65160, options [mss 1460,sackOK,TS val 1800383922 ecr 331260178,nop,wscale 7], length 0
18:28:07.255281 IP 10.10.14.2.59618 > 10.129.2.28.smtp: Flags [.], ack 1, win 2058, options [nop,nop,TS val 331260304 ecr 1800383922], length 0
18:28:07.319306 IP 10.129.2.28.smtp > 10.10.14.2.59618: Flags [P.], seq 1:36, ack 1, win 510, options [nop,nop,TS val 1800383985 ecr 331260304], length 35: SMTP: 220 inlane ESMTP Postfix (Ubuntu)
18:28:07.319426 IP 10.10.14.2.59618 > 10.129.2.28.smtp: Flags [.], ack 36, win 2058, options [nop,nop,TS val 331260368 ecr 1800383985], length 0
```

The first three lines show us the three-way handshake.

| **Step** | **Time** | **Source IP:Port** | **Destination IP:Port** | **Flags** | **Description** |
| --- | --- | --- | --- | --- | --- |
| 1 | 18:28:07.128564 | 10.10.14.2:59618 | 10.129.2.28:25 (SMTP) | `[S]` | Client sends SYN to initiate connection. |
| 2 | 18:28:07.255151 | 10.129.2.28:25 (SMTP) | 10.10.14.2:59618 | `[S.]` | Server responds with SYN-ACK. |
| 3 | 18:28:07.255281 | 10.10.14.2:59618 | 10.129.2.28:25 (SMTP) | `[.]` | Client sends ACK to complete the handshake. |
| 4 | 18:28:07.319306 | 10.129.2.28:25 (SMTP) | 10.10.14.2:59618 | `[P.]` | Server sends data with PSH-ACK (push + ack). |
| 5 | 18:28:07.319426 | 10.10.14.2:59618 | 10.129.2.28:25 (SMTP) | `[.]` | Client sends ACK to acknowledge received data. |

The target SMTP server sends a TCP packet with both PSH and ACK flags. The PSH flag indicates that the server is sending data to us, while the ACK flag confirms that all necessary data has been transmitted.

The last TCP packet that we sent confirms the receipt of the data with an ACK.
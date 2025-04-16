---
title: Host and Port Scan
description: host and port scan
---

After finding our target and to have more info on target system are:

- Open ports and its services
- Service versions
- Information that the services provided
- Operating system

| **State** | Description |
| --- | --- |
| open | This indicates that the connection to the scanned port has been established. These connections can be **TCP connections**, **UDP datagrams** as well as **SCTP associations**. |
| closed | When the port is shown as closed, the TCP  protocol indicates that the packet we received back contains an RST flag. This scanning method    can also be used to determine if our target is alive or not.  |
| filtered | Nmap cannot correctly identify whether the scanned port is open or closed because either no response is returned from the target for the port or we get an error code from the target. |
| unfiltered | This state of a port only occurs during the **TCP-ACK** scan and means that the port is accessible, but it cannot be determined whether it is open or closed. |
| open | filtered | If we do not get a response for a specific port, `Nmap` will set it to that state. This indicates that a firewall or packet filter may protect the port. |
| closed | filtered | This state only occurs in the **IP ID idle** scans and indicates that it was impossible to determine if the scanned port is closed or filtered by a firewall. |

Scan top ports

| Scanning Options | Description  |
| --- | --- |
| —top-ports=10 | Scans the specified top ports that have been defined as most frequent. |
| -n | Disables DNS resolution. |
| —packet-trace | Shows all packets sent and received. |

# Request

| **Message** | **Description** |
| --- | --- |
| `SENT (0.0429s)` | Indicates the SENT operation of Nmap, which sends a packet to the target. |
| TCP | Shows the protocol that is being used to interact with the target port. |
| `10.10.14.2:63090 >` | Represents our IPv4 address and the source port, which will be used by Nmap to send the packets. |
| `10.129.2.28:21` | Shows the target IPv4 address and the target port. |
| S | SYN flag of the sent TCP packet. |
| `ttl=56 id=57322 iplen=44 seq=1699105818 win=1024 mss 1460` | Additional TCP Header parameters |

# Response

| **Message** | **Description** |
| --- | --- |
| `RCVD (0.0573s)` | Indicates a received packet from the target. |
| TCP | Shows the protocol that is being used. |
| `10.129.2.28:21 >` | Represents targets IPv4 address and the source port, which will be used to reply. |
| `RA` | RST and ACK flags of the sent TCP packet. |
| `ttl=64 id=0 iplen=40 seq=0 win=0` | Additional TCP Header parameters. |

After finding our target and to have more info on target system are:

- Open ports and its services
- Service versions
- Information that the services provided
- Operating system

### There are 6 different stages of ports

| **State** | **Description** |
| --- | --- |
| **open** | Indicates that the connection to the scanned port has been established. Applies to TCP connections, UDP datagrams, and SCTP associations. |
| **closed** | The port is closed. TCP protocol returns a packet with the RST flag. This scan can also help determine if the target is alive. |
| **filtered** | Nmap cannot determine whether the port is open or closed. No response or an error code is received, possibly due to a firewall. |
| **unfiltered** | Seen in TCP-ACK scans. The port is accessible, but it's not possible to determine whether it is open or closed. |
| **open | filtered** |
| **closed | filtered** |

## **Discovering Open TCP Ports**

- by default nmap scan 1000 ports
- by default TCP scan is done -sT
- if we use root to scan SYN scan is done -sS
- --top-ports=10: scan top 10 ports
- -F fast scan, top 100 ports

### **Scanning Top 10 TCP Ports**

```python
itskhem@htb[/htb]$ sudo nmap 10.129.2.28 --top-ports=10 

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-15 15:36 CEST
Nmap scan report for 10.129.2.28
Host is up (0.021s latency).

PORT     STATE    SERVICE
21/tcp   closed   ftp
22/tcp   open     ssh
23/tcp   closed   telnet
25/tcp   open     smtp
80/tcp   open     http
110/tcp  open     pop3
139/tcp  filtered netbios-ssn
443/tcp  closed   https
445/tcp  filtered microsoft-ds
3389/tcp closed   ms-wbt-server
MAC Address: DE:AD:00:00:BE:EF (Intel Corporate)

Nmap done: 1 IP address (1 host up) scanned in 1.44 seconds
```

- For TCP port 21, the target responded with an RST flag (meaning the port is closed)
- To focus more on SYN scan:
    - disable ICMP echo requests(-Pn)
    - DNS resolution (-n)
    - disable ARP ping(—disable-arp-ping)

| **Scanning Option** | **Description** |
| --- | --- |
| `10.129.2.28` | Scans the specified target IP address. |
| `--top-ports=10` | Scans the top 10 most commonly used ports (as defined by Nmap’s frequency database). |

### **Nmap - Trace the Packets**

```python
itskhem@htb[/htb]$ sudo nmap 10.129.2.28 -p 21 --packet-trace -Pn -n --disable-arp-ping

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-15 15:39 CEST
SENT (0.0429s) TCP 10.10.14.2:63090 > 10.129.2.28:21 S ttl=56 id=57322 iplen=44  seq=1699105818 win=1024 <mss 1460>
RCVD (0.0573s) TCP 10.129.2.28:21 > 10.10.14.2:63090 RA ttl=64 id=0 iplen=40  seq=0 win=0
Nmap scan report for 10.11.1.28
Host is up (0.014s latency).

PORT   STATE  SERVICE
21/tcp closed ftp
MAC Address: DE:AD:00:00:BE:EF (Intel Corporate)

Nmap done: 1 IP address (1 host up) scanned in 0.07 seconds
```

| **Scanning Option** | **Description** |
| --- | --- |
| `10.129.2.28` | Scans the specified target IP address. |
| `-p 21` | Scans only the specified port (port 21 in this case). |
| `--packet-trace` | Displays all packets sent and received during the scan. |
| `-n` | Disables DNS resolution to speed up the scan and avoid name lookups. |
| `--disable-arp-ping` | Disables ARP ping, useful in certain network environments. |

### Request

| **Message** | **Description** |
| --- | --- |
| `SENT (0.0429s)` | Indicates that Nmap has sent a packet to the target at the timestamp specified. |
| `TCP` | Specifies that the TCP protocol is being used to interact with the target port. |
| `10.10.14.2:63090 >` | Represents the source IP address and port used by Nmap to send packets. |
| `10.129.2.28:21` | Indicates the destination IP address and port being scanned. |
| `S` | SYN flag in the sent TCP packet, indicating the start of a TCP handshake. |
| `ttl=56 id=57322 iplen=44` | Additional IP header fields: TTL (Time To Live), ID, and IP packet length. |
| `seq=1699105818` | Sequence number in the TCP header used for connection setup. |
| `win=1024` | TCP window size (buffer size) offered by the sender. |
| `mss 1460` | Maximum Segment Size, the largest segment of data the sender is willing to receive. |

Response

| **Message** | **Description** |
| --- | --- |
| `RCVD (0.0573s)` | Indicates that Nmap received a packet from the target at the timestamp shown. |
| `TCP` | Specifies that the TCP protocol is being used. |
| `10.129.2.28:21 >` | Target's IP address and port sending the response. |
| `10.10.14.2:63090` | Our IP address and port receiving the response. |
| `RA` | RST and ACK flags in the TCP packet, indicating the port is closed (connection reset). |
| `ttl=64 id=0 iplen=40` | IP header fields: Time To Live (TTL), packet ID, and IP length. |
| `seq=0` | Sequence number of the TCP packet. |
| `win=0` | TCP window size (buffer size), which is zero in this case. |

### Connect Scan

- Nmap TCP connect scan(-sT) completes full three way hand-shake
- it sends SYN packet to the target
- if it receives SYN-ACK, the port is open
- RST means, the port is closed
- this scan is accurate because it completes the connections
- it is not stealthy, since it logs a full connection
- easily detected by security system(IDS/IPS)
- connect scan is useful when firewall blocks incoming packets but allows outgoing ones, because we can identify port status
- however it is slower than other scan, as it awaits for responses
- SYN scan is more stealthy, but advanced IDS/IPS can still detect it

### **Connect Scan on TCP Port 443**

```python
[!bash!]$ sudo nmap 10.129.2.28 -p 443 --packet-trace --disable-arp-ping -Pn -n --reason -sT 

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-15 16:26 CET
CONN (0.0385s) TCP localhost > 10.129.2.28:443 => Operation now in progress
CONN (0.0396s) TCP localhost > 10.129.2.28:443 => Connected
Nmap scan report for 10.129.2.28
Host is up, received user-set (0.013s latency).

PORT    STATE SERVICE REASON
443/tcp open  https   syn-ack

Nmap done: 1 IP address (1 host up) scanned in 0.04 seconds
```

### **Why Use a Connect Scan?**

- **Highly Accurate:**
    
    It completes the full connection (three-way handshake), so it can clearly identify if a port is open, closed, or filtered.
    
- **Works Even with Firewalls:**
    
    If the target firewall blocks incoming packets but allows outgoing packets, the Connect Scan can bypass it to determine the port's state.
    

### **Limitations**

- **Not Stealthy:**
    - Since it completes the handshake, it generates logs on the target system (e.g., in server logs or intrusion detection systems).
    - Easily detected by modern security tools.
- **Slower:**
    - Each connection takes more time because the scan waits for the target's response

# **Filtered Ports**

- if the port is filtered, means firewall is blocking it. firewall may drop or ignore the packets. if the packets is dropped, nmap doesn’t get response.
- we can retry with the option (--max-retries=10)

For example if we scan TCP port, which shows filtered, we can disable ICMP echo request(-Pn), DNS resolution (-n) and ARP ping(—disable-arp-ping) to track how packets are handled 

```python
[!bash!]$ sudo nmap 10.129.2.28 -p 139 --packet-trace -n --disable-arp-ping -Pn

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-15 15:45 CEST
SENT (0.0381s) TCP 10.10.14.2:60277 > 10.129.2.28:139 S ttl=47 id=14523 iplen=44  seq=4175236769 win=1024 <mss 1460>
SENT (1.0411s) TCP 10.10.14.2:60278 > 10.129.2.28:139 S ttl=45 id=7372 iplen=44  seq=4175171232 win=1024 <mss 1460>
Nmap scan report for 10.129.2.28
Host is up.

PORT    STATE    SERVICE
139/tcp filtered netbios-ssn
MAC Address: DE:AD:00:00:BE:EF (Intel Corporate)

Nmap done: 1 IP address (1 host up) scanned in 2.06 seconds
```

- this scan sent 2 TCP packets and there is some time difference between that two packets. this caused by firewall

```python
[!bash!]$ sudo nmap 10.129.2.28 -p 445 --packet-trace -n --disable-arp-ping -Pn

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-15 15:55 CEST
SENT (0.0388s) TCP 10.129.2.28:52472 > 10.129.2.28:445 S ttl=49 id=21763 iplen=44  seq=1418633433 win=1024 <mss 1460>
RCVD (0.0487s) ICMP [10.129.2.28 > 10.129.2.28 Port 445 unreachable (type=3/code=3) ] IP [ttl=64 id=20998 iplen=72 ]
Nmap scan report for 10.129.2.28
Host is up (0.0099s latency).

PORT    STATE    SERVICE
445/tcp filtered microsoft-ds
MAC Address: DE:AD:00:00:BE:EF (Intel Corporate)

Nmap done: 1 IP address (1 host up) scanned in 0.05 seconds
```

- we receive ICMP packets type 3  and error code 3, which indicates that desired port is unreachable. if we know that the host is alive, we can say that firewall is rejecting the packets

# **Discovering Open UDP Ports**

- UDP is stateless, it doesn’t establish connection like TCP. Instead we see the progress and wait for the response
- UDP open ports usually don’t sends any response, which is harder to confirm the port status
- if the port is **closed,** usually sends **ICMP** “port unreachable”
- it takes longer time to scan compared to **TCP**

### **UDP Port Scan**

```python
[!bash!]$ sudo nmap 10.129.2.28 -F -sU

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-15 16:01 CEST
Nmap scan report for 10.129.2.28
Host is up (0.059s latency).
Not shown: 95 closed ports
PORT     STATE         SERVICE
68/udp   open|filtered dhcpc
137/udp  open          netbios-ns
138/udp  open|filtered netbios-dgm
631/udp  open|filtered ipp
5353/udp open          zeroconf
MAC Address: DE:AD:00:00:BE:EF (Intel Corporate)

Nmap done: 1 IP address (1 host up) scanned in 98.07 seconds
```

| **Scanning Option** | **Description** |
| --- | --- |
| `10.129.2.28` | Scans the specified target IP address. |
| `-F` | Performs a fast scan by scanning the top 100 most common ports. |
| `-sU` | Performs a UDP scan to check for open UDP ports. |
- we often don’t get response back, because Nmap sends empty datagrams to scanned UDP ports
- we do not get any response

```python
itskhem@htb[/htb]$ sudo nmap 10.129.2.28 -sU -Pn -n --disable-arp-ping --packet-trace -p 137 --reason 

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-15 16:15 CEST
SENT (0.0367s) UDP 10.10.14.2:55478 > 10.129.2.28:137 ttl=57 id=9122 iplen=78
RCVD (0.0398s) UDP 10.129.2.28:137 > 10.10.14.2:55478 ttl=64 id=13222 iplen=257
Nmap scan report for 10.129.2.28
Host is up, received user-set (0.0031s latency).

PORT    STATE SERVICE    REASON
137/udp open  netbios-ns udp-response ttl 64
MAC Address: DE:AD:00:00:BE:EF (Intel Corporate)

Nmap done: 1 IP address (1 host up) scanned in 0.04 seconds
```

| **Scanning Option** | **Description** |
| --- | --- |
| `10.129.2.28` | Scans the specified target IP address. |
| `-sU` | Performs a UDP scan to check for open UDP ports. |
| `-Pn` | Disables ICMP Echo requests (ping), treating all hosts as online. |
| `-n` | Disables DNS resolution to speed up the scan. |
| `--disable-arp-ping` | Disables ARP ping, useful in certain network setups. |
| `--packet-trace` | Displays all packets sent and received during the scan. |
| `-p 137` | Scans only the specified port (port 137 in this case). |
| `--reason` | Displays the reason why a port is in a specific state (e.g., filtered, closed). |

### Point to remember

If we get an ICMP response with error code 3 (port unreachable), we know that the port is indeed closed.

```python
itskhem@htb[/htb]$ sudo nmap 10.129.2.28 -sU -Pn -n --disable-arp-ping --packet-trace -p 100 --reason 

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-15 16:25 CEST
SENT (0.0445s) UDP 10.10.14.2:63825 > 10.129.2.28:100 ttl=57 id=29925 iplen=28
RCVD (0.1498s) ICMP [10.129.2.28 > 10.10.14.2 Port unreachable (type=3/code=3) ] IP [ttl=64 id=11903 iplen=56 ]
Nmap scan report for 10.129.2.28
Host is up, received user-set (0.11s latency).

PORT    STATE  SERVICE REASON
100/udp closed unknown port-unreach ttl 64
MAC Address: DE:AD:00:00:BE:EF (Intel Corporate)

Nmap done: 1 IP address (1 host up) scanned in  0.15 seconds
```

For all other ICMP responses, the scanned ports are marked as (open|filtered).

```python
itskhem@htb[/htb]$ sudo nmap 10.129.2.28 -sU -Pn -n --disable-arp-ping --packet-trace -p 138 --reason 

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-15 16:32 CEST
SENT (0.0380s) UDP 10.10.14.2:52341 > 10.129.2.28:138 ttl=50 id=65159 iplen=28
SENT (1.0392s) UDP 10.10.14.2:52342 > 10.129.2.28:138 ttl=40 id=24444 iplen=28
Nmap scan report for 10.129.2.28
Host is up, received user-set.

PORT    STATE         SERVICE     REASON
138/udp open|filtered netbios-dgm no-response
MAC Address: DE:AD:00:00:BE:EF (Intel Corporate)

Nmap done: 1 IP address (1 host up) scanned in 2.06 seconds
```

Another scanning technique -sV, which provide more information on the ports, service running on target and version 

### **Version Scan**
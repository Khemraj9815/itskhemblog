---
title: Host Discovery
description: host discovery
---

Host discovery is used to identify which systems on a network are active and reachable. This is typically the first step in tasks like penetration testing or network analysis.

[How to — Host Discovery](https://h0tplug1n.medium.com/how-to-host-discovery-89cda0da8297#:~:text=Host%20Discovery%20is%20a%20process%20of%20finding%20and%20enumerating%20hosts,%2D%20Netdiscover)

### **Key Points About Host Discovery**

- Nmap uses various methods to determine if a system (host) is "alive."
- The most common technique is sending **ICMP echo requests** (like a ping) to check if a host responds.
- Results can vary based on firewall or security settings (e.g., some hosts may block ping requests).

### **Scan Network Range**

```python
itskhem@htb[/htb]$ sudo nmap 10.129.2.0/24 -sn -oA tnet | grep for | cut -d" " -f5

10.129.2.4
10.129.2.10
10.129.2.11
10.129.2.18
10.129.2.19
10.129.2.20
10.129.2.28
```

| Scanning Options | Description |
| --- | --- |
| 10.129.2.0/24 | target network range |
| -sn | disable port scanning |
| -oA tnet | stores the result in all format |

this scan only works if the firewall has allowed it.

**Now how to scan the predefined host list**

```python
itskhem@htb[/htb]$ cat hosts.lst

10.129.2.4
10.129.2.10
10.129.2.11
10.129.2.18
10.129.2.19
10.129.2.20
10.129.2.28
```

If we use the same scanning technique on the predefined list, the command will look like this:

```python
itskhem@htb[/htb]$ sudo nmap -sn -oA tnet -iL hosts.lst | grep for | cut -d" " -f5

10.129.2.18
10.129.2.19
10.129.2.20
```

| Scanning Options | Description |
| --- | --- |
| -sn | disable port scanning |
| -oA tnet | stores the result in all format |
| -iL | performs defined scan against targets in provided ‘hosts.list’ |

# **Scan Multiple IPs**

scan multiple ips

```python
itskhem@htb[/htb]$ sudo nmap -sn -oA tnet 10.129.2.18 10.129.2.19 10.129.2.20| grep for | cut -d" " -f5

10.129.2.18
10.129.2.19
10.129.2.20
```

If we disable post scan(-sn) Nmap automatically ping scan with `ICMP Echo Requests` (`-PE`). once this request is sent, we usually expect ICMP reply it host is alive.

- To ensure that ICMP echo requests are sent, we also define the option (`-PE`) for this.

# **Scan Single IP**

- before scanning the whole thing, we need to check if the target is alive or not

```python
itskhem@htb[/htb]$ sudo nmap 10.129.2.18 -sn -oA host -PE --packet-trace 

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-15 00:08 CEST
SENT (0.0074s) ARP who-has 10.129.2.18 tell 10.10.14.2
RCVD (0.0309s) ARP reply 10.129.2.18 is-at DE:AD:00:00:BE:EF
Nmap scan report for 10.129.2.18
Host is up (0.023s latency).
MAC Address: DE:AD:00:00:BE:EF
Nmap done: 1 IP address (1 host up) scanned in 0.05 seconds
```

| Scanning Options | Description |
| --- | --- |
| 10.129.2.18 | target ip |
| -sn | disable port scanning |
| -oA host | stores the result in all formats  |
- if we disable port scan, it automatically perform ping scan with ICMP with Echo requests (-PE)
    - this checks if host is alive, expecting ICMP reply

ICMP echo request can help us determine if our target is alive and identify its system.

| Scanning Options | Description |
| --- | --- |
| 10.129.2.18 | target ip |
| -sn | disable port scanning |
| -oA host | stores the result in all formats |
| -PE | perform ping scan by using ‘ICMP Echo request’ against target |
| —packet-trace | show all the packets sent and received |
- another options (-reason)

```python
itskhem@htb[/htb]$ sudo nmap 10.129.2.18 -sn -oA host -PE --reason 

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-15 00:10 CEST
SENT (0.0074s) ARP who-has 10.129.2.18 tell 10.10.14.2
RCVD (0.0309s) ARP reply 10.129.2.18 is-at DE:AD:00:00:BE:EF
Nmap scan report for 10.129.2.18
Host is up, received arp-response (0.028s latency).
MAC Address: DE:AD:00:00:BE:EF
Nmap done: 1 IP address (1 host up) scanned in 0.03 seconds
```

| Scanning Options | Description |
| --- | --- |
| 10.129.2.18 | target ip |
| -sn | disable port scanning |
| -oA host | stores the result in all formats |
| -PE | perform ping scan by using ‘ICMP Echo request’ against target |
| resons | display the reason for specific result |
- ARP-ping alone won’t be able to detect whether the host is alive or not
- disable ARP ping request “--disable-arp-ping”


```python
itskhem@htb[/htb]$ sudo nmap 10.129.2.18 -sn -oA host -PE --packet-trace --disable-arp-ping 

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-15 00:12 CEST
SENT (0.0107s) ICMP [10.10.14.2 > 10.129.2.18 Echo request (type=8/code=0) id=13607 seq=0] IP [ttl=255 id=23541 iplen=28 ]
RCVD (0.0152s) ICMP [10.129.2.18 > 10.10.14.2 Echo reply (type=0/code=0) id=13607 seq=0] IP [ttl=128 id=40622 iplen=28 ]
Nmap scan report for 10.129.2.18
Host is up (0.086s latency).
MAC Address: DE:AD:00:00:BE:EF
Nmap done: 1 IP address (1 host up) scanned in 0.11 seconds
```

[Putting It All Together: Host Discovery Strategies | Nmap Network Scanning](https://nmap.org/book/host-discovery-strategies.html)
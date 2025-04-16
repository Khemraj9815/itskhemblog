---
title: Intro to Nmap
desctiption: intro
--- 

**Nmap can be divided into the following scanning techniques:**

- Host discovery
- Port scanning
- Service enumeration and detection
- OS detection
- Scrip-table interaction with the target service (Nmap Scripting Engine)

## Use Cases

The tool is one of the most used tools by network administrator and IT security specialists. Its is used to:

- Network mapping
- Identify open ports
- vulnerability assessment and others

# Scan Techniques

- -sS: TCP-SYN - never complete 3-way handshake
- If our target sends a SYN-ACK flagged packet back to us, Nmap detects that the port is open.
- If the target responds with an RST flagged packet, it is an indicator that the port is closed.
- If Nmap does not receive a packet back, it will display it as filtered. Depending on the firewall configuration, certain packets may be dropped or ignored by the firewall.

### Introduction to Nmap

**Nmap (Network Mapper)** is a powerful open-source tool for network analysis and security auditing. Written in C, C++, Python, and Lua, it is widely used to:

- Scan networks and identify active hosts.
- Detect services, applications, and versions.
- Identify operating systems and versions.
- Test firewalls, intrusion detection systems (IDS), and packet filters.

### Nmap Architecture

Nmap supports various scanning techniques to gather information about a target. These techniques include:

1. **Host Discovery**: Identifying active devices on the network.
2. **Port Scanning**: Checking for open ports on a device.
3. **Service Detection**: Identifying the services and their versions running on open ports.
4. **OS Detection**: Determining the operating system of a target.
5. **Scripting**: Using the Nmap Scripting Engine (NSE) to interact with services and perform advanced tasks.

### Syntax

The basic syntax for running Nmap scans is:

```bash
nmap <scan types> <options> <target>
```

For example:

```bash
nmap -sS -p 22,80 192.168.1.1
```

---

### Scan Techniques

Nmap offers a variety of scan techniques, including:

1. **TCP SYN Scan (`sS`)**:
    - Sends a single SYN packet to initiate a TCP handshake.
    - If the target responds with:
        - **SYN-ACK**: The port is open.
        - **RST**: The port is closed.
        - **No response**: The port is filtered (firewall or IDS may block it).
2. **UDP Scan (`sU`)**: Scans UDP ports.

![image.png](../../../assets/nmap/image.png)

1. **TCP Null, FIN, and Xmas Scans (`sN`, `sF`, `sX`)**: Bypass firewalls by sending unconventional packets.

![image.png](../../../assets/nmap/image%201.png)

![image.png](../../../assets/nmap/image%202.png)

![image.png](../../../assets/nmap/image%203.png)

1. **Idle Scan (`sI`)**: Uses a third-party host to mask the scan origin.

![image.png](../../../assets/nmap/image%204.png)

1. **IP Protocol Scan (`sO`)**: Identifies supported IP protocols.
2. **FTP Bounce Scan (`b`)**: Scans through an FTP server.

### Example: TCP SYN Scan (`sS`)

Here’s an example of a basic TCP SYN scan:

```bash
sudo nmap -sS localhost
```

**Output:**

```kotlin
Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-11 22:50 UTC
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000010s latency).
Not shown: 996 closed ports
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
5432/tcp open  postgresql
5901/tcp open  vnc-1
```

### Explanation:

- **Port**: The port number (e.g., `22`, `80`).
- **State**: Whether the port is `open`, `closed`, or `filtered`.
- **Service**: The type of service running on the port (e.g., `ssh`, `http`).

### Key Benefits of Nmap

- **Flexibility**: Multiple scanning techniques.
- **Efficiency**: Scans thousands of ports quickly.
- **Insightful Results**: Provides detailed information about the target.
- **Customizable**: Use scripts and options for specific tasks.

Nmap is a tool for understanding and securing networks effectively.

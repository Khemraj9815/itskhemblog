---
title: DNS
description: dns
---
 When you type a website name like [www.google.com](http://www.google.com/) into your browser, your computer doesn't understand names — it needs an IP address (like 8.8.8.8) to find and connect to the website.

![dns](../../../assets/infogather/dns.png)

You type a website name → DNS finds the matching IP address → You get to the website.

1. Your Computer Asks for Directions (DNS Query): when we type website address, our computer first checks its memory to see if it already know from past visit. If not, it asks a DNS resolver (usually from our internet provider) to find the IP address.
2. The DNS Resolver Checks its Map (Recursive Lookup): DNS solver also has its own memory. if it do not find it start looking for DNS system. first it ask for root name server which acts like main directory.
3. Root Name Server Points the Way: The root server don’t have the exact IP but knows where to look next. it directs to DNS resolver to the Top-Level Domain (TLD) server for the domain's ending (like .com or .org) which will help to get closer.
4. TLD Name Server Narrows It Down: it knows which specific server has information for the domain we need (example.com) and directs to the DNS resolver 
5. Authoritative Name Server Delivers the Address: This is the last stop. it has exact IP address of the website and sends back to resolve, so our computer can connect
6. The DNS Resolver Returns the Information: resolver receive IP address and give it to our computer and remain for a while (caches it)
7. Your Computer Connects: Now our computer connects to the web server hosting the website.

### **The Hosts File**

it is basic text file that links website names to IP address directly to our computer, skipping DNS process. easy to access the website, no troubleshooting 

### **It's Like a Relay Race**

Think of the DNS process as a relay race. Your computer starts with the domain name and passes it along to the resolver. The resolver then passes the request to the root server, the TLD server, and finally, the authoritative server, each one getting closer to the destination. Once the IP address is found, it's relayed back down the chain to your computer, allowing you to access the website.

To illustrate, here's a simplified example of what a zone file, for [example.com](http://example.com/) might look like:

### Key DNS Terms

- **A Record**: This is the main address for a domain (maps a domain name to an IP address).
- **CNAME Record**: A shortcut or alias for a domain name (e.g., **www** pointing to **example.com**).
- **MX Record**: Tells where to send emails for a domain.
- **NS Record**: Shows which servers are responsible for a domain's DNS.
- **TXT Record**: Used to store any extra information, often for security purposes.

### **Why DNS Matters for Web Recon**

DNS is critical component of target’s infrastructure that can be leveraged to uncover vulnerabilities and gain access during penetration test:

- Uncovering Assets: can reveal wealth of information, including subdomains, mail servers, and name server records. For example, if a CNAME record points to an outdated server (like [dev.example.com](http://dev.example.com/) CNAME [oldserver.example.net](http://oldserver.example.net/)), it could direct traffic to a vulnerable system that may not be properly secured, creating a potential security risk.
- Mapping the Network Infrastructure: By analyzing DNS data, we can map the networks infrastructure. NS record show the hosting provider, while A record (eg. loadbalancer.example.com) reveals load balancers. this helps to identify connection, traffic flow and potentials weak points
- Monitoring for Changes: Constantly monitoring DNS records, we can spot new changes in network like new subdomain(eg: [vpn.example.com](http://vpn.example.com/)) which could show new access point and TXT record with _1password=… might indicate the use of _1password=… which could be useful while social engineering or phishing attacks

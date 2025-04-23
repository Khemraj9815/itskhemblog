---
title: Certificate Transparency 
description: ct
---

**Purpose of Certificate Transparency (CT) Logs**
- Provide transparency in SSL/TLS certificate issuance.
- Help detect rogue or misissued certificates early.
- Ensure Certificate Authority (CA) accountability.
- Strengthen the Web PKI through public oversight.

**What are CT Logs?**
- Public, append-only logs of issued SSL/TLS certificates.
- Maintained by independent organizations.
- Open for public inspection.
- Serve as a global registry of certificates.

**Benefits of CT Logs:**
1. **Early Detection of Rogue Certificates**
   - Identifies unauthorized or fraudulent certificates quickly.
   - Allows for revocation before misuse.

2. **CA Accountability**
   - Public issuance practices visible to everyone.
   - Non-compliance can lead to sanctions or loss of trust.

3. **Strengthening Web PKI**
   - Enhances overall security and trust in secure communication.

**CT Logs in Web Reconnaissance**
- Useful for subdomain enumeration.
- More effective than brute-force or wordlists.
- Reveals historical and hidden subdomains.
- Can identify subdomains with outdated/vulnerable software.

**Searching CT Logs:**

**1. crt.sh**
- User-friendly interface.
- Search by domain.
- Displays certificate details and SAN entries.
- Pros: Free, no registration, easy to use.
- Cons: Limited filtering and analysis.

**2. Censys**
- Advanced filtering by domain, IP, certificate attributes.
- In-depth analysis and correlation.
- Pros: Extensive data, API access.
- Cons: Requires registration.

**crt.sh Lookup with curl and jq:**
```bash
curl -s "https://crt.sh/?q=facebook.com&output=json" \
| jq -r '.[] | select(.name_value | contains("dev")) | .name_value' \
| sort -u
```

**Explanation:**
- `curl`: Fetches JSON data from crt.sh for facebook.com.
- `jq`: Filters for subdomains containing "dev".
- `sort -u`: Removes duplicates and sorts results.

**Example Output:**
- *.dev.facebook.com
- dev.facebook.com
- newdev.facebook.com
- facebook-amex-dev.facebook.com

**Use Cases:**
- Subdomain discovery for recon.
- Identifying old/unused domains.
- Finding potential vulnerabilities.
- Ensuring proper certificate issuance.



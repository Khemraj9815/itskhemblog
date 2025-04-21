---
title: Cloud Resources 
description: cloud res
---

### **Cloud Resources**

Most companies rely on cloud services like **AWS (Amazon Web Services)**, **GCP (Google Cloud Platform)**, and **Azure (Microsoft)** to manage their work from anywhere. These platforms are great because they allow centralized access and control over company resources.

Although cloud providers secure their own systems, companies still face **security risks**—mainly due to **misconfigurations** by their own admins. For example, storage spaces like **S3 buckets (AWS)**, **blobs (Azure)**, or **Cloud Storage (GCP)** might be left open to the public if not set up properly. That means anyone could access sensitive files without needing a password.

### **Example Scenario**

Let’s say a company hires us to test their security. While scanning their subdomains, we find IP addresses linked to their site, including one that points to:

```bash
s3-website-us-west-2.amazonaws.com
```

This tells us they are using AWS S3 cloud storage, and it might be something we can investigate further.

Many companies add cloud resources to their **DNS records** so employees can access them more easily. This is helpful for them, but it can also expose resources to attackers if not protected properly.

### **How to Find Cloud Resources**

We can discover cloud storage not only through DNS and IP lookups but also using **Google Dorks**. Google Dorking is a method where we use special search queries like:

```bash
inurl:companyname site:s3.amazonaws.com
intext:"confidential" site:blob.core.windows.net
```

This helps narrow down results and sometimes reveals exposed files or servers with valuable info.

### **Using Google to Find Azure and Cloud Files**

We can use **Google Search** to find valuable files related to a company, like **PDFs, documents, presentations, source code, images, or stylesheets**. These files are often stored on cloud platforms (like **Azure, AWS, or GCP**) and linked in the web page’s source code to reduce server load.

### **Searching the Target Website**

When analyzing a company, we can:

- Check the **source code** of their website to see what external content is being loaded.
- Use tools like **domain.glass** to gather extra information about the domain and its infrastructure.
    - Example: If a site is protected by **Cloudflare**, we’ll see a "Safe" tag, which tells us that a basic security layer (gateway protection) is in place.

### **Useful Tool: GrayHatWarfare**

GrayHatWarfare is a powerful platform where you can:

- Search for files in **AWS, Azure, and GCP** cloud storage buckets.
- Filter by **file type**, like `.pdf`, `.docx`, `.js`, etc.
- Discover **exposed cloud buckets** that might contain sensitive data.

This is a passive, stealthy way to gather information without alerting the target company.

### **Tips**

- Many companies use **shortened or abbreviated names** internally, and these often appear in filenames or cloud URLs.
- Try searching for those abbreviations when using Google Dorks or GrayHatWarfare.
- You might come across **downloadable files** that are exposed to the public—these could reveal configuration info, credentials, or even private keys.

### **Leaked SSH Keys**

Sometimes employees accidentally upload **private SSH keys** while under pressure or stress. If these are found online, attackers can use them to log into systems **without needing a password**—a major security risk for the company.
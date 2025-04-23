---
title: Crawling
description: crawling
---

## **Crawling (Spidering)**

### Definition
- Automated, systematic browsing of the web.
- Crawlers (bots) follow links to discover and index web pages.
- Used in search engines, data analysis, and web reconnaissance.


### How Web Crawlers Work
1. Start with a seed URL.
2. Fetch the page → Parse content → Extract all links.
3. Add new links to queue → Repeat the process.
4. Crawls can be site-wide or web-wide, based on scope.


### Example
- Homepage: Contains `link1`, `link2`, `link3`.
- `link1` leads to: Homepage, `link2`, `link4`, `link5`.
- Crawler recursively explores each link.
- Unlike fuzzing (which guesses links), crawling follows actual ones.


### Crawling Strategies

#### 1. Breadth-First Crawling
- Explores all links on a page before going deeper.
- Good for mapping site structure.
```
    Seed → Page 1 → Page 2 → Page 3 ...
```

#### 2. Depth-First Crawling
- Follows one link path deeply before backtracking.
- Good for finding deep, specific content.
```
    Seed → Page 1 → Page 2 → Page 3 → Backtrack ...
```


### What Crawlers Extract
- Links (Internal/External): Map structure, find hidden content.
- Comments: May contain leaks (user discussions, config mentions).
- Metadata: Titles, keywords, authors—help in profiling.
- Sensitive Files:
  - Backup: `.bak`, `.old`
  - Config: `settings.php`, `web.config`
  - Logs: `error_log`, `access_log`
  - Secrets: Passwords, API keys, credentials


### Importance of Context
- A single data point might seem irrelevant alone.
- Correlating multiple findings reveals vulnerabilities.
- Example:
  - Links show `/files/` directory
  - Comment mentions a "file server"
  - Visiting `/files/` reveals sensitive data
- Holistic analysis helps uncover critical insights.




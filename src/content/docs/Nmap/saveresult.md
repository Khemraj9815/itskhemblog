---
title: Saving Result
description: save result
---

while scannig the network or doing anything and at that point you might want to save result of specific task, I got you lets see the command to save result in different format.

| **Option** | **Description** |
| --- | --- |
| `-oN` | Saves the scan output in **Normal format** with `.nmap` extension. |
| `-oG` | Saves the scan output in **Grepable format** with `.gnmap` extension. |
| `-oX` | Saves the scan output in **XML format** with `.xml` extension. |
| `-oA` | Saves the output in **all three formats** at once (`.nmap`, `.gnmap`, `.xml`). |

Example 
```bash
sudo nmap 10.129.2.28 -p- -oA target
```

the scan result will be saved as target.


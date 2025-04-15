---
title: Find File
description: find file
---

## which

its is important to know how to locate that you don’t remember its location. if you know the command how to search the file, you don’t have to search through every single folder. 

- `which` command is used to **locate the path of an executable program**.
- used to check which version of a command you are using

```bash
$ which python

/usr/bin/python
```

## Find

- used to find files and folder
- you can even filter the command like size of the file.

| **Command** | **Description** |
| --- | --- |
| `find . -name file.txt` | Finds `file.txt` in the current directory and subdirectories. |
| `find /home/ -type f` | Finds all **files** in `/home/`. |
| `find /var -type d` | Finds all **directories** in `/var`. |
| `find . -name "*.js"` | Finds all JavaScript files in the current directory and below. |
| `find . -size +10M` | Finds files larger than 10MB. |
| `find / -user username` | Finds all files owned by user `username`. |
| `find . -mtime -1` | Finds files modified **within the last 1 day**. |

## Locate

- it offers quicker way to search through our system

If `locate` doesn't find recent files, run:

```bash
sudo updatedb
```

| **Command** | **Description** |
| --- | --- |
| `locate index.html` | Finds all paths containing `index.html`. |
| `locate -i report.pdf` | Case-insensitive search for `report.pdf`. |
| `locate "*.txt"` | Finds all `.txt` files (wildcards may need to be quoted). |
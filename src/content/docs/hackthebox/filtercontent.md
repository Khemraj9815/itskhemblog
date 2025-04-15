---
title: Filter Content
description: filter content
---

lets learn how to view, search and process text data through command line using tools like more, less, grep, sort and others. These commands are efficient while dealing with large files or command output without needing a text editor. 

## More

- The `more` command is a **pager** used to view long outputs **one screen at a time**.

```bash
cat /etc/passwd | more
```

This displays the content of `/etc/passwd` page by page.  [Q] to leave the pager

## Less

- The `less` command is an **improved pager** tool with **more features** than `more`.

```bash
less /etc/passwd
```

This opens the file in a scrollable viewer.

- have similar display as `more`, but with **advanced navigation**:
    - Scroll **forward** and **backward**
    - Use `/` to **search** text
- Press **`Q`** to quit.
- Unlike `more`, the output **disappears** from the terminal after exiting.

### **Head**

- `head` command is used to **view the beginning** of a file or input.
- it displays the first 10 lines ****by default
- Example:
    
    ```bash
    head /etc/passwd
    ```
    
- prints the top 10 lines of the `/etc/passwd` file.
- You can customize the number of lines:
    
    ```bash
    head -n 5 filename.txt
    ```
    
    it shows first 5 line
    

## Tail

- Just opposite to head
- just use tail instead of head

```bash
tail /etc/passwd
```

- prints the last 10 lines of the `/etc/passwd` file.
- You can customize the number of lines:

```bash
tail -n 5 filename.txt
```

it shows last 5 line

## Sort

- sort command is use to arrange the line in the file

```bash
sort file.txt
```

(Sorts the lines in `file.txt` alphabetically)

```bash
sort -n numbers.txt
```

this is for numeric

## Grep

- `grep` command is used to **search for specific patterns** in files or output.
- it is great tool to search for specific term

```bash
$ cat /etc/passwd | grep "/bin/bash"

root:x:0:0:root:/root:/bin/bash
mrb3n:x:1000:1000:mrb3n:/home/mrb3n:/bin/bash
cry0l1t3:x:1001:1001::/home/cry0l1t3:/bin/bash
htb-student:x:1002:1002::/home/htb-student:/bin/bash
```

## Cut

- `cut` command is used to **extract sections** from each line of a file, based on a **delimiter**.

```bash
$ cat /etc/passwd | grep -v "false\|nologin" | cut -d: -f1

root
sync
postgres
mrb3n
cry0l1t3
htb-student
```
---
title: Permission Management
description: permission management
---

1. **Permissions**
    
    In Linux, permissions control who can access and modify files and directories, ensuring system security.
    
2. **Users & Groups**
    
    Every file belongs to a user and a group. Users can be part of one or more groups, gaining extra access through them.
    
3. **Types of Permissions**
    - **Read (r):** View the contents of a file or list directory contents
    - **Write (w):** Modify a file or add/remove files in a directory
    - **Execute (x):** Run a file or access a directory
4. **Permission Categories**
    - **Owner (user)**
    - **Group**
    - **Others (everyone else)**
5. **Directory Access Needs Execute Permission**
    
    To go *into* a directory, you must have **execute (x)** permission on it. Without it, you’ll get a **Permission Denied** error—even if you can see the directory name.
    
6. **Default Ownership**
    
    When we create a file or folder, we are automatically its owner and it's linked to our default group.
    
    ```bash
    $ ls -l file.txt
    
    -rw-r--r-- 1 john users  1024 Apr 15 12:00 file.txt
    -rw-r--r--   1   john   users   1024   Apr 15 12:00   file.txt
    │ │ │       │     │         │       │        │             │
    │ │ │       │     │         │       │        │             └── File name
    │ │ │       │     │         │       │        └── Last modified time
    │ │ │       │     │         │       └── File size (in bytes)
    │ │ │       │     │         └── Group name
    │ │ │       │     └── Owner name (user)
    │ │ │       └── Number of hard links
    │ │ └── Permissions for others
    │ └── Permissions for group
    └── Permissions for owner
    ```
    

```bash
$ ls -l /etc/passwd

-rwxrw-r--  1  root  root  1641  May  4  23:42  /etc/passwd
│ │  │  └─┘   │    │     │     │     │     └── File Name
│ │  │   │    │    │     │     │     └──────── Last Modified Time
│ │  │   │    │    │     │     └────────────── Month
│ │  │   │    │    │     └──────────────────── File Size (in bytes)
│ │  │   │    │    └────────────────────────── Group Owner
│ │  │   │    └─────────────────────────────── User (Owner)
│ │  │   └──────────────────────────────────── Number of Hard Links
│ │  └──────────────────────────────────────── Permissions for Others (r--)
│ └─────────────────────────────────────────── Permissions for Group (rw-)
└───────────────────────────────────────────── File Type and Owner Permissions (rwx)
                                                (File: '-', Directory: 'd', Symlink: 'l', etc.)
```

## Change Permissions

we can modify the permission using chmod command. 

| Symbol | Meaning |
| --- | --- |
| `u` | user/owner |
| `g` | group |
| `o` | others |
| `a` | all (user + group + others) |
| `+` | add permission |
| `-` | remove permission |
| `=` | set exact permission |

using these symbol lets make use of it to change permissions

```bash
$ ls -l shell
-rwxr-x--x 1 cry0l1t3 htbteam 0 May  4 22:12 shell
```

if you want to give permission to all the users for the shell file

```bash
$ chmod a+r shell && ls -l shell
-rwxr-xr-x 1 cry0l1t3 htbteam 0 May  4 22:12 shell
```

**Octal numeric method**

each permission have value, for example octal value representing full access permissions is 777. This means the user, group and others all have read (r), write (w), and execute (x) permissions.

| Permission | Value |
| --- | --- |
| Read (`r`) | 4 |
| Write (`w`) | 2 |
| Execute(`x`) | 1 |

```bash
$ chmod 754 shell && ls -l shell
-rwxr-xr-- 1 cry0l1t3 htbteam 0 May  4 22:12 shell
```

example table

| User | Binary | Octal | Permission |
| --- | --- | --- | --- |
| Owner | 111 | 7 | rwx |
| Group | 101 | 5 | r-x |
| Others | 100 | 4 | r-- |

## Change Owner

To change the owner and/or the group assignments of a file or directory, we can use
the chown command.

```bash
chown < new owner>:<new group> <file_or_directory>
```

assuming that we want to change both owner and group to root

```bash
$ chown root:root shell && ls -l shell

-rwxr-xr-- 1 root root 0 May  4 22:12 shell
```

## SUID & SGID

what is it?

- permissions set on a binary execution
- a special type of file permissions given to a file

How does it look like?

- In a permission string like `rwsr-xr-x`, the `s` in the owner's `x` position means **SUID** is set.
- In `rwxr-sr-x`, the `s` in the group’s `x` position means **SGID** is set.

```bash
-rwsr-xr-x 1 root root 12345 Apr 15 /usr/bin/passwd
```

the `passwd` command runs as **root**, even if a normal user executes it. This is needed because `passwd` must edit `/etc/shadow`, which only root can write to.
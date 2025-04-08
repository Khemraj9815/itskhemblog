---
title: System Information
description: system info
---

Let’s explore key terminal tools to understand Linux systems—essential for daily tasks, security checks and identifying risks.

| Command   | Description                                                                 |
|-----------|-----------------------------------------------------------------------------|
| whoami    | Displays current username.                                                  |
| id        | Returns user's identity.                                                    |
| hostname  | Sets or prints the name of the current host system.                        |
| uname     | Prints basic information about the OS and system hardware.                 |
| pwd       | Returns the current working directory name.                                |
| ifconfig  | Views or assigns an address to a network interface; configures parameters. |
| ip        | Shows or manipulates routing, network devices, interfaces, and tunnels.    |
| netstat   | Shows network status.                                                       |
| ss        | Investigates sockets.                                                       |
| ps        | Shows process status.                                                       |
| who       | Displays who is logged in.                                                  |
| env       | Prints environment or sets and executes commands.                          |
| lsblk     | Lists block devices.                                                        |
| lsusb     | Lists USB devices.                                                          |
| lsof      | Lists opened files.                                                         |
| lspci     | Lists PCI devices.                                                          |

Now lets apply these command in real scenario.

Those command are usually used when we are in new environmant or when we get remote shell. So to access the remote shell we use **Secure Shell(SSH)** which is widely used protocol, making it fast, secure and efficient.

Lets start with connecting the shell.

    $ ssh user_name@[IP address]

after you run this command you need to enter password. and you will get the shell.

**Hostname** 

    $ hostname
    nixfund

it will just return the name of the computer. that we are logged in.

**Whoami**

this command can be used both in windows and linux to get the current username.

    $ whoami
    username

**Id**

The `id` command shows which user and groups you belong to, helping you see what access you have on the system.

    uid=1000(username) gid=1000(username) groups=1000(username),27(sudo),4(adm)

**Uname**

The `uname` command shows system information and using `man uname` in the terminal opens its manual, listing all the options you can use and what they do.

    UNAME(1)                  User Commands                 UNAME(1)

NAME
       uname - print system information

SYNOPSIS
       uname [OPTION]...

DESCRIPTION
       Print certain system information.  With no OPTION, same as -s.

       -a, --all               print all information
       -s, --kernel-name       print the kernel name
       -n, --nodename          print the network node hostname
       -r, --kernel-release    print the kernel release
       -v, --kernel-version    print the kernel version
       -m, --machine           print the machine hardware name
       -p, --processor         print the processor type (non-portable)
       -i, --hardware-platform print the hardware platform (non-portable)
       -o, --operating-system  print the operating system
       --help     display this help and exit
       --version  output version information and exit

basically it shows what the command does, how to use it and all the options you can pass to get specific system information. 

The `uname -a` command shows full system info like kernel, hostname, and OS, but skips processor and platform if unknown.

    $ uname -a
    Linux kali 6.5.0-kali1-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.5.3-1kali1 (2023-09-19) x86_64 GNU/Linux

From the output of `uname -a`, we can see that the kernel name is **Linux**, the hostname is **kali**, the kernel release is **6.5.0-kali1-amd64**, the kernel version is **#1 SMP PREEMPT_DYNAMIC Debian 6.5.3-1kali1 (2023-09-19)**, the machine hardware name is **x86_64**, and the operating system is **GNU/Linux**. Running any of the options like `-s`, `-r`, or `-o` separately will show just that specific piece of information.

### Uname to Obtain Kernel Release

if we wantbto search for potential kernel exploits

    $ uname -r
    4.15.0-99-generic

By knowing the system info, like the kernel version, we can search for known exploits (e.g., "4.15.0-99-generic exploit"). It's useful to study commands and man pages—they may seem boring, but they help us learn powerful features and spot vulnerabilities for privilege escalation later. Try a few practice exercises to get more comfortable with them.


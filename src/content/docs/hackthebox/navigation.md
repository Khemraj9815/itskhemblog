---
title: Navigation
description: navigation
---

Being a Linux user is a different vibe—navigating, editing, and mastering files through the terminal looks cool and yeah, we can totally flex that in front of other users! 😎🔥

So lets get started with this. To check where you are(means which directory you are in), this can be achieved by `pwd` command.

    $ pwd
    /home

To list the content inside the directory use `ls`.

    $ ls
    Desktop  Documents   Downloads   Music   Pictures   Public   Templates   Videos

if you want more information from the specific directory

    $ ls -l

    total 32
    drwxr-xr-x 2 cry0l1t3 htbacademy 4096 Nov 13 17:37 Desktop
    drwxr-xr-x 2 cry0l1t3 htbacademy 4096 Nov 13 17:34 Documents
    drwxr-xr-x 3 cry0l1t3 htbacademy 4096 Nov 15 03:26 Downloads
    drwxr-xr-x 2 cry0l1t3 htbacademy 4096 Nov 13 17:34 Music
    drwxr-xr-x 2 cry0l1t3 htbacademy 4096 Nov 13 17:34 Pictures
    drwxr-xr-x 2 cry0l1t3 htbacademy 4096 Nov 13 17:34 Public
    drwxr-xr-x 2 cry0l1t3 htbacademy 4096 Nov 13 17:34 Templates
    drwxr-xr-x 2 cry0l1t3 htbacademy 4096 Nov 13 17:34 Videos



If you want to list the hidden files you can use

    $ ls -la

    total 403188
    drwxr-xr-x 2 cry0l1t3 htbacademy 4096 Nov 13 17:37 .bash_history
    drwxr-xr-x 2 cry0l1t3 htbacademy 4096 Nov 13 17:37 .bashrc
    ...SNIP...
    drwxr-xr-x 2 cry0l1t3 htbacademy 4096 Nov 13 17:37 Desktop
    drwxr-xr-x 2 cry0l1t3 htbacademy 4096 Nov 13 17:34 Documents
    drwxr-xr-x 3 cry0l1t3 htbacademy 4096 Nov 15 03:26 Downloads
    drwxr-xr-x 2 cry0l1t3 htbacademy 4096 Nov 13 17:34 Music
    drwxr-xr-x 2 cry0l1t3 htbacademy 4096 Nov 13 17:34 Pictures
    drwxr-xr-x 2 cry0l1t3 htbacademy 4096 Nov 13 17:34 Public
    drwxr-xr-x 2 cry0l1t3 htbacademy 4096 Nov 13 17:34 Templates
    drwxr-xr-x 2 cry0l1t3 htbacademy 4096 Nov 13 17:34 Videos

The output shows total disk space used (in 1024-byte blocks) and detailed info for each file like permissions, owner, size, and last modified date.
| Column            | Description                                      |
|-------------------|--------------------------------------------------|
| `drwxr-xr-x`      | Type and permissions                             |
| `2`               | Number of hard links                             |
| `cry0l1t3`        | Owner of the file/directory                      |
| `htbacademy`      | Group owner of the file/directory                |
| `4096`            | Size in bytes or blocks used                     |
| `Nov 13 17:37`    | Date and time last modified                      |
| `Desktop`         | Name of the file or directory                    |

Next its to navigate between directory.

    $ cd home

    [home]$ 

if you want to jump to previous directory 

    $ cd -

Now if you want to parent directory 

    $ cd ..

Lastly to clear your terminal 

    $ clear

You can use Ctrl + l as well


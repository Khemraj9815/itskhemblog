---
title: Linux Fundamentals
description: basics of linux
---

## Linux History

### Origin

- Inspired by UNIX and Minix
- Developed by Linus Torvalds, a Finnish computer science student.

### How it started

- It was started as personal project.
- Linus wrote the kernel and released it publicly in 1991.
- Combined with GNU tools to form a full OS.
- Developed further through global open-source collaboration.

# Linux Structure

Linux is Operating System just like:
* windows 
* macOS
* iOS
* Android 

Operating System is software that manages hardware resources, facilitating communication between software
applications and hardware components. Unlike some other operating system, linux comes in many distributions often called "distros".

## Linux Philosophy

Linux Philosophy focuses on simplicity, modularity and openness. It is build small, single purpose programs that perform one task well. These small program can be combined to in different ways to accomplish complex operations, promoting efficiency and flexibility. Linux follows five core principles.

1. **Everything is File** : In Linux, most things (including devices and settings) are treated as files. Settings are stored in simple text files.

2. **Small, single-purpose programs** : Linux has many small tools, each doing one job well. We can use them alone or together.

3. **Ability to chain programs together to perform complex tasks** : We can connect tools to work together and accomplish complex task.

4. **Avoid captive user interfaces** : Linux is designed to work from the command line (terminal), giving users more privilege to system. 

5. **Configuration data stored in a text file** : System settings are saved in plain text files. For example, **/etc/passwd** stores user information.

## Components

| **Component**     | **Description** |
|-------------------|-----------------|
| **Bootloader**    |It helps load and start the operating system. |
| **OS Kernel**     | The core part of the OS that controls hardware and allows software to communicate with devices. |
| **Daemons**       | Background services that handle tasks like printing, scheduling and sound. They run after boot or login. |
| **OS Shell**      | A command-line interface that lets users interact with the system using text commands. examples: Bash |
| **Graphics Server** | Provides the graphical interface (like windows and menus) on the screen so users don’t always need to use commands. |
| **Window Manager**  | Also called the GUI. It includes environments like GNOME, KDE, and Cinnamon. It offers desktop tools like file and web browsers. |
| **Utilities**       | These are small programs that perform specific tasks for users or other programs, like file search, archiving, or text editing. |


## Linux Architecture

The Linux operating system can be broken down into several layers:

| **Layer**        | **Description** |
|------------------|-----------------|
| **Hardware**     | Physical components like RAM, hard drive, CPU and other devices. |
| **Kernel**       | The core of Linux. It manages and virtualizes hardware resources such as CPU, memory and data access for different processes. |
| **Shell**        | The command-line interface (CLI) where users enter commands to interact with the kernel. |
| **System Utility** | Provides users with tools and utilities to access and use all the functionalities of the operating system. |

## Linux File System

Linux file are structured in a tree-like hierarchy.

!["linux file system"](/src/assets/linux/linuxfilesystem.png)

| **Path**    | **Description** |
|-------------|-----------------|
| `/`        | The root directory. It contains all essential files required to boot the OS and mount other filesystems. |
| `/bin`      | Contains essential command binaries used in single-user mode and during system boot. |
| `/boot`     | Holds the bootloader, kernel and other files required to boot the Linux OS. |
| `/dev`      | Contains special device files to access hardware devices. |
| `/etc`      | Stores local system configuration files and settings for installed applications. |
| `/home`     | Each user has a personal directory here for storing files and settings. |
| `/lib`      | Shared library files essential for system boot and basic functionality. |
| `/media`    | Mount point for external media like USB drives and CDs. |
| `/mnt`      | A temporary mount point used to manually mount filesystems. |
| `/opt`      | Used for installing optional or third-party software packages. |
| `/root`     | The home directory of the root (administrator) user. |
| `/sbin`     | Contains system binaries used for system administration. |
| `/tmp`      | Stores temporary files; usually cleared on system reboot. |
| `/usr`      | Contains user applications, libraries, documentation and more. |
| `/var`      | Holds variable data like logs, emails, cron jobs and web server files. |

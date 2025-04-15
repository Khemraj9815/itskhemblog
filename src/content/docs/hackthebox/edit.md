---
title: Editing File
description: how to edit file
---

To edit the file you can use `nano` command. it can write on the existing file. If there is no file that you have named in the command it will create one. 

```bash
    $ nano file.txt
```

Now we can save the file by pressing [CTRL + O] and confirm the file name with [ENTER].

After we have saved the file, we can leave the editor with [CTRL + X].

Now to see what content is inside the file 

```bash
$ cat file.txt
```

there are multiple command to see the file content. you can even use **more** command

```bash
$ more file.txt
```

For the linux there is file called `/etc/passwd`, it contains essential information such as their usernames, user IDs (UIDs), group IDs (GIDs), and home directories. Before `passwd` file was used to store password hashes but now it is stored in `/etc/shadow` file which has strict permission. It is important to know this kind of file as a penetration tester.

## VIM

it is just like nano

Vim provides an interface to external programs, such as grep, awk, sed, etc.,

| **Mode** | **Description** | **How to Enter** |
| --- | --- | --- |
| Normal Mode | Default mode for commands/navigation | Press `Esc` |
| Insert Mode | Used for typing and editing text | Press `i`, `I`, `a`, `A`, `o`, or `O` |
| Visual Mode | Used to select text | Press `v` |
| Command-Line Mode | Used for saving, quitting, etc. | Press `:` in normal mode |

### **VimTutor**

- **VimTutor** is a built-in tutorial for learning **Vim** step-by-step.
- It is great for beginners to practice **basic commands and modes**
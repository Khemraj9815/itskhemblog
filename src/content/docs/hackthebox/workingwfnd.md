---
title: Managing file and Directory
description: navigation
---

Unlike Windows, where we use Explorer, Linux lets us access and manage files through the terminal—it's faster, more efficient and doesn't always need editors like vim or nano.

You can run multiple command at onec, redirecting output to a file and automating batch editing task.

Now lets explore managing file and directory

### Create, Move, and Copy

if you want to creat new file 

    $ touch <filename>

to make new directory

    $ mkdir <name>

mkdir has option to make parent directories automatically. this saves time.

    $ touch -p Storage/local/user/documents

now if you want to know the structure of the dorectory use this command

    $ tree .

    └── Storage
    └── local
    └── user
    └── documents

    4 directories

this is the folder structure of the directory that we have created earlier. It even shows file 

now if you want to create a file from home directory or any other

    $ touch ./Storage/local/user/userinfo.txt
     
lets see the result for above command as we know how to see the structure of directory

    $ tree .
    └── Storage
    └── local
    └── user
    ├── documents
    └── userinfo.txt
    4 directories, 1 files

With the `mv` command we can move and rename the files and directories

    $ mv <file/directory> <renamed file/directory>

    $ mv info.txt information.txt

To copy and paste file

    $ cp (specify the file) (point to the directory you want to copy the file)

    $ cp Storage/file_name Storage/local/

That's it for now!!!


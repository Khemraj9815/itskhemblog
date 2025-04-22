---
title: NFS
description: nfs
---

Network File System is a networking protocol for distributed file sharing.

- has same purpose as SMB
- used between linux and Unix system
- NFS client cannot communicate directly with SMB servers

| **Version** | **Features** |
| --- | --- |
| **NFSv2** | - Early version, widely supported- Operates over **UDP** only- Limited file size support- Stateless protocol |
| **NFSv3** | - Adds support for **larger file sizes**- **Improved error reporting**- Can use both **UDP and TCP**- Still **stateless**, but more efficient- Not fully backward compatible with NFSv2 |
| **NFSv4** | - **Stateful protocol** (first NFS version to be stateful)- **Integrated security** via **Kerberos**- **Works over firewalls**, no need for portmapper |
- A significant advantage of NFSv4 over its predecessors is that only one UDP or TCP port 2049 is used to run the service, which simplifies the use of the protocol across firewalls.
- The NFS protocol has no mechanism for authentication or authorization
- server is responsible for translating the client's user information into the file system's format and converting the corresponding authorization details into the required UNIX syntax as accurately as possible.
- The most common authentication is via UNIX UID/GID and group memberships, which is why this syntax is most likely to be applied to the NFS protocol.

**when NFS is used?**

- used for sharing big files or large volume of files across multiple computers within a network.

**Default Configuration**

- it do not have options like FTP and SMB
- The /etc/exports file contains a table of physical filesystems on an NFS server accessible by the clients.

```python
$ cat /etc/exports 

# /etc/exports: the access control list for filesystems which may be exported
#               to NFS clients.  See exports(5).
#
# Example for NFSv2 and NFSv3:
# /srv/homes       hostname1(rw,sync,no_subtree_check) hostname2(ro,sync,no_subtree_check)
#
# Example for NFSv4:
# /srv/nfs4        gss/krb5i(rw,sync,fsid=0,crossmnt,no_subtree_check)
# /srv/nfs4/homes  gss/krb5i(rw,sync,no_subtree_check)
```

| **Option** | **Description** |
| --- | --- |
| **rw** | Grants **read and write** permissions. |
| **ro** | Grants **read-only** permissions. |
| **sync** | Performs **synchronous** data transfer – safer but **slower**. |
| **async** | Performs **asynchronous** data transfer – **faster**, but data might be lost on crash. |
| **secure** | Requires requests to originate from **ports below 1024**. |
| **insecure** | Allows requests from **ports above 1024**. |
| **no_subtree_check** | Disables verification of the file’s location within the exported subtree – **improves performance**. |
| **root_squash** | Maps **root user (UID/GID 0)** on the client to **anonymous user** on the server – enhances **security** by preventing root-level access. |

**ExportFS**

```python
root@nfs:~# echo '/mnt/nfs  10.129.14.0/24(sync,no_subtree_check)' >> /etc/exports
root@nfs:~# systemctl restart nfs-kernel-server 
root@nfs:~# exportfs

/mnt/nfs      	10.129.14.0/24
```

We have shared the folder /mnt/nfs to the subnet 10.129.14.0/24 with the setting shown above. This means that all hosts on the network will be able to mount this NFS share and inspect the contents of this folder.

**Dangerous Settings**

| **Option** | **Description** |
| --- | --- |
| **rw** | Grants **read and write** permissions. |
| **insecure** | Allows connections from **ports above 1024**. |
| **nohide** | If a **filesystem is mounted below an exported directory**, it will also be visible to clients — useful for exporting multiple mounts as a single hierarchy. |
| **no_root_squash** | **Disables root squashing** – the root user on the client retains **UID/GID 0** on the server, giving **full root access** to files. (⚠️ Use with caution!) |
- insecure options is dangerous
- prevents the fact that no users can use sockets above port 1024 for the NFS service and interact with it.

# **Foot-printing the Service**

When footprinting NFS, the TCP ports 111 and 2049 are essential. We can also get information about the NFS service and the host via RPC, as shown below in the example.

**Nmap**

```python
$ sudo nmap 10.129.14.128 -p111,2049 -sV -sC

Starting Nmap 7.80 ( https://nmap.org ) at 2021-09-19 17:12 CEST
Nmap scan report for 10.129.14.128
Host is up (0.00018s latency).

PORT    STATE SERVICE VERSION
111/tcp open  rpcbind 2-4 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  3,4          111/tcp6  rpcbind
|   100000  3,4          111/udp6  rpcbind
|   100003  3           2049/udp   nfs
|   100003  3           2049/udp6  nfs
|   100003  3,4         2049/tcp   nfs
|   100003  3,4         2049/tcp6  nfs
|   100005  1,2,3      41982/udp6  mountd
|   100005  1,2,3      45837/tcp   mountd
|   100005  1,2,3      47217/tcp6  mountd
|   100005  1,2,3      58830/udp   mountd
|   100021  1,3,4      39542/udp   nlockmgr
|   100021  1,3,4      44629/tcp   nlockmgr
|   100021  1,3,4      45273/tcp6  nlockmgr
|   100021  1,3,4      47524/udp6  nlockmgr
|   100227  3           2049/tcp   nfs_acl
|   100227  3           2049/tcp6  nfs_acl
|   100227  3           2049/udp   nfs_acl
|_  100227  3           2049/udp6  nfs_acl
2049/tcp open  nfs_acl 3 (RPC #100227)
MAC Address: 00:00:00:00:00:00 (VMware)

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 6.58 seconds
```

- The rpcinfo NSE script retrieves a list of all currently running RPC services

```python
$ sudo nmap --script nfs* 10.129.14.128 -sV -p111,2049

Starting Nmap 7.80 ( https://nmap.org ) at 2021-09-19 17:37 CEST
Nmap scan report for 10.129.14.128
Host is up (0.00021s latency).

PORT     STATE SERVICE VERSION
111/tcp  open  rpcbind 2-4 (RPC #100000)
| nfs-ls: Volume /mnt/nfs
|   access: Read Lookup NoModify NoExtend NoDelete NoExecute
| PERMISSION  UID    GID    SIZE  TIME                 FILENAME
| rwxrwxrwx   65534  65534  4096  2021-09-19T15:28:17  .
| ??????????  ?      ?      ?     ?                    ..
| rw-r--r--   0      0      1872  2021-09-19T15:27:42  id_rsa
| rw-r--r--   0      0      348   2021-09-19T15:28:17  id_rsa.pub
| rw-r--r--   0      0      0     2021-09-19T15:22:30  nfs.share
|_
| nfs-showmount: 
|_  /mnt/nfs 10.129.14.0/24
| nfs-statfs: 
|   Filesystem  1K-blocks   Used       Available   Use%  Maxfilesize  Maxlink
|_  /mnt/nfs    30313412.0  8074868.0  20675664.0  29%   16.0T        32000
| rpcinfo: 
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  3,4          111/tcp6  rpcbind
|   100000  3,4          111/udp6  rpcbind
|   100003  3           2049/udp   nfs
|   100003  3           2049/udp6  nfs
|   100003  3,4         2049/tcp   nfs
|   100003  3,4         2049/tcp6  nfs
|   100005  1,2,3      41982/udp6  mountd
|   100005  1,2,3      45837/tcp   mountd
|   100005  1,2,3      47217/tcp6  mountd
|   100005  1,2,3      58830/udp   mountd
|   100021  1,3,4      39542/udp   nlockmgr
|   100021  1,3,4      44629/tcp   nlockmgr
|   100021  1,3,4      45273/tcp6  nlockmgr
|   100021  1,3,4      47524/udp6  nlockmgr
|   100227  3           2049/tcp   nfs_acl
|   100227  3           2049/tcp6  nfs_acl
|   100227  3           2049/udp   nfs_acl
|_  100227  3           2049/udp6  nfs_acl
2049/tcp open  nfs_acl 3 (RPC #100227)
MAC Address: 00:00:00:00:00:00 (VMware)

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 0.45 seconds
```

**Show Available NFS Shares**

```python
$ showmount -e 10.129.14.128

Export list for 10.129.14.128:
/mnt/nfs 10.129.14.0/24
```

**Mounting NFS Share**

```python
$ mkdir target-NFS
$ sudo mount -t nfs 10.129.14.128:/ ./target-NFS/ -o nolock
$ cd target-NFS
$ tree .

.
└── mnt
    └── nfs
        ├── id_rsa
        ├── id_rsa.pub
        └── nfs.share

2 directories, 3 files
```

There we will have the opportunity to access the rights and the usernames and groups to whom the shown and viewable files belong. Because once we have the usernames, group names, UIDs, and GUIDs, we can create them on our system and adapt them to the NFS share to view and modify the files.

**List Contents with Usernames & Group Names**

```python
$ ls -l mnt/nfs/

total 16
-rw-r--r-- 1 cry0l1t3 cry0l1t3 1872 Sep 25 00:55 cry0l1t3.priv
-rw-r--r-- 1 cry0l1t3 cry0l1t3  348 Sep 25 00:55 cry0l1t3.pub
-rw-r--r-- 1 root     root     1872 Sep 19 17:27 id_rsa
-rw-r--r-- 1 root     root      348 Sep 19 17:28 id_rsa.pub
-rw-r--r-- 1 root     root        0 Sep 19 17:22 nfs.share
```

**List Contents with UIDs & GUIDs**

```python
$ ls -n mnt/nfs/

total 16
-rw-r--r-- 1 1000 1000 1872 Sep 25 00:55 cry0l1t3.priv
-rw-r--r-- 1 1000 1000  348 Sep 25 00:55 cry0l1t3.pub
-rw-r--r-- 1    0 1000 1221 Sep 19 18:21 backup.sh
-rw-r--r-- 1    0    0 1872 Sep 19 17:27 id_rsa
-rw-r--r-- 1    0    0  348 Sep 19 17:28 id_rsa.pub
-rw-r--r-- 1    0    0    0 Sep 19 17:22 nfs.share
```

- It is important to note that if the root_squash option is set, we cannot edit the [backup.sh](http://backup.sh/) file even as root.

- We can also use NFS for further escalation. For example, if we have access to the system via SSH and want to read files from another folder that a specific user can read, we would need to upload a shell to the NFS share that has the SUID of that user and then run the shell via the SSH user.

### **Unmounting**

```python
$ cd ..
$ sudo umount ./target-NFS
```

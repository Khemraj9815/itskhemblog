---
title: Active Directory Rights and Privileges
description: adrp
---

**Rights:** It is permission to access things like files, folder, or other important things.

**Privileges:** This is permission to do important actions on the computer or system

### Built-in AD Groups

Active Directory comes with default groups that have special permissions. These groups are created automatically when a domain is set up. Some of them have very powerful rights, like controlling the domain or managing users. If attackers gain access to these groups, they can take over the domain.

That’s why it's important to carefully manage who is in these groups.

| **Group Name** | **Simple Description** |
| --- | --- |
| **Account Operators** | Can create and manage most user and group accounts, but not admin-level accounts. |
| **Administrators** | Have full control over the domain or computer. |
| **Backup Operators** | Can back up/restore all files, log in to DCs, and possibly steal credentials. |
| **DnsAdmins** | Can manage DNS server settings (only if DNS role is installed). |
| **Domain Admins** | Full control over the entire domain; also local admins on all domain-joined computers. |
| **Domain Computers** | Group for all computers (not DCs) joined to the domain. |
| **Domain Controllers** | Group for all Domain Controllers (DCs) in the domain. |
| **Domain Guests** | Group for guest users in the domain. |
| **Domain Users** | All regular user accounts in the domain are part of this group. |
| **Enterprise Admins** | Can manage the entire AD forest; powerful across all domains. |
| **Event Log Readers** | Can read event logs on computers. |
| **Group Policy Creator Owners** | Can create and manage Group Policies. |
| **Hyper-V Administrators** | Full access to manage virtual machines; if managing virtual DCs, they are like Domain Admins. |
| **IIS_IUSRS** | Used by the web server software (IIS). |
| **Pre–Windows 2000 Compatible Access** | Allows old systems to read AD info; can be risky if misused. |
| **Print Operators** | Can manage printers on DCs; may be abused for attacks. |
| **Protected Users** | Get extra protection from credential theft. |
| **Read-only Domain Controllers** | All Read-Only DCs are members of this group. |
| **Remote Desktop Users** | Can connect to systems using Remote Desktop. |
| **Remote Management Users** | Can remotely manage computers using WinRM. |
| **Schema Admins** | Can change the AD structure (schema); very powerful, only exists in forest root domain. |
| **Server Operators** | Can manage services and files on DCs; empty by default. |

### User Rights Assignment

Windows allows specific rights to be assigned to user accounts, often through Group Policy (GPO).  Based on group membership or admin configuration in GPO.  Some rights can be abused by attackers to gain higher privileges or access sensitive data. If an attacker gets write access to a GPO applied to a group they’re in, they can use tools (like SharpGPOAbuse) to assign themselves powerful rights.

| **Privilege** | **Simple Description** |
| --- | --- |
| **SeRemoteInteractiveLogonRight** | Lets a user log in via **Remote Desktop (RDP)**, which can be used to **steal data or gain higher access**. |
| **SeBackupPrivilege** | Allows a user to **back up system files** like SAM or NTDS.dit, which can contain **passwords**. |
| **SeDebugPrivilege** | Lets a user **read process memory**, which can be used with tools like **Mimikatz** to **steal passwords**. |
| **SeImpersonatePrivilege** | Lets a user **act as another account** (e.g., SYSTEM), useful for **privilege escalation** using tools. |
| **SeLoadDriverPrivilege** | Allows loading of **device drivers**, which can be used to **run malicious code** and gain more access. |
| **SeTakeOwnershipPrivilege** | Lets a user **take ownership of files or objects**, giving them **access even without original permission**. |

Giving the wrong privileges to a user in Active Directory can lead to serious security risks. Even a small mistake by an admin, like assigning a powerful right to a regular account can allow attackers to take over systems or the entire network. It's important to carefully manage user rights to prevent misuse and privilege escalation.

### Viewing a User's Privileges

if you want to see what user rights the current user has user whoami /priv in CMD. 

Some powerful rights only appear or work when running CMD or PowerShell as Administrator (called an elevated session). User Account Control (UAC) is a Windows security feature that prevents apps from running with full admin rights unless approved. Comparing a normal vs. elevated session shows big differences in user privileges. Standard AD users will have fewer rights than admins, especially in non-elevated mode.

```bash
PS C:\user> whoami /priv
PRIVILEGES INFORMATION
----------------------
Privilege Name
Description
State
============================= ============================== ========
SeChangeNotifyPrivilege
Bypass traverse checking
Enabled
SeIncreaseWorkingSetPrivilege Increase a process working set Disabled
```

### **Domain Admin Rights Non-Elevated**

Even if you're a Domain Admin, running CMD/PowerShell without elevation shows only basic rights (similar to a normal user).

- This happens because Windows does not grant full rights by default—you must run in elevated mode to access powerful privileges.
- This behavior is managed by User Account Control (UAC) to stop programs from running with high-level permissions unless needed.
- UAC helps reduce the risk of unauthorized or harmful actions on the system.

```bash
C:\> whoami /priv

PRIVILEGES INFORMATION
----------------------
Privilege Name                    Description                                  State
=============================    ====================================        ============
SeShutdownPrivilege               Shut down the system                         Disabled
SeChangeNotifyPrivilege           Bypass traverse checking                      Enabled
SeUndockPrivilege                 Remove computer from docking station          Disabled
SeIncreaseWorkingSetPrivilege     Increase a process working set               Disabled
SeTimeZonePrivilege               Change the time zone                          Disabled
```

### Domain Admin Rights Elevated

When running an elevated CMD or PowerShell session (with Administrator privileges), you will see additional rights and privileges that were not available in a non-elevated session. These rights give you significant control over the domain and the ability to perform powerful administrative tasks.

To elevate your session, you typically right-click CMD or PowerShell and select Run as Administrator. Once elevated, use the whoami /priv command to see a list of privileges. A Domain Admin in an elevated session may have the following privileges:

```bash
C:\> whoami /priv

PRIVILEGES INFORMATION
----------------------
Privilege Name                    Description                                      State
=============================    ====================================            ============
SeBackupPrivilege                Backup files and directories                    Enabled
SeDebugPrivilege                 Debug programs and processes                    Enabled
SeImpersonatePrivilege           Impersonate a user                             Enabled
SeRemoteInteractiveLogonRight    Logon via Remote Desktop (RDP)                   Enabled
SeRestorePrivilege               Restore files and directories                   Enabled
SeShutdownPrivilege              Shut down the system                            Enabled
SeChangeNotifyPrivilege          Bypass traverse checking                         Enabled
SeLoadDriverPrivilege            Load and unload device drivers                  Enabled
SeTakeOwnershipPrivilege         Take ownership of objects                       Enabled
SeTimeZonePrivilege              Change the time zone                             Enabled
```

User rights increase depending on the groups they are placed in and the privileges assigned to them. For example, members of the Backup Operators group receive specific rights related to system backup and recovery. However, some of these rights, such as SeBackupPrivilege, are not enabled by default in a non-elevated session, which is controlled by User Account Control (UAC).

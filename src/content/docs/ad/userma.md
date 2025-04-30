---
title: User & Machine Account
description: user and Machine Account
---

User accounts are created on both local systems and in Active Directory (AD) to allow individuals or services to log in and access system resources. When a user logs in, the system verifies their credentials and creates an access token that includes the user's identity and group memberships. This token is used to determine what the user can access.

User accounts are often grouped together for easier management—permissions can be assigned to groups instead of individual users, simplifying administration. In most organizations using AD, every employee has at least one user account. IT staff or help desk members may have multiple accounts (standard and admin accounts). Additionally, service accounts exist to run applications or background services securely under a specific context.

Organizations often retain disabled accounts for former or temporary employees in a dedicated Organizational Unit (OU) like “FORMER EMPLOYEES.” These are usually kept for audit purposes and should have their privileges removed.

User accounts can range in privileges from basic read-only access (Domain Users) to complete control (Enterprise Admins). Misconfigurations can easily grant users unintended access, making them a common target during penetration testing. Since users are often the weakest link—due to weak passwords, misuse, or poor practices—organizations must implement policies, training, and layered defenses to reduce risks associated with user accounts.

### Local Accounts

These are user accounts created and stored on a single Windows system, like a workstation or server. Their permissions only apply to that specific machine and are not valid across a domain.

There are several default local user account that are created on windows system:

1. Administrator: It is an account with full system control with its SID S-1-5-domain-500. It cannot be deleted or locked but can be renamed or disabled. It is disabled by default in modern machine.
2. Guest: Meant for temporary access with limited rights; disabled by default due to security risks.
3. Guest: Used by the OS to run critical services; has the highest privilege on the system.
4. Network Service: Runs services with limited rights and uses the host’s credentials on the network.
5. Local Service: Runs services with minimal privileges and presents anonymous credentials to the network.

### Domain User

Domain users are Active Directory accounts that can log in to any domain-joined machine and access shared resources like file servers and printers based on permissions or group membership.

- Unlike local users, their access extends across the domain.
- A critical account is KRBTGT, used by the Key Distribution Center (KDC) to issue Kerberos tickets.
- If it is compromised, KRBTGT allows attackers to create Golden Tickets, granting persistent and elevated domain access.

### User Naming Attributes

To improve security we can use naming attributes.

| **Attribute** | **Description** |
| --- | --- |
| **UserPrincipalName (UPN)** | Primary login name, typically in the format of an email address (e.g., [user@domain.com](mailto:user@domain.com)). |
| **ObjectGUID** | A unique, immutable identifier for the user that remains the same even if the user is deleted. |
| **SAMAccountName** | Legacy logon name used for compatibility with older Windows systems (pre-Windows 2000). |
| **objectSID** | The user’s Security Identifier, used to represent the user and its group memberships for security purposes. |
| **sIDHistory** | Stores previous SIDs from other domains if the user was migrated, ensuring retained access rights during domain migrations. |

### Domain-joined vs. Non-Domain-joined Machines

**Domain-joined Machine:**

- Centralized Management: Hosts joined to a domain can easily share information and access resources across the enterprise. All configurations, policies, and updates are managed by the Domain Controller (DC), making it efficient for large environments.
- Group Policy: Machines in a domain apply changes and configurations through Group Policy set by the domain controller. This ensures consistency across all domain-joined hosts.
- User Accessibility: Users within the domain can log in to any host within the domain and access their resources, not just their own machine. This makes it ideal for enterprise-level environments.

**Non-Domain-joined Machines:**

- Workgroup Setup: Non-domain joined computers are typically set up in workgroups, where there is no central management. These machines are not governed by domain policies, and resource sharing is more limited and manual.
- User Control: In workgroups, users have more control over their individual machines. Changes made on one machine do not affect others, and profiles are not shared across different hosts.
- Local User Accounts: Any user accounts on a non-domain machine exist only locally and are not accessible from other machines in the workgroup.

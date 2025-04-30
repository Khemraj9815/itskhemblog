---
title: Active Directory Groups
description: ad groups
---

Groups are an essential element in Active Directory (AD), as they allow administrators to group similar users together and assign collective rights and access to resources. These groups help simplify management by providing a way to apply permissions to multiple users at once rather than assigning rights to each user individually. However, groups are also a significant target for attackers and penetration testers, as excessive or misconfigured group memberships can inadvertently grant broader privileges than intended. This creates potential vulnerabilities that can be exploited if not carefully managed.

There are numerous built-in groups in Active Directory, and organizations often create custom groups to define specific access rights and privileges. Over time, the number of groups within a domain can grow exponentially, potentially leading to issues such as unintentional privilege escalation or excessive access being granted to users. For this reason, regular audits of group memberships and their associated privileges are essential to ensure that users have the appropriate level of access for their roles and responsibilities.
Groups vs Organizational Units (OUs)

It is important to distinguish between Groups and Organizational Units (OUs) in Active Directory:

- Groups are primarily used to assign permissions for accessing resources, like shared files, printers, and applications. Groups enable administrators to define access rights at a collective level, making resource management easier.
- OUs are used to organize objects such as users, groups, and computers within Active Directory for easier management. They also help in applying Group Policy settings to specific sets of objects. Additionally, OUs allow delegation of administrative tasks. For example, an administrator can delegate a user the right to reset passwords or unlock user accounts within an OU without granting them full administrative rights across the domain.

### Types of Groups

In Active Directory (AD), groups help simplify resource management and permissions assignment. Instead of assigning permissions to individual users, groups allow administrators to assign permissions to multiple users at once, making administration more efficient and reducing the risk of errors. Groups can be used to manage access to resources such as shared drives, printers, or applications, and they make it easier to audit access and revoke permissions when necessary. When a user is added to a group, they inherit the group’s permissions. If changes are required, users can be removed from the group, preserving permissions for others in the group.
Group Characteristics

Groups in AD are characterized by type and scope: 

1. Group Type: The type defines the purpose of the group.
    - Security Groups: These are used to assign permissions to users for accessing resources. When users are added to a security group, they inherit the permissions assigned to that group. Security groups are the most common group type for managing access to resources in a domain.
    - Distribution Groups: These are used for email distribution and are often associated with Microsoft Exchange. They allow users to send emails to a group by adding the group email to the “To” field. Distribution groups cannot be used to assign resource permissions within the domain.
2. Group Scope: The scope defines how the group can be used within the domain or forest, which affects where and how permissions are applied.

### Group Scope

1. **Domain Local Group**
    - A group that can only be used to manage permissions to resources within the domain where it was created.
    - It can contain users from any domain within the forest but is restricted to managing resources only in the domain where it exists.
2. **Global Group**
    - A group used to grant access to resources across different domains.
    - It can only contain accounts from the domain where it was created and can be used in other global and domain local groups to assign permissions across multiple domains.
3. **Universal Group**
    - A group that can manage resources across multiple domains within the same forest.
    - It can contain users from any domain within the forest and is used to grant permissions for resources that are distributed across domains. Changes to this group trigger forest-wide replication.

### Built-in vs. Custom Groups

1. **Built-in Groups**
    - Predefined groups created automatically when a domain is set up, typically with a Domain Local Group scope. These groups are intended for specific administrative purposes.
    - They are used to simplify administration by providing predefined roles, such as "Domain Admins." These groups do not allow nesting (groups within groups) and are typically restricted to adding only user accounts. For example, "Domain Admins" can only contain accounts from the same domain but can be added to other built-in groups for cross-domain administrative roles.
2. **Custom Groups**
    - Groups that are created by administrators for specific organizational purposes, either as security or distribution groups.
    - These groups allow greater flexibility in managing permissions and roles based on the organization's needs. Custom groups can be used for assigning resource access or for communication (like email lists), and they help manage access to specific resources within the organization. Custom groups are created to support the organization's unique structure or tools, such as when Microsoft Exchange is added to the domain, which creates additional security groups.

### Nested Group Membership

Nested group membership occurs when one group is added as a member of another group, allowing users in the first group to inherit the permissions and privileges of the second group. This is particularly common in Domain Local Groups within Active Directory (AD), where groups can be nested within other groups, and users can inherit indirect access through this nesting.

Nested groups can lead to situations where a user gains access to resources or permissions not directly granted to them but instead inherited through the groups they belong to. This can result in unintended privilege escalation, which may be difficult to detect without a thorough review of group memberships and nested structures. Tools like BloodHound can help identify these hidden privilege chains, making them invaluable for penetration testers, sysadmins, and security professionals. Nested groups also highlight the need for careful auditing of group memberships to avoid granting excessive or unintended access. For example, a user in the "Help Desk" group may indirectly acquire privileges of the "Tier 1 Admins" group if Help Desk is nested in that group, giving the user admin-level access to critical resources without them being a direct member.

### Important Group Attributes in Active Directory

1. **cn (Common Name)**: The name of the group in AD.
2. **member**: Lists users, groups, and contacts in the group.
3. **groupType**: Specifies the group type (Security or Distribution) and scope (Domain Local, Global, Universal).
4. **memberOf**: Shows groups that contain this group (nested memberships).
5. **objectSid**: The unique Security Identifier (SID) for the group.

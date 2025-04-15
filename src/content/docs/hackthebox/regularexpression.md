---
title: Regular Expression
description: regular expression
---

RegEx tasks using the `grep` command on `/etc/ssh/sshd_config`, assuming you're on your Pwnbox or any Linux terminal.

---

1. Show all lines that do NOT contain the `#` character:

```bash
grep -v "#" /etc/ssh/sshd_config
```

`v` inverts the match, showing lines that **don’t** contain `#`.

2. Search for all lines that contain a word that starts with `Permit`:

```bash
grep -E "\bPermit\w*" /etc/ssh/sshd_config

```

- `\b` ensures it’s a word boundary.
- `Permit\w*` matches `Permit` followed by any word characters (like `PermitRootLogin`, `PermitEmptyPasswords`, etc.).

3. Search for all lines that contain a word ending with `Authentication`:

```bash
grep -E "\w*Authentication\b" /etc/ssh/sshd_config

```

- `\w*Authentication` matches any word ending in `Authentication`.
- `\b` ensures it's the end of the word.

4. Search for all lines containing the word `Key`:

```bash
grep "Key" /etc/ssh/sshd_config
```

- Straightforward search for the string `Key`.

5. Search for all lines beginning with `Password` and containing `yes`:

```bash
grep -E "^Password.*yes" /etc/ssh/sshd_config
```

- `^Password` means the line must **start** with `Password`.
- `.*yes` means it must contain `yes` **somewhere** after.

6. Search for all lines that end with `yes`:

```bash
grep -E "yes$" /etc/ssh/sshd_config
```

- `yes$` ensures the line **ends** with `yes`.
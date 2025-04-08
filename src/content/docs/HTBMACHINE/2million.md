---
title: TwoMillion
description: two million description
---

Easy Linux Machine

![image.png](../../../assets/TwoMillion/image.png)

![image.png](../../../assets/TwoMillion/image%201.png)

**nmap**

![image.png](../../../assets/TwoMillion/image%202.png)

two ports are open 

port 22 ssh and port 80 http

![image.png](../../../assets/TwoMillion/image%203.png)

![image.png](../../../assets/TwoMillion/image%204.png)

Added to host

![image.png](../../../assets/TwoMillion/image%205.png)

This is the landing page for the [2million.](http://2million.ht)htb

![image.png](../../../assets/TwoMillion/image%206.png)

There is no third party used for this website 

![image.png](../../../assets/TwoMillion/image%207.png)

There is a login page

Since I don't have legitimate credentials I have to skip this for now.

![image.png](../../../assets/TwoMillion/image%208.png)

there are few hidden directories 

![image.png](../../../assets/TwoMillion/image%209.png)

it seems like there is something I need to do with the invite directory

![image.png](../../../assets/TwoMillion/image%2010.png)

now what?
invite code?

from where do I get invite code?

even to register we must have invite code to register.

as per the above picture “hack the invite process” we really need to have the invite  process.

how can I get it??

If I want to have the invite code, it is necessary to have source code or how invite code is generated or backend.

in background I perform subdomain brute force 

![image.png](../../../assets/TwoMillion/image%2011.png)

no subdomain found

So I inspect the source code, end up having nothing.

when I inspect in the network there is a inviteapi.js file 
I am sure that it is the one which is supplying the invite code 

![image.png](../../../assets/TwoMillion/image%2012.png)

![image.png](../../../assets/TwoMillion/image%2013.png)

![image.png](../../../assets/TwoMillion/image%2014.png)

I was stuck here for a while, understanding how the code works 

```bash
function verifyInviteCode(code) {
    var formData = { "code": code };

    $.ajax({
        type: "POST",
        dataType: "json",
        url: '/api/v1/invite/verify',
        data: formData,
        success: function (response) {
            console.log(response);
        },
        error: function (response) {
            console.log(response);
        }
    });
}

function makeInviteCode() {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: '/api/v1/invite/how/to/generate',
        success: function (response) {
            console.log(response);
        },
        error: function (response) {
            console.log(response);
        }
    });
}
```

- the makeInviteCode function makes request to the endpoint “/api/v1/invite/how/to/generate” and it display the response

![image.png](../../../assets/TwoMillion/image%2015.png)

- I call the above function

![image.png](../../../assets/TwoMillion/image%2016.png)

I couldn’t find any invite here, maybe I missed it. Still then I got some information regarding the invite code. It is encrypted as rot13

So with the help of ai I came up with the solution 

![image.png](../../../assets/TwoMillion/image%2017.png)

![image.png](../../../assets/TwoMillion/image%2018.png)

![image.png](../../../assets/TwoMillion/image%2019.png)

after decoding it I finally got the invite code

when I paste the invitation code to the invite page it redirected to register page with invitation code 

i registered using the invitation code 

![image.png](../../../assets/TwoMillion/image%2020.png)

![image.png](../../../assets/TwoMillion/image%2021.png)

![image.png](../../../assets/TwoMillion/image%2022.png)

![image.png](../../../assets/TwoMillion/image%2023.png)

Here I am in home page as a normal user

Now whats next!!!

see the functionality of the website

don’t forget to see the source code

I couldn’t see any informative info so I had to see the hint given 

so I visit the access page and started to playing with it

It was same like hackthebox page where we download our VPN. Even this page has same functionality and I can download the VPN file. Umm something is generating vpn file and sending back to us, just like generating invite code. 

Need to see the source code maybe there is api endpoint just like for invite code

![image.png](../../../assets/TwoMillion/image%2024.png)

Found two endpoint

- one is to generate vpn
- and second one is to regenerate it

This functionality was visible from the front end itself

Ammm…

I nearly forget simple thing which is to check the rest of the endpoint like /api/v1/

![image.png](../../../assets/TwoMillion/image%2025.png)

Now I got more endpoint with methods used to call it. Three of the endpoint is for admin, which I have not interacted with. Rest of the endpoint are familiar, like register, login, verifying, generate, and all. To interact with other endpoint, I think I need to be admin. How can I be admin? No answer!! Still then I need to try it. 

hint*

**What API endpoint has a command injection vulnerability in it?**

![image.png](../../../assets/TwoMillion/image%2026.png)

Amm… 

I really had no idea how it will work so I use youtube tutorial to solve this specific step. 

![image.png](../../../assets/TwoMillion/image%2027.png)

I tried some endpoint, some of them are not authorized, some with no response

![image.png](../../../assets/TwoMillion/image%2028.png)

this endpoint has different response 

this endpoint is for admin and it is used to update 

![image.png](../../../assets/TwoMillion/image%2029.png)

it is not working as expected.

![image.png](../../../assets/TwoMillion/image%2030.png)

![image.png](../../../assets/TwoMillion/image%2031.png)

now I am admin 
I gonna try other endpoint which was not working with normal user 

![image.png](../../../assets/TwoMillion/image%2032.png)

![image.png](../../../assets/TwoMillion/image%2033.png)

it is really working now. Sleep 4 is delaying the response by 4 seconds

![image.png](../../../assets/TwoMillion/image%2034.png)

haha!!! unexpected response for command “$whoami”

![image.png](../../../assets/TwoMillion/image%2035.png)

so I followed the tutorial. To take advantage of the command injection it is run the reverse shell command.

finally I am in new environment 

![image.png](../../../assets/TwoMillion/image%2036.png)

there is Database.php 
i can login and see what is there, but before that I need password.

![image.png](../../../assets/TwoMillion/image%2037.png)

this is the hint to get the password. since this is the website file password will be in database.php and other file like .env

![image.png](../../../assets/TwoMillion/image%2038.png)

![image.png](../../../assets/TwoMillion/image%2039.png)

there is password for username admin 

logged in as admin 

![image.png](../../../assets/TwoMillion/image%2040.png)

    $2y$10$wATidKUukcOeJRaBpYtOyekSpwkKghaNYr5pjsomZUKAd0wbzw4QK

![image.png](../../../assets/TwoMillion/image%2041.png)

Cracking this hashes are crazy, its took more time than expected and at the last not result is returned. 

I realize that the credentials for ssh was same.

![image.png](../../../assets/TwoMillion/image%2042.png)

for this I asked ai

⇒ mail directory are present in var directory

![image.png](../../../assets/TwoMillion/image%2043.png)

![image.png](../../../assets/TwoMillion/image%2044.png)

Note!

“There have been a few serious Linux kernel CVEs already this year”

![image.png](../../../assets/TwoMillion/image%2045.png)

- it used ThunderMail Pro 5.2 to send mail

nga gachi benna mashay wa dei, so I thought of linpeas, that would be better. 

![image.png](../../../assets/TwoMillion/image%2046.png)

![image.png](../../../assets/TwoMillion/image%2047.png)

there is directory with CVE exploit 

![image.png](../../../assets/TwoMillion/image%2048.png)

There is CVE-2023-0386 under tmp directory 

let me see how it works and how to exploit it

![image.png](../../../assets/TwoMillion/image%2049.png)

lets check what is there 

[https://github.com/puckiestyle/CVE-2023-0386](https://github.com/puckiestyle/CVE-2023-0386)

to escalate the privilege we need to open two terminal to run the command differently

![image.png](../../../assets/TwoMillion/image%2050.png)

![image.png](../../../assets/TwoMillion/image%2051.png)

![image.png](../../../assets/TwoMillion/image%2052.png)

**How it works?**

It lets an unprivileged user gain root access by tricking the system into giving extra privileges to a file inside an OverlayFS mount.

![image.png](../../../assets/TwoMillion/image%2053.png)

![image.png](../../../assets/TwoMillion/image%2054.png)

![image.png](../../../assets/TwoMillion/image%2055.png)

### Learning

While solving this machine, I realized the importance of paying attention to **small hints** during web enumeration. I made a simple mistake by not inspecting the **source code** to understand how the website works.

One key lesson: When we get a shell, it often lands in the **website directory**, where we can find sensitive files like database.php and .env file containing credentials. This can be crucial for further exploitation. 

### Reference

> [HackTheBox - TwoMillion](https://youtu.be/Exl4P3fsF7U?si=Yd38J5zO6wwq_31d)

> [https://github.com/puckiestyle/CVE-2023-0386](https://github.com/puckiestyle/CVE-2023-0386)

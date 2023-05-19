# smbpasswd-web

## What is it?

***smbpasswd-web*** is a simple web interface to smbpasswd.

The only purpose is to allow a self-service to the user to change its samba password using a webbrowser, no user adding, no machine account, nothing, plain simple changing a password. This service _MUST_ only be exposed in the internal network! The user input is exposed to the CLI though the user input is escaped. The biggest change to [0x3333/smbpasswd-web](https://github.com/0x3333/smbpasswd-web) is the native Docker usage and the removed token system. The user must change their password with the current password.

## Sneak peek

![smbpasswd-web screenshot](https://github.com/Gurkengewuerz/smbpasswd-web/blob/master/.github/smbpasswd-main.png)
![smbpasswd-web screenshot ok](https://github.com/Gurkengewuerz/smbpasswd-web/blob/master/.github/smbpasswd-ok.png)

## Password Strength

We use [`zxcvbn`](https://github.com/dropbox/zxcvbn) as password strength meter.

## TODO

Migrated to issues. PRs are welcome! :)

## License

 *smbpasswd-web* is released under the MIT license. See LICENSE.

App icon by [icons8](https://icons8.com/).

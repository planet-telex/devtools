# Mac command line options for dev tasks

Install
-------

- [x] Add dev.js, config.json, and [commander](https://www.npmjs.com/package/commander) to your project

- [x] Set options in config.json:

Option| Description
------------ | -------------
ipAddress | ip address of your cloud server, e.g. 164.226.9.51
rootPath | path to your project, e.g. /Users/miles/Sites/store
sshUsername | username to log into your remote ssh shell (the part before the '@')
localRootUri | path to the project as accessed by localhost
dbUser | username for local database login
dbTable | local db table for the project
mainBuild | the command in package.json that runs your production build
watchCommand | watchify command or hot reload listener for changes

Default configuration is for Browserify and Watchify; the -s flag spins up watchers for a front build and an admin build (among other things)

Use
-------

From the development folder, see options with a help flag

```sh
node dev.sh -h
```

or better yet, create a symlink (I call it 'dev') from your $PATH to your development folder, e.g.
```sh
sudo ln -s usr/local/bin/dev /Users/miles/Sites/store
```

and, from anywhere, use
```sh
dev -h
```

### Example Commands

```sh
dev -s
```
starts build watchers for front and admin, opens front and admin sections in Chrome, opens mysql, etc. (all the options to start your daily workflow)

```sh
dev -f
```
creates a new remote sftp shell ready to use (your keys should be already set up, of course)

```sh
dev -l
```
same, for ssh

---

This is a starter template; see the [commander docs](https://www.npmjs.com/package/commander) for adding and adjusting options.

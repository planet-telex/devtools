#!/usr/bin/env node
let exec = require('child_process').exec;
let program = require('commander');
let fs = require('fs');

let config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

let openNewTab = `osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' `;
let goto = path => `-e 'tell application "Terminal" to do script "cd ` + path + `" in selected tab of the front window' `;
let runScript = script => `-e 'tell application "Terminal" to do script "` + script + `" in selected tab of the front window'`;

/**
 * if a path is passed, cd to the path and run a script
 * otherwise, run the script
 */
function newTab(script, path) {
  var cmd = openNewTab;

  cmd += path == null ? runScript(script) :
    goto(path) + runScript(script);

  exec(cmd);
}

function openChrome(path) {
  exec('/usr/bin/open -a "/Applications/Google Chrome.app" "' + path + '"');
}

function openAtom() {
  exec('atom ' + config.rootPath);
}

program
  .version('0.1.0')
  .option('-a, --openatom', 'Open Project in Atom')
  .option('-b, --buildadmin', 'Build all Admin Scripts')
  .option('-c, --openchrome', 'Open front and admin in Chrome')
  .option('-f, --sftpshell', 'Open a sftp shell')
  .option('-i, --ip', 'Get ip address')
  .option('-l, --sshshell', 'Open a ssh shell')
  .option('-p, --buildfront', 'Build production ready front')
  .option('-s, --start', 'Open Atom / Open in Chrome / watch the front / watch the admin')
  .option('-x, --openfinder', 'Open Project in Finder')
  .parse(process.argv);

  if (program.openatom) {
    openAtom();
  }

  /*
  * syntax for multiple commands; could be put into an array in config.json
  */
  if (program.buildadmin) {
    exec('cd ' + config.rootPath + ' && npm run buildSuperAdmin; npm run buildPM; npm run buildSaigon; npm run buildManila');
  }

  if (program.openchrome) {
    openChrome(config.localRootUri);
    openChrome(config.localRootUri + "/admin");
  }

  if (program.sftpshell) {
    newTab("sftp " + config.sshUsername + "@" + config.ipAddress);
  }

  if (program.ip) {
    console.log(config.ipAddress);
  }

  if (program.sshshell) {
    newTab("ssh " + config.sshUsername + "@" + config.ipAddress);
  }

  /**
   * npm run production in package.json builds, envifies, minifies, etc.
   */
  if (program.buildfront) {
    exec('cd ' + config.rootPath + ' && ' + config.mainBuild);
  }

  if (program.start) {
    exec('cd ' + config.rootPath);
    setTimeout(openAtom, 100)
    setTimeout(openChrome, 500, config.localRootUri);
    setTimeout(openChrome, 1000, config.localRootUri + "/admin");
    setTimeout(newTab, 2000, config.watchCommand, config.rootPath);
    setTimeout(newTab, 4000, config.watchCommand, config.rootPath + "/admin");
    setTimeout(newTab, 6000, "mysql -u " + config.dbUser + " -p " + config.dbTable);
  }

  if (program.openfinder) {
    exec('open ' + config.rootPath);
  }

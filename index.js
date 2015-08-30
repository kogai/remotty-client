"use strict";

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

console.log("start");

var dialog = require('dialog');
var server = require('./server.js');

// Report crashes to our server.
require('crash-reporter').start();

/*
require('electron-reload')(__dirname, {
  electron: require('electron-prebuilt')
});
*/

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
// app.commandLine.appendSwitch('--enable-usermedia-screen-capturing');
app.on('ready', function() {
  server.listen(4444, function() {
  	console.log('Express server listening on port 4444');
  });
  // var dispSize = screen.getPrimaryDisplay().size;
  // console.log(size.width, size.height);

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 600,
    // transparent: true
    // frame: false
    // kiosk: true
    // fullscreen: true
  });
  // console.log(dialog.showOpenDialog({ properties: [ 'openFile', 'openDirectory', 'multiSelections' ]}));

  // and load the index.html of the app.
  mainWindow.loadUrl('http://localhost:4444/');

  // Open the devtools.
  mainWindow.openDevTools();

  mainWindow.setMenuBarVisibility(true);

  mainWindow.on('app-command', function(e, cmd){
    console.log(e);
    console.log(cmd);
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    console.log('closed.');
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

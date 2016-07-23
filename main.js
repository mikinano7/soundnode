'use strict';

const Electron = require('electron');
const {app, BrowserWindow} = Electron;

let win;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('ready', function() {
    win = new BrowserWindow({
        width: 500,
        height: 600
    });
    win.loadURL('file://' + __dirname + '/index.html');

    win.on('closed', function() {
        win = null;
    });
});

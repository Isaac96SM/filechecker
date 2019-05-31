declare global {
    interface Window {
        require: any;
    }
}

const electron = window.require('electron');

/**
 * Node modules
 */
const fs = electron.remote.require('fs');

/**
 * Electron API
 */
const ipcRenderer = electron.remote.ipcRenderer;
const dialog = electron.remote.dialog;

export default {
    fs: fs,
    ipcRenderer: ipcRenderer,
    dialog: dialog
};
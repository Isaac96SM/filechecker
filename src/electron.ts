declare global {
    interface Window {
        require: any;
    }
}

const electron = window.require('electron');

export const fs = electron.remote.require('fs');
export const ipcRenderer = electron.ipcRenderer;
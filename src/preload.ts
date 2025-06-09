import { contextBridge, ipcRenderer } from 'electron';
import { agents } from './agents';

contextBridge.exposeInMainWorld('api', {
  runAgent: (name: string) => {
    const agent = agents[name];
    if (agent) {
      ipcRenderer.send('run-agent', name);
    }
  }
});

ipcRenderer.on('execute-agent', (_, name: string) => {
  const agent = agents[name];
  const webview = document.getElementById('tg-ads') as Electron.WebviewTag;
  if (agent && webview) {
    agent(webview);
  }
});

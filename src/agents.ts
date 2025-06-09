export type AgentFunction = (webview: Electron.WebviewTag) => void;

export const agents: Record<string, AgentFunction | undefined> = {
  /**
   * Sample agent which changes background color and shows an alert.
   */
  sample: (webview) => {
    webview.executeJavaScript(`document.body.style.backgroundColor = 'lightyellow'; alert('Agent executed');`);
  }
};

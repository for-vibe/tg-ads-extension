export type AgentFunction = (webview: Electron.WebviewTag) => void;

export const agents: Record<string, AgentFunction | undefined> = {
  /**
   * Sample agent which changes background color and shows an alert.
   */
  sample: (webview) => {
    webview.executeJavaScript(`document.body.style.backgroundColor = 'lightyellow'; alert('Agent executed');`);
  },
  /**
   * Highlight the clicks column with a green border and background.
   */
  highlightClicks: (webview) => {
    const js = `(() => {
      const style = document.createElement('style');
      style.textContent = 
        'td[style*="coldp-clicks"] .pr-cell a.pr-link {' +
        ' border: 1px solid #0a0;' +
        ' background-color: #b6ffb6;' +
        ' border-radius: 4px;' +
        ' padding: 2px 4px;' +
        '}';
      document.head.appendChild(style);
    })();`;
    webview.executeJavaScript(js);
  }
};

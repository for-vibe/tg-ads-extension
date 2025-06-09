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
  },
  /**
   * Highlight all images with a red outline.
   */
  highlightImages: (webview) => {
    const js = `(() => {
      const addStyle = (doc) => {
        const style = doc.createElement('style');
        style.textContent = 'img { outline: 2px solid red; }';
        doc.head.appendChild(style);
      };
      addStyle(document);
      document.querySelectorAll('iframe').forEach((frame) => {
        try {
          if (frame.contentDocument) {
            addStyle(frame.contentDocument);
            frame.style.height = '100%';
          }
        } catch (_) {
          // ignore cross-origin iframes
        }
      });
    })();`;
    webview.executeJavaScript(js);
  }
};

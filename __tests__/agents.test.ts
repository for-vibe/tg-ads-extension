import { agents } from '../src/agents';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

describe('agents', () => {
  test('sample agent exists', () => {
    expect(typeof agents.sample).toBe('function');
  });

  test('highlightImages adds style to document and iframe', () => {
    const html = fs.readFileSync(path.join(__dirname, 'fixtures/sample.html'), 'utf8');
    const dom = new JSDOM(html, { runScripts: 'dangerously' });

    // Attach a DOM to the iframe for testing
    const iframe = dom.window.document.getElementById('inner-frame') as HTMLIFrameElement;
    const inner = new JSDOM('<html><body><img id="fimg"></body></html>', { runScripts: 'dangerously' });
    Object.defineProperty(iframe, 'contentDocument', { value: inner.window.document });

    const webview = {
      executeJavaScript: (code: string) => {
        const vm = require('vm');
        vm.runInContext(code, dom.getInternalVMContext());
      }
    } as any;

    agents.highlightImages!(webview);
    const style = dom.window.document.head.querySelector('style');
    expect(style?.textContent).toContain('img');

    const iframeStyle = inner.window.document.head.querySelector('style');
    expect(iframeStyle?.textContent).toContain('img');
  });
});

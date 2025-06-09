import { agents } from '../src/agents';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

describe('agents', () => {
  test('sample agent exists', () => {
    expect(typeof agents.sample).toBe('function');
  });

  test('highlightImages adds style to document', () => {
    const html = fs.readFileSync(path.join(__dirname, 'fixtures/sample.html'), 'utf8');
    const dom = new JSDOM(html, { runScripts: 'dangerously' });
    const webview = {
      executeJavaScript: (code: string) => {
        const vm = require('vm');
        vm.runInContext(code, dom.getInternalVMContext());
      }
    } as any;
    agents.highlightImages!(webview);
    const style = dom.window.document.head.querySelector('style');
    expect(style?.textContent).toContain('img');
  });
});

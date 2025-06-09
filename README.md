# Telegram Ads Desktop

Simple Electron desktop application written in TypeScript that displays [Telegram Ads](https://ads.telegram.org/) in a full-screen webview and allows DOM manipulation through agents.

## Scripts

- `npm start` — compile TypeScript and launch the Electron app.
- `npm test` — run unit tests via Jest.

## Adding Agents

Edit `src/agents.ts` and export new functions. Each agent receives the `webview` element and can execute JavaScript inside the page.

```ts
export const agents: Record<string, AgentFunction> = {
  sample: (webview) => {
    webview.executeJavaScript('console.log("Agent running")');
  },
  // add more agents here
};
```

## Tests

Tests live in the `__tests__` directory and use Jest with `ts-jest` preset.

import { agents } from '../src/agents';

describe('agents', () => {
  test('sample agent exists', () => {
    expect(typeof agents.sample).toBe('function');
  });
});

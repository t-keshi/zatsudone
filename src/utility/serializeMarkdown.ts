import { Node } from 'slate';

export const serializeMarkdown = (value: Node[]): string =>
  value.map((n) => Node.string(n)).join('\n');

export const deserializeMarkdown = (string: string): Node[] =>
  string.split('\n').map((line) => ({
    children: [{ text: line }],
  }));

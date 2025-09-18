import React from 'react';

interface LexicalNode {
  type?: string;
  text?: string;
  children?: LexicalNode[];
  [k: string]: unknown;
}

// Extract text from Lexical format - similar to admin project
const extractTextFromNode = (node: LexicalNode): string => {
  if (node.text) {
    return node.text;
  }
  if (node.children) {
    return node.children.map(extractTextFromNode).join('');
  }
  return '';
};

const serialize = (children: LexicalNode[]): string => {
  return children.map(extractTextFromNode).join('\n\n');
};

export default serialize;
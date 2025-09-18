import React from 'react';
import escapeHTML from 'escape-html';

interface TextNode {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

interface ElementNode {
  type: string;
  children?: LexicalNode[];
  url?: string;
  [k: string]: unknown;
}

type LexicalNode = TextNode | ElementNode;

const serialize = (children: LexicalNode[]) => children.map((node, i) => {
  if (node.type === 'text' && 'text' in node) {
    const textNode = node as TextNode;
    let text = <span key={`text-${i}`} dangerouslySetInnerHTML={{ __html: escapeHTML(textNode.text) }} />;

    if (textNode.bold) {
      text = <strong key={`bold-${i}`}>{text}</strong>;
    }

    if (textNode.italic) {
      text = <em key={`italic-${i}`}>{text}</em>;
    }

    if (textNode.underline) {
      text = <u key={`underline-${i}`}>{text}</u>;
    }

    if (textNode.strikethrough) {
      text = <s key={`strikethrough-${i}`}>{text}</s>;
    }

    return text;
  }

  if (!node) {
    return null;
  }

  const elementNode = node as ElementNode;
  switch (elementNode.type) {
    case 'h1':
      return <h1 key={i} className="text-3xl font-bold mb-4 mt-6">{elementNode.children ? serialize(elementNode.children) : null}</h1>;
    case 'h2':
      return <h2 key={i} className="text-2xl font-bold mb-4 mt-6">{elementNode.children ? serialize(elementNode.children) : null}</h2>;
    case 'h3':
      return <h3 key={i} className="text-xl font-bold mb-4 mt-6">{elementNode.children ? serialize(elementNode.children) : null}</h3>;
    case 'h4':
      return <h4 key={i} className="text-lg font-bold mb-4 mt-6">{elementNode.children ? serialize(elementNode.children) : null}</h4>;
    case 'h5':
      return <h5 key={i} className="text-base font-bold mb-4 mt-6">{elementNode.children ? serialize(elementNode.children) : null}</h5>;
    case 'h6':
      return <h6 key={i} className="text-sm font-bold mb-4 mt-6">{elementNode.children ? serialize(elementNode.children) : null}</h6>;
    case 'quote':
      return <blockquote key={i} className="border-l-4 border-gray-300 pl-4 italic my-4">{elementNode.children ? serialize(elementNode.children) : null}</blockquote>;
    case 'ul':
      return <ul key={i} className="list-disc list-inside mb-4">{elementNode.children ? serialize(elementNode.children) : null}</ul>;
    case 'ol':
      return <ol key={i} className="list-decimal list-inside mb-4">{elementNode.children ? serialize(elementNode.children) : null}</ol>;
    case 'li':
      return <li key={i} className="mb-2">{elementNode.children ? serialize(elementNode.children) : null}</li>;
    case 'link':
      return (
        <a href={escapeHTML(elementNode.url || '#')} key={i} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
          {elementNode.children ? serialize(elementNode.children) : null}
        </a>
      );
    case 'paragraph':
      return <p key={i} className="mb-4">{elementNode.children ? serialize(elementNode.children) : null}</p>;
    case 'p':
      return <p key={i} className="mb-4">{elementNode.children ? serialize(elementNode.children) : null}</p>;
    default:
      // For any unknown node type, try to render as paragraph if it has children
      if (elementNode.children && elementNode.children.length > 0) {
        return <p className="mb-4" key={i}>{serialize(elementNode.children)}</p>;
      }
      return null;
  }
});

export default serialize;
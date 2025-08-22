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
    let text = <span key={`text-${i}`} className="mb-4" dangerouslySetInnerHTML={{ __html: escapeHTML(textNode.text) }} />;

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
      return <h1 key={i}>{elementNode.children ? serialize(elementNode.children) : null}</h1>;
    case 'h2':
      return <h2 key={i}>{elementNode.children ? serialize(elementNode.children) : null}</h2>;
    case 'h3':
      return <h3 key={i}>{elementNode.children ? serialize(elementNode.children) : null}</h3>;
    case 'h4':
      return <h4 key={i}>{elementNode.children ? serialize(elementNode.children) : null}</h4>;
    case 'h5':
      return <h5 key={i}>{elementNode.children ? serialize(elementNode.children) : null}</h5>;
    case 'h6':
      return <h6 key={i}>{elementNode.children ? serialize(elementNode.children) : null}</h6>;
    case 'quote':
      return <blockquote key={i}>{elementNode.children ? serialize(elementNode.children) : null}</blockquote>;
    case 'ul':
      return <ul key={i}>{elementNode.children ? serialize(elementNode.children) : null}</ul>;
    case 'ol':
      return <ol key={i}>{elementNode.children ? serialize(elementNode.children) : null}</ol>;
    case 'li':
      return <li key={i}>{elementNode.children ? serialize(elementNode.children) : null}</li>;
    case 'link':
      return (
        <a href={escapeHTML(elementNode.url || '#')} key={i}>
          {elementNode.children ? serialize(elementNode.children) : null}
        </a>
      );

    default:
      return <p className="mb-4 " key={i}>{elementNode.children ? serialize(elementNode.children) : null}</p>;
  }
});

export default serialize;
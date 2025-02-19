import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl font-bold" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-semibold" {...props} />
        ),
        p: ({ node, ...props }) => <p className="text-base mb-4" {...props} />,
        a: ({ node, ...props }) => (
          <a className="text-blue-500 underline" {...props} />
        ),
      }}
    />
  );
}

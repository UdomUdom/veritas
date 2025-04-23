import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "../build/Image";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ ...props }) => (
          <h1
            className="text-4xl font-bold border-b-2 border-default-200 my-8 py-4"
            {...props}
          />
        ),
        h2: ({ ...props }) => (
          <h2
            className="text-3xl font-semibold border-b-2 border-default-200 my-6 py-4"
            {...props}
          />
        ),
        h3: ({ ...props }) => (
          <h3 className="text-2xl font-semibold my-4" {...props} />
        ),
        h4: ({ ...props }) => (
          <h4 className="text-xl font-medium my-4" {...props} />
        ),
        h5: ({ ...props }) => (
          <h5 className="text-lg font-medium my-4" {...props} />
        ),
        h6: ({ ...props }) => (
          <h6 className="text-base font-medium my-4" {...props} />
        ),
        p: ({ ...props }) => (
          <p className="text-base leading-relaxed mb-4" {...props} />
        ),
        a: ({ ...props }) => (
          <a
            className="text-primary-600 hover:text-primary-800 underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        ),
        strong: ({ ...props }) => <strong className="font-bold" {...props} />,
        em: ({ ...props }) => <em className="italic" {...props} />,
        blockquote: ({ ...props }) => (
          <blockquote
            className="border-l-4 border-default-300 pl-4 italic text-default-700 my-6"
            {...props}
          />
        ),
        hr: ({ ...props }) => (
          <hr className="my-8 border-t-2 border-default-200" {...props} />
        ),
        br: ({ ...props }) => <br className="my-2" {...props} />,
        code: ({ className, children, ...props }) => {
          const { inline } = props as { inline: boolean };
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <pre className="my-6 rounded-md overflow-x-auto bg-default-800/70">
              <code
                className={`block p-4 text-sm text-default ${className}`}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </code>
            </pre>
          ) : (
            <code
              className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded-md text-sm"
              {...props}
            >
              {children}
            </code>
          );
        },
        img: ({ ...props }) => (
          <Image
            src={props.src!}
            className="my-4 max-w-full h-auto rounded-md shadow-md"
            alt={props.alt || "image"}
            {...props}
          />
        ),
        ul: ({ ...props }) => <ul className="list-disc ml-6 my-4" {...props} />,
        ol: ({ ...props }) => (
          <ol className="list-decimal ml-6 my-4" {...props} />
        ),
        li: ({ ...props }) => <li className="mb-2" {...props} />,
        table: ({ ...props }) => (
          <table
            className="min-w-full bg-white border border-gray-200 rounded-md overflow-hidden"
            {...props}
          />
        ),
        th: ({ ...props }) => (
          <th
            className="border border-gray-200 px-4 py-2 bg-gray-100 text-left font-semibold"
            {...props}
          />
        ),
        td: ({ ...props }) => (
          <td className="border border-gray-200 px-4 py-2" {...props} />
        ),
        tr: ({ ...props }) => (
          <tr className="even:bg-gray-50 odd:bg-white" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { LuCode, LuCopy, LuCheck } from "react-icons/lu";


/* =========================
   CodeBlock Component
========================= */
const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 border border-white/10 rounded-xl overflow-hidden bg-[#0d0d0d]">

      {/* Header */}
      <div className="flex justify-between items-center bg-white/5 px-4 py-2 text-sm border-b border-white/5">
        <div className="flex items-center gap-2">
          <LuCode size={14} className="text-gray-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            {language || "code"}
          </span>
        </div>

        <button
          onClick={copyCode}
          className="flex items-center gap-1 text-gray-500 hover:text-white transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <LuCheck size={14} className="text-green-500" />
          ) : (
            <LuCopy size={14} />
          )}
        </button>
      </div>

      {/* Syntax Highlighter */}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        PreTag="div"
        customStyle={{
          margin: 0,
          padding: "16px",
          background: "transparent",
          fontSize: "13px",
          lineHeight: "1.6"
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

/* =========================
   AIResponsePreview Component
========================= */
const AIResponsePreview = ({ content }) => {
  if (!content) return null;

  return (
    <div className="prose prose-invert max-w-none text-gray-300 text-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          /* Paragraph */
          p({ children }) {
            return <p className="mb-4 leading-relaxed">{children}</p>;
          },

          /* Bold */
          strong({ children }) {
            return <strong className="font-bold text-white">{children}</strong>;
          },

          /* Italic */
          em({ children }) {
            return <em className="italic text-gray-400">{children}</em>;
          },

          /* Unordered List */
          ul({ children }) {
            return <ul className="list-disc ml-5 mb-4 space-y-1">{children}</ul>;
          },

          /* Ordered List */
          ol({ children }) {
            return <ol className="list-decimal ml-5 mb-4 space-y-1">{children}</ol>;
          },

          /* List Item */
          li({ children }) {
            return <li className="pl-1">{children}</li>;
          },

          /* Code (Inline + Block) */
          code({ inline, className, children }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";

            if (!inline) {
              return (
                <CodeBlock
                  code={String(children).replace(/\n$/, "")}
                  language={language}
                />
              );
            }

            return (
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-orange-400 font-mono text-[12px]">
                {children}
              </code>
            );
          },

          /* Table */
          table({ children }) {
            return (
              <div className="overflow-x-auto my-6 border border-white/10 rounded-xl">
                <table className="min-w-full border-collapse">
                  {children}
                </table>
              </div>
            );
          },

          thead({ children }) {
            return <thead className="bg-white/5">{children}</thead>;
          },

          tbody({ children }) {
            return <tbody className="divide-y divide-white/5">{children}</tbody>;
          },

          tr({ children }) {
            return <tr>{children}</tr>;
          },

          th({ children }) {
            return (
              <th className="px-4 py-3 text-left font-bold text-white text-xs uppercase tracking-wider">
                {children}
              </th>
            );
          },

          td({ children }) {
            return <td className="px-4 py-3 text-sm text-gray-400">{children}</td>;
          },

          /* Horizontal Line */
          hr() {
            return <hr className="my-8 border-white/5" />;
          },

          /* Image */
          img({ src, alt }) {
            return (
              <img
                src={src}
                alt={alt}
                className="rounded-xl my-6 max-w-full h-auto border border-white/10"
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};


export default AIResponsePreview;

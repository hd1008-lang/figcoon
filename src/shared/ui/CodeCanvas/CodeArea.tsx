import { highlight, type SupportedLang } from "@/shared/lib/shiki";
import { useEffect, useState } from "react";

interface CodeAreaProps {
  content: string;
  lang?: SupportedLang;
}

export function CodeArea({ content, lang }: CodeAreaProps) {
  const [html, setHtml] = useState("");
  useEffect(() => {
    if (!content || !lang) return;
    console.log("=== RAW ===", JSON.stringify(content));
    console.log("=== TYPEOF ===", typeof content);
    console.log("=== DISPLAY ===", content);

    highlight(content, lang).then(setHtml);
  }, [content, lang]);
  return (
    <div className="flex-1 min-h-0 overflow-hidden relative p-4">
      <textarea name="" id="content-area" value={content} readOnly className="absolute top-0 left-0 z-[-1]"></textarea>
      <div
        className="text-on-surface-variant text-sm leading-7 font-mono w-full h-full outline-none overflow-auto [&_pre]:bg-transparent! [&_pre]:whitespace-pre-wrap! [&_pre]:break-all! [&_.line:first-child]:hidden [&_.line:last-child]:hidden font-medium tracking-wide"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
      <div className="w-1 h-5 bg-primary opacity-60 absolute top-67.5 left-37.5 animate-blink" />
    </div>
  );
}

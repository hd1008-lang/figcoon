import type { SupportedLang } from "@/shared/lib/shiki/highlight";
import { CodeArea } from "./CodeArea";

interface CodeCanvasProps {
  content: string;
  lang?:SupportedLang;
}

export function CodeCanvas({ content, lang }: CodeCanvasProps) {
  return (
    <div className="flex-1 flex flex-col bg-surface-container-lowest rounded-b-xl border border-outline-variant/10 border-t-0 overflow-hidden mt-2">
      <CodeArea content={content} lang={lang} />
    </div>
  );
}
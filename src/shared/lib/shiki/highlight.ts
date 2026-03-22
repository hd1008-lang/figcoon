import { createHighlighter } from "shiki";

export type SupportedLang = "css" | "json" | "typescript";

const highlighterPromise = createHighlighter({
  themes: ["vitesse-dark"],
  langs: ["css", "json", "typescript"],
});

export async function highlight(
  raw: string,
  lang: SupportedLang,
): Promise<string> {
  const highlighter = await highlighterPromise;
  const isCssLike = lang === "css";
  const code = isCssLike ? `html {\n${raw.trim()}\n}` : raw.trim();
  return highlighter
    .codeToHtml(code, {
      lang,
      theme: "vitesse-dark",
    })
    .replace(/<span[^>]*>:root<\/span><span[^>]*> {<\/span>\n/, "")
    .replace(/\n<span[^>]*>}<\/span>/, "");
}

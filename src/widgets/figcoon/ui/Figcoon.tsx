import { Header } from "@/shared/ui/Header";
import { Footer } from "@/shared/ui/Footer";
import { TabBar } from "@/shared/ui/TabBar";
import { TERMINAL_TABS } from "@/shared/config/tabs";
import { JsonStructure } from "@/features/json-structure";
import { useTabState } from "../model/useTabState";
import type { TabConfig } from "@/shared/config/tabs";
import { Variables } from "@/features/variables";
import { CssLayout } from "@/features/css-styles";
import { CssStructure } from "@/features/css-styles-structure";
import { useToast } from "@/shared/lib/toast/useToast";
import { ToastProvider } from "@/shared/ui/Toast/ToastProvider";
import { useRef, useMemo, useCallback } from "react";
import type { TFeatureAction } from "@/shared/types";

export function Figcoon() {
  const { activeTab, setActiveTab } = useTabState();
  const tabRef = useRef<TFeatureAction>(null);
  const { toasts, show } = useToast();

  const TAB_CONTENT = useMemo<Record<TabConfig["value"], React.ReactNode>>(
    () => ({
      variable: <Variables ref={tabRef} />,
      css: <CssLayout ref={tabRef} />,
      json: <JsonStructure ref={tabRef} />,
      "css-structure": <CssStructure ref={tabRef} />,
    }),
    []
  );

  const getContent = useCallback(() => {
    tabRef.current?.getData();
  }, []);

  const onCopy = useCallback(() => {
    const contentArea = document.getElementById(
      "content-area"
    ) as HTMLTextAreaElement;

    if (contentArea?.value) {
      contentArea.select();
      document.execCommand("copy");
      show("Copied to clipboard!", "success");
      contentArea.selectionStart = 0;
      contentArea.selectionEnd = 0;
    } else {
      show("Nothing to copy!", "error");
    }
  }, [show]);

  return (
    <div className="w-full h-full bg-surface flex flex-col overflow-hidden border border-outline-variant/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] relative">
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />
      <Header />
      <main className="flex-1 flex flex-col px-6 overflow-hidden">
        <TabBar
          tabs={TERMINAL_TABS}
          activeTab={activeTab.value}
          onTabChange={setActiveTab}
        />
        {TAB_CONTENT[activeTab.value]}
      </main>
      <Footer onCopy={onCopy} onExecute={getContent} />
      <ToastProvider toasts={toasts} />
    </div>
  );
}
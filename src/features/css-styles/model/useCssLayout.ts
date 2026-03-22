import { getCssLayout } from "@/features/css-styles/api/getCssLayout";
import { COMMAND } from "@/shared/lib/figma/command";
import { useState, useEffect } from "react";

interface State {
  content: string | null;
  loading: boolean;
  error: string | null;
}

export function useCssLayout() {
  const [state, setState] = useState<State>({
    content: null,
    loading: true,
    error: null,
  });
  const handleGetCssLayout = (): void => {
    setState({ ...state, loading: true });
    getCssLayout();
  };
  useEffect(() => {
    getCssLayout();
    window.onmessage = (event) => {
      const message = event.data.pluginMessage;
      if (message.type === COMMAND.receive_result) {
        const dataJson = JSON.parse(message.data);
        setState({ content: dataJson, loading: false, error: dataJson.error || null });
      }
    };
  }, []);

  return { state, handleGetCssLayout };
}

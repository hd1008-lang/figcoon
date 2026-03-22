import { getVariables } from "@/features/variables/api/getVariables";
import { COMMAND } from "@/shared/lib/figma/command";
import { useState, useEffect } from "react";

interface State {
  content: string | null;
  loading: boolean;
  error: string | null;
}

export function useVariables() {
  const [state, setState] = useState<State>({
    content: null,
    loading: true,
    error: null,
  });
 const handleGetVariables = (): void => {
    setState({ ...state, loading: true });
    getVariables();
  };
  useEffect(() => {
    getVariables();
    window.onmessage = (event) => {
      const message = event.data.pluginMessage;
      if (message.type === COMMAND.receive_result) {
        setState({ content: message.data, loading: false, error: null });
      }
    };
  }, []);

  return { state, handleGetVariables };
}

import { CodeCanvas } from "@/shared/ui/CodeCanvas";
import { useVariables } from "../model/useVariables";
import { useImperativeHandle, type RefObject } from "react";
import type { TFeatureAction } from "@/shared/types";
interface IProps {
  ref: RefObject<TFeatureAction>
}
export function Variables({ ref }: IProps) {
  const {state, handleGetVariables } = useVariables();

  useImperativeHandle(ref, () => ({
    getData: handleGetVariables
  }));

  if (state.loading) return <div className="flex-1 flex items-center justify-center text-on-surface-variant text-sm">Loading...</div>;
  if (state.error)   return <div className="flex-1 flex items-center justify-center text-error text-sm">{state.error}</div>;

  return <CodeCanvas content={state.content!} lang="json" />;
}
import { CodeCanvas } from "@/shared/ui/CodeCanvas";
import { useJsonStructure } from "../model/useJsonStructure";
import { useImperativeHandle, type RefObject } from "react";
import type { TFeatureAction } from "@/shared/types";
interface IProps {
  ref: RefObject<TFeatureAction>
}
export function JsonStructure({ ref }: IProps) {
  const { state, handleGetJsonStructure } = useJsonStructure();
  useImperativeHandle(ref, () => ({
    getData: handleGetJsonStructure
  }));
  if (state.loading) return <div className="flex-1 flex items-center justify-center text-on-surface-variant text-sm">Loading...</div>;
  if (state.error)   return <div className="flex-1 flex items-center justify-center text-error text-sm">{state.error}</div>;

  return <CodeCanvas content={state.content!} lang="json" />;
}
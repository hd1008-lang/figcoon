import { useCssLayout } from "@/features/css-styles/model/useCssLayout";
import type { TFeatureAction } from "@/shared/types";
import { CodeCanvas } from "@/shared/ui/CodeCanvas";
import { useImperativeHandle, type RefObject } from "react";
interface IProps {
  ref: RefObject<TFeatureAction>;
}
export function CssLayout({ ref }: IProps) {
  const { state, handleGetCssLayout } = useCssLayout();
  useImperativeHandle(ref, () => ({
    getData: handleGetCssLayout
  }));
  if (state.loading) return <div className="flex-1 flex items-center justify-center text-on-surface-variant text-sm">Loading...</div>;
  if (state.error)   return <div className="flex-1 flex items-center justify-center text-error text-sm">{state.error}</div>;

  return <CodeCanvas content={state.content!} lang={'css'} />;
}
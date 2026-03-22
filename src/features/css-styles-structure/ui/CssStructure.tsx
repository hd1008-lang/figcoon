import { useCssStructure } from "@/features/css-styles-structure/model/useCssStructure";
import type { TFeatureAction } from "@/shared/types";
import { CodeCanvas } from "@/shared/ui/CodeCanvas";
import { useImperativeHandle, type RefObject } from "react";
interface IProps {
  ref: RefObject<TFeatureAction>;
}
export function CssStructure({ ref }: IProps) {
  const { state, handleGetCssStructure } = useCssStructure();
  useImperativeHandle(ref, () => {
    return {
      getData: handleGetCssStructure,
    };
  });
  if (state.loading)
    return (
      <div className="flex-1 flex items-center justify-center text-on-surface-variant text-sm">
        Loading...
      </div>
    );
  if (state.error)
    return (
      <div className="flex-1 flex items-center justify-center text-error text-sm">
        {state.error}
      </div>
    );

  return <CodeCanvas content={state.content!} lang="json" />;
}

import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from 'react';
import {
  getAspectRatioContentStyleProps,
  getAspectRatioRootStyleProps,
  getAspectRatioSpacerStyleProps
} from './AspectRatio.styles';

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  ratio?: number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function getPaddingPercent(ratio: number) {
  if (!Number.isFinite(ratio) || ratio <= 0) {
    return `${100 / (16 / 9)}%`;
  }

  return `${100 / ratio}%`;
}

export function AspectRatio({
  ref,
  ratio = 16 / 9,
  className,
  style,
  children,
  ...props
}: AspectRatioProps) {
  const rootStyleProps = getAspectRatioRootStyleProps({ className, style });
  const spacerStyleProps = getAspectRatioSpacerStyleProps({
    style: { paddingTop: getPaddingPercent(ratio) }
  });
  const contentStyleProps = getAspectRatioContentStyleProps();

  return (
    <div {...props} {...rootStyleProps} ref={ref} data-aspect-ratio={ratio}>
      <div {...spacerStyleProps} aria-hidden="true" data-aspect-ratio-spacer="" />
      <div {...contentStyleProps} data-aspect-ratio-content="">
        {children}
      </div>
    </div>
  );
}

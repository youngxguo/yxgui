import { useEffect, type RefObject } from 'react';

export type EntranceAnimationPreset =
  | 'floating'
  | 'tooltip'
  | 'dialogOverlay'
  | 'dialogContent'
  | 'drawerBottom'
  | 'drawerLeft'
  | 'drawerRight'
  | 'disclosure';

interface EntranceAnimationConfig {
  keyframes: Keyframe[];
  duration: number;
  easing: string;
}

const entranceAnimationConfigs: Record<EntranceAnimationPreset, EntranceAnimationConfig> = {
  floating: {
    keyframes: [
      { opacity: 0, transform: 'translate3d(0, -6px, 0) scale(0.985)' },
      { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }
    ],
    duration: 170,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
  },
  tooltip: {
    keyframes: [
      { opacity: 0, transform: 'translate3d(0, -4px, 0) scale(0.985)' },
      { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }
    ],
    duration: 130,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
  },
  dialogOverlay: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: 160,
    easing: 'ease-out'
  },
  dialogContent: {
    keyframes: [
      { opacity: 0, transform: 'translate3d(0, 10px, 0) scale(0.99)' },
      { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }
    ],
    duration: 220,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
  },
  drawerBottom: {
    keyframes: [
      { opacity: 0, transform: 'translate3d(0, 18px, 0)' },
      { opacity: 1, transform: 'translate3d(0, 0, 0)' }
    ],
    duration: 230,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
  },
  drawerLeft: {
    keyframes: [
      { opacity: 0, transform: 'translate3d(-18px, 0, 0)' },
      { opacity: 1, transform: 'translate3d(0, 0, 0)' }
    ],
    duration: 230,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
  },
  drawerRight: {
    keyframes: [
      { opacity: 0, transform: 'translate3d(18px, 0, 0)' },
      { opacity: 1, transform: 'translate3d(0, 0, 0)' }
    ],
    duration: 230,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
  },
  disclosure: {
    keyframes: [
      { opacity: 0, transform: 'translate3d(0, -4px, 0)' },
      { opacity: 1, transform: 'translate3d(0, 0, 0)' }
    ],
    duration: 180,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
  }
};

function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useEntranceAnimation(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  preset: EntranceAnimationPreset
) {
  useEffect(() => {
    if (!active || prefersReducedMotion()) {
      return;
    }

    const node = ref.current;
    if (!node || typeof node.animate !== 'function') {
      return;
    }

    const config = entranceAnimationConfigs[preset];
    const animation = node.animate(config.keyframes, {
      duration: config.duration,
      easing: config.easing,
      fill: 'both'
    });

    return () => {
      animation.cancel();
    };
  }, [active, preset, ref]);
}

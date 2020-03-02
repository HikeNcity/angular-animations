import {
  animate,
  animateChild,
  animation,
  AnimationTriggerMetadata,
  group,
  keyframes,
  query,
  style,
  transition,
  trigger,
  useAnimation
} from '@angular/animations';

import { IAnimationOptions } from '../common/interfaces';

export interface IRollOutAnimationOptions extends IAnimationOptions {
  /**
   * Angle - number of degrees at which end animation.
   *
   * Default 120
   */
  degrees?: number;
  /**
   * Translate, possible units: px, %, em, rem, vw, vh
   *
   * Default: 100%
   */
  translate?: string;
}

const rollOut = () =>
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({ opacity: 1, transform: 'translate3d(0, 0, 0) rotate3d(0, 0, 1, 0deg)', easing: 'ease', offset: 0 }),
        style({ opacity: 0, transform: 'translate3d({{translate}}, 0, 0) rotate3d(0, 0, 1, {{degrees}}deg)', easing: 'ease', offset: 1 })
      ])
    )
  ]);

const DEFAULT_DURATION = 1000;

export function rollOutAnimation(options?: IRollOutAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'rollOut', [
    transition(
      '0 => 1',
      [
        ...(options && options.animateChildren === 'before' ? [query('@*', animateChild(), { optional: true })] : []),
        group([
          useAnimation(rollOut()),
          ...(!options || !options.animateChildren || options.animateChildren === 'together'
            ? [query('@*', animateChild(), { optional: true })]
            : [])
        ]),
        ...(options && options.animateChildren === 'after' ? [query('@*', animateChild(), { optional: true })] : [])
      ],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
          degrees: (options && options.degrees) || 120,
          translate: (options && options.translate) || '100%'
        }
      }
    )
  ]);
}

export function rollOutOnLeaveAnimation(options?: IRollOutAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'rollOutOnLeave', [
    transition(
      ':leave',
      [
        ...(options && options.animateChildren === 'before' ? [query('@*', animateChild(), { optional: true })] : []),
        group([
          useAnimation(rollOut()),
          ...(!options || !options.animateChildren || options.animateChildren === 'together'
            ? [query('@*', animateChild(), { optional: true })]
            : [])
        ]),
        ...(options && options.animateChildren === 'after' ? [query('@*', animateChild(), { optional: true })] : [])
      ],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
          degrees: (options && options.degrees) || 120,
          translate: (options && options.translate) || '100%'
        }
      }
    )
  ]);
}

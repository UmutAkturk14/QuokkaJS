import type Core from '../modules/core';

export interface DOMMethods {
  css(
    this: Core,
    property: string | { [key: string]: string },
    value?: string,
    important?: boolean | string
  ): Core | string;
  prepend(this: Core, child: string | HTMLElement | Core): Core;
  before(this: Core, child: string | HTMLElement | Core): Core;
  after(this: Core, child: string | HTMLElement | Core): Core;
  append(this: Core, child: string | HTMLElement | Core): Core;
  focus(this: Core): Core;
  click(this: Core): Core;
  blur(this: Core): Core;
  zoomIn(this: Core, duration?: number, scale?: number): Core;
  zoomOut(this: Core, duration?: number): Core;
  pulseGlow(this: Core, duration?: number, intensity?: number, colors?: {
    boxShadow: string;
    textShadow: string;
    boxShadowPulse: string;
    textShadowPulse: string;
  }): Core;
  pulse(this: Core, duration?: number, scale?: number): Core;
  bounce(this: Core, duration?: number, height?: number): Core;
  shake(this: Core, duration?: number, intensity?: number): Core;
  flip(this: Core, duration?: number): Core;
  slideDown(this: Core, duration?: number): Core;
  slideUp(this: Core, duration?: number): Core;
  slideYToggle(this: Core, duration?: number): Core;
  slideXToggle(this: Core, duration?: number): Core;
  slideRight(this: Core, duration?: number): Core;
  slideLeft(this: Core, duration?: number): Core;
  fadeOut(this: Core, duration?: number, useVisibility?: boolean): Core;
  fadeIn(this: Core, duration?: number, useVisibility?: boolean): Core;
  fadeToggle(this: Core, duration?: number, useVisibility?: boolean): Core;
  hide(this: Core): Core;
  show(this: Core): Core;
  toggle(this: Core): Core;
  toggleVisibility(this: Core): Core;
  visible(this: Core): Core;
  invisible(this: Core): Core;
  directionalFade(this: Core, scrollUpFade: boolean, animationType: 'fade' | 'slide', selectors: string): Core;
}

export interface GlowColors {
  boxShadow: string;
  textShadow: string;
  boxShadowPulse: string;
  textShadowPulse: string;
}

import type { Core } from '@modules/core';

/**
 * DOM module interfaces
 */
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

/**
 * Geometry module interfaces
 */

export interface GeometryMethods {
  // Basic Box Model
  width(): number;
  height(): number;
  innerWidth(): number;
  innerHeight(): number;
  outerWidth(includeMargin?: boolean): number;
  outerHeight(includeMargin?: boolean): number;

  // Element Position
  offset(): { top: number; left: number };
  position(): { top: number; left: number };
  offsetTop(): number;
  offsetLeft(): number;

  // Scroll
  scrollTop(this: Core, value?: number): Core | number;
  scrollLeft(this: Core, value?: number): Core | number;
  scrollWidth(): number;
  scrollHeight(): number;

  // Visibility / Viewport
  isInViewport(): boolean;

  // Native Rect
  rect(): DOMRect;
}

/**
 * Storage module interfaces
 */

export interface WebStorageEntry {
  name: string;
  value: string | object | boolean;
  /** Absolute UNIX timestamp (ms) – will become `expiresAt` internally */
  expires?: number | Date;
  namespace?: string;
}

export interface WebStorage {
  /** Retrieve a value */
  get(params: string):
    | string
    | object
    | boolean
    | null;

  /** Store a value */
  set(entry: WebStorageEntry): void;

  /** Remove a key */
  remove(params: Pick<WebStorageEntry, "name" | "namespace">): void;

  clear(): void;

  /** Convenience: true if key exists and is not expired */
  has(params: Pick<WebStorageEntry, "name" | "namespace">): boolean;

  keys(): string[];
  values(): string[];
  entries(): [string, string][];
  length(): number;
}

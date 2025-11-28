import type { Core } from '../core';
import type { GeometryMethods } from "../../utils/types/interfaces";

/**
 * Geometry module implementation for the Core class
 */
export const geometry: GeometryMethods = {
  // Basic Box Model
  width(this: HTMLElement[]) {
    return this[0].clientWidth; // Use the first element in the elements array
  },

  height(this: HTMLElement[]) {
    return this[0].clientHeight;
  },

  innerWidth(this: HTMLElement[]) {
    return this[0].clientWidth;
  },

  innerHeight(this: HTMLElement[]) {
    return this[0].clientHeight;
  },

  outerWidth(this: HTMLElement[], includeMargin: boolean = false) {
    const el: HTMLElement = this[0];
    const width: number = el.offsetWidth;
    if (includeMargin) {
      const style: CSSStyleDeclaration = window.getComputedStyle(el);
      return width + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }
    return width;
  },

  outerHeight(this: HTMLElement[], includeMargin: boolean = false) {
    const el: HTMLElement = this[0];
    const height: number = el.offsetHeight;
    if (includeMargin) {
      const style: CSSStyleDeclaration = window.getComputedStyle(el);
      return height + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    }
    return height;
  },

  // Element Position
  offset(this: HTMLElement[]) {
    const rect: DOMRect = this[0].getBoundingClientRect();
    const docElem: HTMLElement = document.documentElement;
    const scrollTop: number = window.pageYOffset || docElem.scrollTop;
    const scrollLeft: number = window.pageXOffset || docElem.scrollLeft;

    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    };
  },

  position(this: HTMLElement[]) {
    const rect: DOMRect = this[0].getBoundingClientRect();
    const parent: HTMLElement = this[0].offsetParent as HTMLElement;

    if (!parent) {
      return { top: rect.top, left: rect.left };
    }

    const parentRect: DOMRect = parent.getBoundingClientRect();
    return {
      top: rect.top - parentRect.top,
      left: rect.left - parentRect.left
    };
  },

  offsetTop(this: HTMLElement[]) {
    return this[0].getBoundingClientRect().top + window.pageYOffset;
  },

  offsetLeft(this: HTMLElement[]) {
    return this[0].getBoundingClientRect().left + window.pageXOffset;
  },

  // Scroll
  scrollTop(this: Core, value: number): number | Core  {
    if (value !== undefined) {
      this[0].scrollTop = value;
      return this; // For chainability
    }
    return this[0].scrollTop;
  },

  scrollLeft(this: Core, value: number): number | Core  {
    if (value !== undefined) {
      this[0].scrollLeft = value;
      return this; // For chainability
    }
    return this[0].scrollLeft;
  },

  scrollWidth(this: HTMLElement[]) {
    return this[0].scrollWidth;
  },

  scrollHeight(this: HTMLElement[]) {
    return this[0].scrollHeight;
  },

  // Visibility / Viewport
  isInViewport(this: HTMLElement[]) {
    const rect: DOMRect = this[0].getBoundingClientRect();

    return rect.top >= 0 && rect.left >= 0 &&
           rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
           rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  },

  // Native Rect
  rect(this: HTMLElement[]) {
    return this[0].getBoundingClientRect();
  }
};

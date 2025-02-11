import Core, { $ } from "./core";

/**
 * DOM module - Extends Core with DOM manipulation functions
 */
class DOM extends Core {
  constructor(selector: string | HTMLElement) {
    super(selector); // Call the Core constructor
  }

  addClass(className: string): this {
    this.each((el: HTMLElement) => el.classList.add(className));
    return this; // Enable chaining
  }

  removeClass(className: string): this {
    this.each((el: HTMLElement) => el.classList.remove(className));
    return this;
  }

  toggleClass(className: string): this {
    this.each((el: HTMLElement) => el.classList.toggle(className));
    return this;
  }
}

/**
 * Export DOM module as default and ensure $ function is updated.
 */
export default DOM;
export const $: (selector: string | HTMLElement) => DOM = (selector: string | HTMLElement): DOM => new DOM(selector);

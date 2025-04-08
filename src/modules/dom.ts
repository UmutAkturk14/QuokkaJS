import Core from "./core";

/**
 * DOM module - Extends Core with DOM manipulation functions
 */
class DOM extends Core {
  constructor(selector: string | HTMLElement | HTMLElement[]) {
    super(selector); // Call the Core constructor
  }

  focus(): this {
    return this._applyMethod('focus');
  }

  click(): this {
    return this._applyMethod('click');
  }

  blur(): this {
    return this._applyMethod('blur');
  }

  private _applyMethod(method: 'focus' | 'click' | 'blur'): this {
    this.each((el: HTMLElement) => el[method]());
    return this;
  }
}

/**
 * Export DOM module as default and ensure $ function is updated.
 */
export default DOM;
export const $: (selector: string | HTMLElement) => DOM = (selector: string | HTMLElement): DOM => new DOM(selector);

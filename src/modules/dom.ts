import Core from "./core";

/**
 * DOM module - Extends Core with DOM manipulation functions
 */
class DOM extends Core {
  constructor(selector: string | HTMLElement | HTMLElement[]) {
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

  hasClass(className: string): boolean {
    return this.elements.some((el: HTMLElement) => el.classList.contains(className));
  }

  children(): DOM {
    const childElements: Element[] = this.elements.flatMap((el: HTMLElement) => Array.from(el.children));
    return new DOM(childElements);
  }

  eq(index: number): DOM {
    if (index < 0) {
      index = this.elements.length + index;
    }

    const element: HTMLElement = this.elements[index];

    return $([element]);
  }

  // Individual methods for clarity
  prepend(child: string | HTMLElement | Core): this {
    return this.insertAt(child, 'prepend');
  }

  before(child: string | HTMLElement | Core): this {
    return this.insertAt(child, 'before');
  }

  after(child: string | HTMLElement | Core): this {
    return this.insertAt(child, 'after');
  }

  append(child: string | HTMLElement | Core): this {
    return this.insertAt(child, 'append');
  }

  replace(child: string | HTMLElement | Core): this {
    return this.insertAt(child, 'replace');
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

  private insertAt(
    child: string | HTMLElement | Core,
    position: 'append' | 'prepend' | 'before' | 'after' | 'replace'
  ): this {
    if (typeof child === 'string') {
      const tempDiv: HTMLDivElement = document.createElement('div');
      tempDiv.innerHTML = child;
      const nodes: ChildNode[] = Array.from(tempDiv.childNodes);

      this.each((el: HTMLElement) => {
        nodes.forEach((node: ChildNode) => {
          switch (position) {
          case 'prepend':
            el.insertBefore(node.cloneNode(true), el.firstChild);
            break;
          case 'before':
            el.parentNode?.insertBefore(node.cloneNode(true), el);
            break;
          case 'after':
            el.parentNode?.insertBefore(node.cloneNode(true), el.nextSibling);
            break;
          case 'append':
            el.appendChild(node.cloneNode(true));
            break;
          case 'replace':
            // Replace the element with the new content
            el.parentNode?.replaceChild(node.cloneNode(true), el);
            break;
          default:
            console.warn('Invalid position provided for insertion');
            break;
          }
        });
      });

    } else {
      const elements: HTMLElement[] =
        child instanceof Core ? child.elements : [child];

      this.each((el: HTMLElement) => {
        elements.forEach((childEl: HTMLElement) => {
          if (el === childEl || el.contains(childEl)) return;

          switch (position) {
          case 'prepend':
            el.insertBefore(childEl.cloneNode(true), el.firstChild);
            break;
          case 'before':
            el.parentNode?.insertBefore(childEl.cloneNode(true), el);
            break;
          case 'after':
            el.parentNode?.insertBefore(childEl.cloneNode(true), el.nextSibling);
            break;
          case 'append':
            el.appendChild(childEl.cloneNode(true));
            break;
          case 'replace':
            // Replace the element with the new content
            el.parentNode?.replaceChild(childEl.cloneNode(true), el);
            break;
          default:
            console.warn('Invalid position provided for insertion');
            break;
          }
        });
      });
    }

    return this;
  }
}

/**
 * Export DOM module as default and ensure $ function is updated.
 */
export default DOM;
export const $: (selector: string | HTMLElement) => DOM = (selector: string | HTMLElement): DOM => new DOM(selector);

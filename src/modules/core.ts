/**
 * Core functionality of the library.
 */
class Core {
  [index: number]: HTMLElement;
  elements: HTMLElement[];

  constructor(selector: string | HTMLElement | HTMLElement[], attributes?: Record<string, string>) {
    try {
      if (typeof selector === "string") {
        const tagMatch: RegExpMatchArray | null = selector.match(/^<(\w+)>$/);

        if (tagMatch) {
          const newElement: HTMLElement = document.createElement(tagMatch[1]);

          if (attributes) {
            Object.entries(attributes).forEach(([key, value]: [string, string]) => {
              if (key === "text") {
                newElement.textContent = value;
              } else {
                newElement.setAttribute(key, value);
              }
            });
          }

          this.elements = [newElement];
        } else {
          this.elements = Array.from(document.querySelectorAll(selector));
        }
      } else if (selector instanceof HTMLElement) {
        this.elements = [selector];
      } else {
        this.elements = selector;
      }

      if (this.elements.length === 0) {
        throw new Error("No elements found for the given selector.");
      }
    } catch (error) {
      this.elements = [];
    }

    // Ensure that `this` acts as an array-like object
    if(this.elements.length > 0) {
      this.elements.forEach((el: HTMLElement, index: number) => {
        this[index] = el; // Assign each element to `this` (acting as an array)
      });
    }

    // Define the length property to make it read-only
    Object.defineProperty(this, "length", {
      value: this.elements.length,
      writable: false, // Makes length read-only
      enumerable: false, // Keeps it from appearing in `for...in`
    });
  }

  // Get data
  data(
    name?: string | Record<string, string | null>,
    value?: string | null
  ): string | undefined | this | Record<string, string | undefined> {
    if (!this.exists()) return name === undefined ? this : undefined;

    const firstElement: HTMLElement = this.elements[0];

    // If no parameters, return all data attributes
    if (name === undefined) {
      const dataAttributes: Record<string, string | undefined> = {};
      Array.from(firstElement.attributes).forEach((attr: Attr) => {
        if (attr.name.startsWith("data-")) {
          const key: string = attr.name.replace("data-", "");
          dataAttributes[key] = attr.value;
        }
      });
      return dataAttributes;
    }

    // If name is an object, set/remove multiple data attributes
    if (typeof name === "object") {
      Object.entries(name).forEach(([key, val]: [string, string | null]) => {
        this.elements.forEach((el: HTMLElement) => {
          if (val === null) {
            el.removeAttribute(`data-${ key }`); // Remove attribute
          } else {
            el.setAttribute(`data-${ key }`, val); // Set attribute
          }
        });
      });
      return this;
    }

    // If value is provided
    if (value !== undefined) {
      if (value === null) {
        this.elements.forEach((el: HTMLElement) => el.removeAttribute(`data-${name}`)); // Remove attribute
      } else {
        this.elements.forEach((el: HTMLElement) => el.setAttribute(`data-${name}`, value)); // Set attribute
      }
      return this;
    }

    // Otherwise, return the attribute's value
    return firstElement.getAttribute(`data-${name}`) ?? undefined;
  }


  // Iterate over elements
  each(callback: (el: HTMLElement, index: number) => void): this {
    this.elements.forEach(callback);
    return this;
  }

  // Map elements to a new array
  map<T extends HTMLElement>(callback: (el: HTMLElement, index: number) => T): Core {
    const results: T[] = this.elements.map(callback);
    return new Core(results);
  }

  // Filter elements based on a condition
  filter(callback: (el: HTMLElement, index: number) => boolean): Core {
    return new Core(this.elements.filter(callback));
  }

  // Get the first element
  first(): Core {
    return $(this.elements.length > 0 ? [this.elements[0]] : []);
  }

  // Get the last element
  last(): Core {
    return new Core(this.elements.length ? [this.elements[this.elements.length - 1]] : []);
  }

  // Check if the selection is empty
  isEmpty(): boolean {

    return this.elements.length === 0;
  }

  // Check if the selection exists
  exists(): boolean {
    return this.elements.length > 0;
  }

  // Add elements to the selection
  add(selector: string | Core): Core {
    const newElements: HTMLElement[] = selector instanceof Core
      ? selector.elements
      : Array.from(document.querySelectorAll(selector));

    return $([...this.elements, ...newElements]);
  }

  // Remove elements from the selection
  remove(): this {
    this.each((el: HTMLElement) => {
      el.remove();
    });

    return this;
  }

  removeChild(index: number): this {
    if (index < 0 || index >= this.elements.length) {
      throw new Error("Invalid index");
    }

    this.elements[index].remove();
    return this;
  }

  // Get or set an attribute
  attr(name: string, value?: string): this | string {
    if (value === undefined) {
      return this.elements[0]?.getAttribute(name) ?? "";
    }
    this.elements.forEach((el: HTMLElement) => el.setAttribute(name, value));
    return this;
  }

  removeAttr(name: string): this {
    this.elements.forEach ((el: HTMLElement) => el.removeAttribute(name));
    return this;
  }

  text(): string; // For getting text
  text(text: string): this; // For setting text (not accepting null or undefined)

  text(text?: string): string | this {
    if (!this.elements.length) {
      return "";
    }

    // If text is provided, set it (validate that text is not null or undefined)
    if (text !== undefined) {
      if (text === null) {
        throw new Error("Cannot set text to null or undefined");
      }
      this.elements.forEach((el: HTMLElement) => {
        el.textContent = text;
      });
      return this; // Return 'this' to support chaining
    }

    // If no text is provided, return the current text content
    return this.elements[0].textContent ?? "";
  }

  html(): string {
    return this.elements[0]?.innerHTML?? "";
  }

  val(): string {
    return this.elements[0]?.getAttribute("value")?? "";
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

  children(): Core {
    const childElements: HTMLElement[] = this.elements.flatMap((el: HTMLElement) =>
      Array.from(el.children).filter(
        (child: Element): child is HTMLElement => child instanceof HTMLElement
      )
    );
    return $(childElements);
  }

  parent(): Core {
    const parentElements: HTMLElement[] = this.elements.flatMap((el: HTMLElement) => {
      const parent: HTMLElement | null = el.parentElement;
      return parent ? [parent] : [];
    });

    return $(parentElements);
  }

  parents(): Core {
    const parentElements: HTMLElement[] = this.elements.flatMap((el: HTMLElement) => {
      const parents: HTMLElement[] = [];
      let parent: HTMLElement | null = el.parentElement;

      while (parent) {
        parents.push(parent);
        parent = parent.parentElement;
      }

      return parents;
    });

    return $(parentElements);
  }

  siblings(): Core {
    const siblingElements: HTMLElement[] = [];

    this.elements.forEach((el: HTMLElement) => {
      let sibling: HTMLElement | null = el.parentNode?.firstElementChild as HTMLElement | null ?? null;

      while (sibling) {
        if (sibling !== el) {
          siblingElements.push(sibling);  // Push only siblings that are not the current element
        }
        sibling = sibling.nextElementSibling as HTMLElement | null;  // Move to the next sibling
      }
    });

    return $(siblingElements);
  }

  get(index: number, core: boolean = true): HTMLElement | Core | undefined {
    if (core) {
      return $(this.elements[index]);
    }
    return this.elements[index]
  }

  eq(index: number): Core {
    const safeIndex: number = index < 0 ? this.elements.length + index : index;
    const element: HTMLElement = this.elements[safeIndex];
    return $(element);
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

  id(identifier?: string): string | boolean | undefined {
    if (identifier !== null && identifier !== undefined && identifier !== "") {
      return this.elements[0].id === identifier;
    } else {
      return this.elements[0]?.id ?? '';
    }
  }

  is(selector: string | Element | ((element: HTMLElement) => boolean)): boolean {
    if (!this.exists() || selector == null || selector === "") {
      return false;
    }

    const firstElement: HTMLElement = this.elements[0];

    if (typeof selector === "string") {
      return firstElement.matches(selector);
    } else if (typeof selector === "object" && selector !== null
        && "nodeType" in selector && selector.nodeType === 1) {
      return firstElement.isSameNode(selector);
    } else if (typeof selector === "function") {
      try {
        return selector(firstElement);
      } catch (error) {
        console.log("Error executing selector function:", error);
        return false;
      }
    }

    return false;
  }

  find(selector: string): Core {
    const foundElements: HTMLElement[] = this.elements.flatMap((el: HTMLElement) =>
      Array.from(el.querySelectorAll(selector)).map((e: Element) => e as HTMLElement)
    );

    return $(foundElements);
  }

  classList(): string {
    return this.elements[0].className;
  }

  css(
    property: string | { [key: string]: string },
    value?: string,
    important: boolean | string = false): this | string {
    if (typeof property === 'string' && value === undefined) {
      const computedStyle: CSSStyleDeclaration = getComputedStyle(this.elements[0]);
      return computedStyle.getPropertyValue(property);
    } else if (typeof property === 'string' && value !== undefined) {
      this.elements.forEach((el: HTMLElement) => {
        if (important) {
          el.style.setProperty(property, value, 'important');
        } else {
          el.style.setProperty(property, value);
        }
      });

      return this;
    } else if (typeof property === 'object') {
      this.elements.forEach((el: HTMLElement) => {
        for (const [key, value] of Object.entries(property)) {
          el.style.setProperty(key, value)
        }
      });

      return this;
    }

    return this;
  }

  hide(): this {
    this.css('display', 'none');

    return this;
  }

  show(): this {
    this.css('display', '');

    return this;
  }

  toggle(): this {
    if (this.css('display') === 'none') {
      this.show();
    } else {
      this.hide();
    }

    return this;
  }

  toggleVisibility(): this {
    if (this.css('visibility') === 'hidden') {
      this.css('visibility', 'visible');
    } else {
      this.css('visibility', 'hidden');
    }

    return this;
  }

  visible(): this {
    this.css('visibility', 'visible');

    return this;
  }

  invisible(): this {
    this.css('visibility', 'hidden');

    return this;
  }
  fadeOut(duration: number = 400, useVisibility: boolean = false): this {
    const finalDuration: number = duration || 400;

    if (useVisibility) {
      this.css(
        {
          'transition': `opacity ${ finalDuration }ms ease-out`,
          'opacity': '0'
        }
      )
    } else {
      this.css(
        {
          'transition': `opacity ${ finalDuration }ms ease-out`,
          'opacity': '0',
        }
      )

      setTimeout(() => {
        this.css('display', 'none');
      }, finalDuration);
    }

    return this;
  }

  fadeIn(duration: number = 400, useVisibility: boolean = false): this {
    const finalDuration: number = duration || 400;

    this.css({
      'display': 'block',
      'opacity': '0',
      'transition': `opacity ${finalDuration}ms ease-out`
    });

    // Use visibility or fade-in by changing opacity
    if (useVisibility) {
      setTimeout(() => {
        this.css({
          'visibility': 'visible',
          'opacity': '1'
        });
      }, 10); // Add a small delay to trigger the opacity transition
    } else {
      setTimeout(() => {
        this.css({
          'opacity': '1' // Fade in by changing opacity
        });
      }, 10);
    }

    return this;
  }

  fadeToggle(duration: number = 400, useVisibility: boolean = false): this {
    // Check the visibility of the selection as a whole (not individual elements)
    const isVisible: boolean = this.elements.some((el: HTMLElement) => getComputedStyle(el).opacity === '1');

    // Apply fadeOut or fadeIn depending on visibility of the selection
    if (isVisible) {
      this.fadeOut(duration, useVisibility);
    } else {
      this.fadeIn(duration, useVisibility);
    }

    return this;
  }

  slideDown(duration: number = 400): this {
    const finalDuration: number = duration || 400;

    // Set display to block and start from height 0 for sliding down effect
    this.css({
      'display': 'block',
      'height': '0',
      'overflow': 'hidden',
      'transition': `height ${finalDuration}ms ease-out`
    });

    // Get the element's original height (height before it's hidden)
    const height: string = `${ this.elements[0].scrollHeight }px`;

    // Set height back to its full height to trigger the slide-down animation
    setTimeout(() => {
      this.css({
        'height': height // Slide down to original height
      });
    }, 10); // Small timeout to trigger the transition

    return this;
  }

  slideUp(duration: number = 400): this {
    const finalDuration: number = duration || 400;

    // Set the element's height to the current height for the animation to work
    this.css({
      'transition': `height ${ finalDuration }ms ease-out`,
      'height': `${ this.elements[0].offsetHeight }px`, // Set initial height
      'overflow': 'hidden'
    });

    // Animate the height to 0 to hide the element
    setTimeout(() => {
      this.css({
        'height': '0'
      });
    }, 10); // Small timeout to trigger the transition

    setTimeout(() => {
      this.css('display', 'none'); // Set display to none after the slide-up animation ends
    }, finalDuration);

    return this;
  }

  slideYToggle(duration: number = 400): this {
    const isVisible: boolean = this.elements.some((el: HTMLElement) => getComputedStyle(el).display !== 'none');

    if (isVisible) {
      this.slideUp(duration);
    } else {
      this.slideDown(duration);
    }

    return this;
  }

  slideLeft(duration: number = 400): this {
    this.css({
      'transition': `transform ${ duration }ms ease-out, opacity ${ duration }ms ease-out`,
      'transform': 'translateX(-100%)',
      'opacity': '0'
    });

    setTimeout(() => {
      this.css('visibility', 'hidden');
    }, duration);

    return this;
  }

  slideRight(duration: number = 400): this {

    this.css({
      'visibility': 'visible',
      'transform': 'translateX(0%)',
      'transition': `transform ${ duration }ms ease-out, opacity ${ duration }ms ease-out`,
      'opacity': '1'
    });

    return this;
  }

  slideXToggle(duration: number = 400): this {
    const isVisible: boolean = this.elements.some((el: HTMLElement) => {
      const style: CSSStyleDeclaration = getComputedStyle(el);
      const transform: string = style.transform;
      const opacity: number = parseFloat(style.opacity);
      const visibility: boolean = style.visibility !== 'hidden';
      return visibility && opacity > 0 && (transform === 'none' || transform.includes('matrix(1'));
    });

    if (isVisible) {
      this.slideLeft(duration);
    } else {
      this.slideRight(duration);
    }

    return this;
  }

  pulse(duration: number = 600, scale: number = 1.2): this {
    const step: number = duration / 5;

    this.css({
      'transition': `transform ${step}ms ease-out`,
      'transform': `scale(${scale})`
    });

    setTimeout(() => {
      this.css('transform', 'scale(0.95)');
    }, step);

    setTimeout(() => {
      this.css('transform', `scale(${scale * 0.98})`);
    }, step * 2);

    setTimeout(() => {
      this.css('transform', 'scale(1.01)');
    }, step * 3);

    setTimeout(() => {
      this.css('transform', 'scale(1)');
    }, step * 4);

    return this;
  }

  bounce(duration: number = 600, height: number = 30): this {
    const step: number = duration / 6;

    // Initial bounce up
    this.css({
      'transition': `transform ${step}ms ease-out`,
      'transform': `translateY(-${height}px) scaleY(1)`
    });

    // Fall and squish
    setTimeout(() => {
      this.css({
        'transform': 'translateY(0) scaleY(0.9)'
      });
    }, step);

    // Rebound up (smaller)
    setTimeout(() => {
      this.css({
        'transform': `translateY(-${height * 0.5}px) scaleY(1)`
      });
    }, step * 2);

    // Fall and squish again (smaller)
    setTimeout(() => {
      this.css({
        'transform': 'translateY(0) scaleY(0.95)'
      });
    }, step * 3);

    // Tiny final bounce
    setTimeout(() => {
      this.css({
        'transform': `translateY(-${height * 0.25}px) scaleY(1)`
      });
    }, step * 4);

    // Back to rest
    setTimeout(() => {
      this.css({
        'transform': 'translateY(0) scaleY(1)'
      });
    }, step * 5);

    return this;
  }

  shake(duration: number = 400, intensity: number = 2): this {
    const keyframes: string[] = [
      `translateX(0)`,
      `translateX(-${intensity}px)`,
      `translateX(${intensity}px)`,
      `translateX(-${intensity}px)`,
      `translateX(${intensity}px)`,
      `translateX(0)`,
    ];

    const frameCount: number = keyframes.length;
    const interval: number = duration / frameCount;

    keyframes.forEach((transform: string, index: number) => {
      setTimeout(() => {
        this.css({
          transform,
        });
      }, index * interval);
    });

    setTimeout(() => {
      this.css({
        transform: 'none',
      });
    }, duration);

    return this;
  }

  flip(duration: number = 600): this {
    const finalDuration = duration || 600;

    this.css({
      'transform-style': 'preserve-3d',
      'transition': `transform ${finalDuration}ms ease-in-out`,
      'transform': 'rotateY(180deg)',
    });

    setTimeout(() => {
      this.css({
        'transform': 'rotateY(0deg)',
      });
    }, finalDuration);

    return this;
  }

  zoomIn(duration: number = 600, scale: number = 1.2): this {
    this.css({
      'transform': `scale(${scale})`,
      'transition': `transform ${duration}ms ease-in-out`,
    })

    return this;
  }

  zoomOut(duration: number = 600): this {
    this.css({
      'transform': `scale(1)`,
      'transition': `transform ${duration}ms ease-in-out`,
    })

    return this;
  }

  pulseGlow(duration: number = 800, intensity: number = 20, colors: {
    boxShadow: string;
    textShadow: string;
    boxShadowPulse: string;
    textShadowPulse: string;
  } = {
    boxShadow: 'rgba(91, 255, 15, 0.92)',
    textShadow: 'rgba(37, 185, 243, 0.86)',
    boxShadowPulse: 'rgba(30, 214, 205, 0.89)',
    textShadowPulse: 'rgba(33, 145, 236, 0.8)'
  }): this {
    const finalDuration: number = duration || 800;
    const finalIntensity: number = intensity || 20;

    // Store original box-shadow and text-shadow values
    const originalBoxShadow: string = this.css('box-shadow') as string || '';
    const originalTextShadow: string = this.css('text-shadow') as string || '';

    // Apply initial glow effect
    this.css({
      'transition': `box-shadow ${finalDuration}ms ease-in-out, text-shadow ${finalDuration}ms ease-in-out`,
      'box-shadow': `0 0 ${finalIntensity}px ${colors.boxShadow}`,
      'text-shadow': `0 0 ${finalIntensity}px ${colors.textShadow}`,
    });

    // Helper function to toggle pulse effect
    const togglePulse: () => void = (): void => {
      this.css({
        'box-shadow': `0 0 ${finalIntensity * 2}px ${colors.boxShadowPulse}`,
        'text-shadow': `0 0 ${finalIntensity * 2}px ${colors.textShadowPulse}`,
      });

      setTimeout(() => {
        this.css({
          'box-shadow': originalBoxShadow,
          'text-shadow': originalTextShadow,
        });
      }, finalDuration / 2); // Half-duration to reverse pulse
    };

    // Start pulse effect cycle
    const pulseInterval: NodeJS.Timeout = setInterval(togglePulse, finalDuration);

    // Stop pulse effect and restore original styles after 2 cycles
    setTimeout(() => {
      clearInterval(pulseInterval);
      this.css({
        'box-shadow': originalBoxShadow,
        'text-shadow': originalTextShadow,
      });
    }, finalDuration * 2); // Stop after two cycles

    return this;
  }

  // Length of the selected elements
  get length(): number {
    return this.elements.length;
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

// Exporting a function similar to `jQuery()`
export function $(selector: string | HTMLElement | HTMLElement[], attributes?: Record<string, string>): Core {
  return new Core(selector, attributes);
}

export default Core;

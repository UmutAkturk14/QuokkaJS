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


  get(index: number, core: boolean = false): HTMLElement | Core | undefined {
    if (core) {
      return $(this.elements[index]);
    }
    return this.elements[index]
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
      el.remove(); // This actually removes the element from the DOM
    });

    return this; // Like jQuery, return the same object to allow chaining
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

  // ! GET/SET TEXT. TO BE CARRIED TO THE DOM MODULE.
  // Overload signatures
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

  // Length of the selected elements
  get length(): number {
    return this.elements.length;
  }
}

// Exporting a function similar to `jQuery()`
export function $(selector: string | HTMLElement | HTMLElement[], attributes?: Record<string, string>): Core {
  return new Core(selector, attributes);
}

export default Core;

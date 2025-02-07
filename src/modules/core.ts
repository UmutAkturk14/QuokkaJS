/**
 * Core functionality of the library.
 */
class Core {
  [index: number]: HTMLElement;
  private elements: HTMLElement[];

  constructor(selector: string | HTMLElement | HTMLElement[], attributes?: Record<string, string>) {
    try {
      if (typeof selector === "string") {
        const tagMatch = selector.match(/^<(\w+)>$/);

        if (tagMatch) {
          const newElement = document.createElement(tagMatch[1]);

          if (attributes) {
            Object.entries(attributes).forEach(([key, value]) => {
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
    if(this.elements.length > 1) {
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
  data(): void{

  }

  // Iterate over elements
  each(callback: (el: HTMLElement, index: number) => void): this {
    this.elements.forEach(callback);
    return this;
  }

  // Map elements to a new array
  map<T>(callback: (el: HTMLElement, index: number) => T): T[] {
    return this.elements.map(callback);
  }

  // Filter elements based on a condition
  filter(callback: (el: HTMLElement, index: number) => boolean): Core {
    return new Core(this.elements.filter(callback));
  }

  // Get the first element
  first(): Core {
    return new Core(this.elements[0] ? [this.elements[0]] : []);
  }

  // Get the last element
  last(): Core {
    return new Core(this.elements.length ? [this.elements[this.elements.length - 1]] : []);
  }

  // Length of the selected elements
  length(): number {
    return this.elements.length;
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
  add(elements: HTMLElement[]): this {
    this.elements = this.elements.concat(elements);
    return this;
  }

  // Remove elements from the selection
  remove(elements: HTMLElement[]): this {
    this.elements = this.elements.filter((el) => !elements.includes(el));
    return this;
  }

  // Get or set an attribute
  attr(name: string, value?: string): this | string {
    if (value === undefined) {
      return this.elements[0]?.getAttribute(name) ?? "";
    }
    this.elements.forEach((el) => el.setAttribute(name, value));
    return this;
  }

  text(): string {
    return this.elements[0]?.textContent?? "";
  }
}

// Exporting a function similar to `jQuery()`
export function $(selector: string | HTMLElement | HTMLElement[], attributes?: Record<string, string>): Core {
  return new Core(selector, attributes);
}

export default Core;

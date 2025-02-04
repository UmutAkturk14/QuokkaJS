/**
 * Core functionality of the library.
 */
class Core {
  private elements: HTMLElement[];

  constructor(selector: string | HTMLElement | HTMLElement[]) {
    try {
      if (typeof selector === "string") {
        // Attempt to select elements
        this.elements = Array.from(document.querySelectorAll(selector));
      } else if (selector instanceof HTMLElement) {
        this.elements = [selector];
      } else {
        this.elements = selector;
      }

      if (this.elements.length === 0) {
        throw new Error("No elements found for the given selector.");
      }
    } catch (error) {
      // console.error("Error in selector processing:", error);
      this.elements = []; // Set to empty array if there's an error
      // new Error ("This is not a valid selector")
    }
  }

  // Iterate over elements
  each(callback: (el: HTMLElement, index: number) => void): this {
    this.elements.forEach((el: HTMLElement, index: number) => callback(el, index));
    return this; // Enables chaining
  }

  // Map elements to a new array
  map<T>(callback: (el: HTMLElement, index: number) => T): T[] {
    return this.elements.map((el: HTMLElement, index: number) => callback(el, index));
  }

  // Filter elements based on a condition
  filter(callback: (el: HTMLElement, index: number) => boolean): Core {
    const filteredElements: HTMLElement[] = this.elements.filter((el: HTMLElement, index: number) => {
      return callback(el, index)
    });
    return new Core(filteredElements); // Return a new instance with filtered elements
  }

  // Get the first element
  first(): Core {
    this.elements = [this.elements[0]]; // Only set the first element
    return this; // Return the Core instance for chaining
  }

  // Get the last element
  last(): Core {
    this.elements = [this.elements[this.elements.length - 1]]; // Only set the last element
    return this; // Return the Core instance for chaining
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
    this.elements = this.elements.filter((el: HTMLElement) => !elements.includes(el));
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
}

// Exporting a function similar to `jQuery()`
export function $(selector: string | HTMLElement | HTMLElement[]): Core {
  return new Core(selector);
}

export default Core;

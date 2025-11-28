import { eventManager } from "../eventManager";
import { DOM } from "../dom";
import { geometry } from "../geometry";
import type { DOMMethods, GeometryMethods } from "../../utils/types";

/**
 * Core functionality of the library.
 */
class Core {
  [index: number]: HTMLElement; // For array-like behavior
  elements: HTMLElement[]; // Store the elements
  eventManager: typeof eventManager; // Event manager reference
  DOM: DOMMethods; // DOM manipulation reference
  geometry: GeometryMethods;

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
      if (process.env.NODE_ENV === "development") {
        console.error("Error in Core constructor:", error);
      }
      this.elements = [];
    }

    // Assign eventManager methods to this instance
    this.eventManager = Object.create(eventManager);
    this.DOM = Object.create(DOM);
    this.geometry = Object.create(geometry)

    // Ensure that `this` acts as an array-like object
    if (this.elements.length > 0) {
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

    // Proxy to handle delegation of method calls
    return new Proxy(this, {
      get(target: Core, prop: string | symbol): unknown {
        // Check if the method exists in the DOM module
        if (typeof prop === "string" && prop in DOM) {
          return (...args: unknown[]): Core => {
            // Call the DOM method with the current instance's elements
            if (prop in DOM) {
              (DOM[prop as keyof typeof DOM] as (...args: unknown[]) => void).apply(target, args);
            }
            return target;  // Keep chainability by returning the instance
          };
        }

        // Check if the method exists in the eventManager module
        if (typeof prop === "string" && prop in eventManager) {
          return (...args: unknown[]): Core => {
            // Call the eventManager method with the current instance's elements
            (eventManager[prop as keyof typeof eventManager] as (...args: unknown[]) => void).apply(target, args);
            return target;  // Keep chainability by returning the instance
          };
        }

        // Check if the method exists in the Geometry module
        if (typeof prop === "string" && prop in geometry) {
          return function (...args: unknown[]): number | Core {
            // Call the Geometry method with the current instance's elements
            const geometryMethod: ((...args: unknown[]) => number | undefined) | undefined =
              geometry[prop as keyof typeof geometry] as ((...args: unknown[]) => number | undefined) | undefined;
            if (!geometryMethod) {
              throw new Error(`Method ${String(prop)} is not compatible with the expected signature.`);
            }

            // If there are arguments, execute the method and return the Core instance (for chainability)
            if (args.length > 0) {
              geometryMethod.apply(target, args);
              return target; // Return Core instance for chainability
            }

            // If no arguments, return the value (for getting a value like scrollTop)
            const result: number | undefined = geometryMethod.apply(target, args);
            return result === undefined ? target : result;
          };
        }


        // If the method doesn't exist in any module, return the default behavior
        return target[prop as keyof Core];
      }
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

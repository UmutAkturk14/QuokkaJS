import { JSDOM } from "jsdom";

// Function to create an element with optional attributes
export function createElement(
  tag: string,
  options: { id?: string; className?: string; textContent?: string } = {},
  dataset?: Record<string, string>
): HTMLElement {
  const el: HTMLElement = document.createElement(tag);

  if (typeof options.id !== 'undefined') {
    el.id = options.id;
  }
  if (typeof options.className !== 'undefined') {
    el.className = options.className;
  }
  if (typeof options.textContent !== 'undefined') {
    el.textContent = options.textContent;
  }

  if (dataset) {
    Object.entries(dataset).forEach(([key, value]: [string, string]) => el.setAttribute(`data-${key}`, value));
  }

  return el;
}

// Function to set up the virtual DOM
export function setDOM(): {
  dom: JSDOM;
  elements: {
    singleElement: HTMLElement;
    classElement1: HTMLElement;
    classElement2: HTMLElement;
    parentElement: HTMLElement;
    firstChild: HTMLElement;
    middleChild: HTMLElement;
    lastChild: HTMLElement;
  };
  } {
  const dom: JSDOM = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
  global.document = dom.window.document;

  const singleElement: HTMLElement = createElement("div", { id: "test" }, { test: "value", test2: "value2" });
  const classElement1: HTMLElement = createElement("div", { className: "test-class" });
  const classElement2: HTMLElement = createElement("div", { className: "test-class" });

  const parentElement: HTMLElement = createElement("div", { id: "parent" });
  const firstChild: HTMLElement = createElement("span", { className: "child", textContent: "First" });
  const middleChild: HTMLElement = createElement("span", { className: "child", textContent: "Middle" });
  const lastChild: HTMLElement = createElement("span", { className: "child", textContent: "Last" });
  const anotherElement: HTMLElement = createElement("span", { className: "test-child", textContent: "TestValue" });

  // Append elements
  document.body.appendChild(singleElement);
  document.body.appendChild(classElement1);
  document.body.appendChild(classElement2);

  parentElement.appendChild(firstChild);
  parentElement.appendChild(middleChild);
  parentElement.appendChild(lastChild);
  document.body.appendChild(parentElement);
  document.body.appendChild(anotherElement);

  return {
    dom,
    elements: {
      singleElement,
      classElement1,
      classElement2,
      parentElement,
      firstChild,
      middleChild,
      lastChild
    }
  };
}

export function basicChecks(): void {
  let allChecksPassed: boolean = true;

  console.log("\x1b[1m\x1b[32m%s\x1b[0m", "=== Basic Environment Checks ===\n");

  // Check for window and document
  const isWindowDefined: boolean = typeof window !== "undefined";
  const isDocumentDefined: boolean = typeof document !== "undefined";
  console.log("Is window defined:", isWindowDefined);
  console.log("Is document defined:", isDocumentDefined);
  if (!isWindowDefined || !isDocumentDefined) allChecksPassed = false;

  // Check window.location
  try {
    console.log("window.location.href:", window.location.href);
    console.log("window.location.origin:", window.location.origin);
  } catch (err) {
    console.warn("Error accessing location:", err);
    allChecksPassed = false;
  }

  // Check localStorage availability
  try {
    localStorage.setItem("__test_key", "value");
    const value: string | null = localStorage.getItem("__test_key");
    localStorage.removeItem("__test_key");
    console.log("localStorage works:", value === "value");
    if (value !== "value") allChecksPassed = false;
  } catch (err) {
    console.warn("localStorage error:", err);
    allChecksPassed = false;
  }

  // Check sessionStorage
  try {
    sessionStorage.setItem("__test_key", "value");
    const value: string | null = sessionStorage.getItem("__test_key");
    sessionStorage.removeItem("__test_key");
    console.log("sessionStorage works:", value === "value");
    if (value !== "value") allChecksPassed = false;
  } catch (err) {
    console.warn("sessionStorage error:", err);
    allChecksPassed = false;
  }

  // JSDOM-specific check
  const isInJSDOM: boolean = navigator.userAgent.includes("jsdom");
  console.log("Is running in JSDOM:", isInJSDOM);
  if (!isInJSDOM) allChecksPassed = false;

  console.log("================================\n");

  // Log the final result
  if (allChecksPassed) {
    console.log("\x1b[1m\x1b[32m%s\x1b[0m", "\nSUCCESS: All environment checks passed!");
  } else {
    console.log("\x1b[1m\x1b[31m%s\x1b[0m", "\nFAILURE: One or more environment checks failed.");
  }
}

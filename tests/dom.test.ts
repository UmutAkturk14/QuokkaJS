import { describe, it, expect, beforeEach, test } from "vitest";
import { JSDOM } from "jsdom";
import Core, { $ } from "../src/modules/core";

describe("Core Library", () => {
  let document: Document;
  let mockElement: HTMLElement;
  let coreInstance: Core;

  // beforeEach(() => {
  //   // Create a new JSDOM instance for each test
  //   const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
  //   document = dom.window.document; // Get the document

  //   // Create a mock element dynamically
  //   mockElement = document.createElement("div");
  //   mockElement.setAttribute("id", "test");
  //   mockElement.setAttribute("data-test", "value");
  //   document.body.appendChild(mockElement);

  //   // Instantiate Core with the mock element
  //   coreInstance = new Core(mockElement);
  // });

  // it("should select an element by string selector", () => {
  //   const instance = new Core("#test");
  //   expect(instance.exists()).toBe(true);
  //   expect(instance.length()).toBe(1);
  // });

  test.todo('Function: Append')
  test.todo('Function: Prepend')
  test.todo('Function: Before')
  test.todo('Function: After')
  test.todo('Function: Css')
  test.todo('Function: Show')
  test.todo('Function: Hide')
  test.todo('Function: Toggle')
  test.todo('Function: hasClass')
  test.todo('Function: removeClass')
});

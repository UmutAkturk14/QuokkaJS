import { describe, expect, beforeEach, test } from "vitest";
import { JSDOM } from "jsdom";
import Core, { $ } from "../src/modules/core";

describe("Core Library", () => {
  let document: Document;
  let mockElement: HTMLElement;
  let coreInstance: Core;

  beforeEach(() => {
    // Create a new JSDOM instance for each test
    const dom: JSDOM = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    document = dom.window.document;
    global.document = document; // Make document globally available

    // Create and append mock element
    // mockElement = document.createElement("div");
    // mockElement.setAttribute("id", "test");
    // mockElement.setAttribute("data-test", "value");
    // document.body.appendChild(mockElement);

    // Initialize core instance with the added element
    // coreInstance = new Core('#test');
  });


  test.todo('Main function: $')
  describe('Main function: $', () => {
    test('type of $ should be a function', () => {
      expect(typeof $).toBe('function');
    });

    test('core instance to have the data', () => {
      expect($(document).exists()).toBe(true);
    })

    test('should be able to add a class', () => {
    })
  });


  test.todo('Function: Each')
  test.todo('Function: Map')
  test.todo('Function: Filter')
  test.todo('Function: First')
  test.todo('Function: Last')
  test.todo('Function: Length')
  test.todo('Function: IsEmpty')
  test.todo('Function: Exists')
  test.todo('Function: Add')
  test.todo('Function: Remove')
  test.todo('Function: Attr')
  test.todo('Function: Data')
  test.todo('Function: Text')
  test.todo('Function: Html')
  test.todo('Function: Val')
});

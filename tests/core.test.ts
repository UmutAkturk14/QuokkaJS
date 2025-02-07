import { describe, expect, beforeEach, test } from "vitest";
import { JSDOM } from "jsdom";
import { $ } from "../src/modules/core";
import { createElement } from "./helpers/utils";

describe("Core Library", () => {
  let document: Document;

  beforeEach(() => {
    // Create a new JSDOM instance for each test
    const dom: JSDOM = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    document = dom.window.document;
    global.document = document; // Make document globally available

    // Create elements to test different selectors
    const singleElement: HTMLElement = createElement("div", { id: "test" }, { test: "value" });
    const classElement1: HTMLElement = createElement("div", { className: "test-class" });
    const classElement2: HTMLElement = createElement("div", { className: "test-class" });

    const parentElement: HTMLElement = createElement("div", { id: "parent" });
    const firstChild: HTMLElement = createElement("span", { className: "child", textContent: "First" });
    const middleChild: HTMLElement = createElement("span", { className: "child", textContent: "Middle" });
    const lastChild: HTMLElement = createElement("span", { className: "child", textContent: "Last" });

    // Append elements to the document body
    document.body.appendChild(singleElement);
    document.body.appendChild(classElement1);
    document.body.appendChild(classElement2);

    parentElement.appendChild(firstChild);
    parentElement.appendChild(middleChild);
    parentElement.appendChild(lastChild);
    document.body.appendChild(parentElement);
  });

  describe('Main function: $', () => {
    test('type of $ should be a function', () => {
      expect(typeof $).toBe('function');
    });

    test('should be able to work with tag selectors', () => {
      expect($('div').exists()).toBe(true);
      expect($('option').exists()).toBe(false);
    });

    test('should be able to work with id selector', () => {
      expect($('#test').exists()).toBe(true);
      expect($('#test').length).toBe(1);
    })

    test('should be able to work with class selector', () => {
      expect($('.test-class').exists()).toBe(true);
      expect($('.test-class').length).toBe(2);
    })

    describe('should be able to work with pseudo selectors', () => {
      test('should be able to work with :first-child', () => {
        expect($('div#parent').exists()).toBe(true);
        expect($('div#parent :first-child').exists()).toBe(true);
        expect($('.child:first-child').text()).toBe('First');
      });

      test('should be able to work with :last-child', () => {
        expect($('.child:last-child').text()).toBe('Last');
      })
    });

    test.todo('ADDITIONAL PSEUDO SELECTORS')
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
  describe('Function: Text', () => {
    test('text() should be a function', () => {
      expect(typeof $('div').text).toBe('function');
    })
  })

  test.todo('Function: Html')
  test.todo('Function: Val')
});

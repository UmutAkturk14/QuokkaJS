import { describe, expect, beforeEach, test } from "vitest"
import { JSDOM } from "jsdom"
import Core, { $ } from "../src/modules/core"
import { createElement } from "./helpers/utils"

describe("Core Library", () => {
  let document: Document

  beforeEach(() => {
    // Create a new JSDOM instance for each test
    const dom: JSDOM = new JSDOM(`<!DOCTYPE html><html><body></body></html>`)
    document = dom.window.document
    global.document = document // Make document globally available

    // Create elements to test different selectors
    const singleElement: HTMLElement = createElement("div", { id: "test" }, { test: "value" })
    const classElement1: HTMLElement = createElement("div", { className: "test-class" })
    const classElement2: HTMLElement = createElement("div", { className: "test-class" })

    const parentElement: HTMLElement = createElement("div", { id: "parent" })
    const firstChild: HTMLElement = createElement("span", { className: "child", textContent: "First" })
    const middleChild: HTMLElement = createElement("span", { className: "child", textContent: "Middle" })
    const lastChild: HTMLElement = createElement("span", { className: "child", textContent: "Last" })

    // Append elements to the document body
    document.body.appendChild(singleElement)
    document.body.appendChild(classElement1)
    document.body.appendChild(classElement2)

    parentElement.appendChild(firstChild)
    parentElement.appendChild(middleChild)
    parentElement.appendChild(lastChild)
    document.body.appendChild(parentElement)
  })

  describe('Main function: $', () => {
    test('type of $ should be a function', () => {
      expect(typeof $).toBe('function')
    })

    test('should be able to work with tag selectors', () => {
      expect($('div').exists()).toBe(true)
      expect($('option').exists()).toBe(false)
    })

    test('should be able to work with id selector', () => {
      expect($('#test').exists()).toBe(true)
      expect($('#test').length).toBe(1)
    })

    test('should be able to work with class selector', () => {
      expect($('.test-class').exists()).toBe(true)
      expect($('.test-class').length).toBe(2)
    })

    describe('should be able to work with pseudo selectors', () => {
      test('should be able to work with :first-child', () => {
        expect($('div#parent').exists()).toBe(true)
        expect($('div#parent :first-child').exists()).toBe(true)
        expect($('.child:first-child').text()).toBe('First')
      })

      test('should be able to work with :last-child', () => {
        expect($('.child:last-child').text()).toBe('Last')
      })

      test('should be able to work with :is', () => {

      })

      test('should be able to work with :not', () => {

      })
    })

    test('length property should be read only and work in various cases', () => {
      const $div: Core = $('div');

      expect($div.length).toBe(4)
      expect($('#test').length).toBe(1)
      expect($('.test-class').length).toBe(2)

      expect(() => {
        $div.length = 10
      },).toThrowError(TypeError)
    })
  })

  describe('Function: each()', () => {
    const $divs: Core = $('div');
    let count: number = 0;

    test('each() should be a function', () => {
      expect(typeof $('div').each).toBe('function');
    });

    test('each() should iterate over all selected elements', () => {

      $divs.each(function () {
        count++; // Increment count for each iteration
      });

      // Ensure each() loops over the correct number of divs
      expect(count).toBe($divs.length);
    });

    test('each() should have access to the current element via "this"', () => {

      $divs.each(function (this: HTMLElement) {
        // "this" should refer to the current element in the loop
        expect(this).toBe($divs[count]);
      });
    });

    test('each() should correctly pass arguments to the callback function', () => {
      const $divs: Core = $('div');
      let passedIndex: number = -1;
      let passedElement: HTMLElement | null = null;

      $divs.each((element: HTMLElement, index: number): void => {
        passedIndex = index;
        passedElement = element;
      });

      // Ensure the index and element are passed correctly
      expect(passedIndex).toBeGreaterThanOrEqual(0);
      expect(passedElement).not.toBeNull();
    });

  });


  describe('Function: map()', () => {
    test('map() should be a function', () => {
      expect(typeof $('div').map).toBe('function')
    })
  })

  describe('Function: filter()', () => {
    test('filter() should be a function', () => {
      expect(typeof $('div').filter).toBe('function')
    })
  })

  describe('Function: first()', () => {
    test('first() should be a function', () => {
      expect(typeof $('div').first).toBe('function')
    })
  })

  describe('Function: last()', () => {
    test('last() should be a function', () => {
      expect(typeof $('div').last).toBe('function')
    })
  })

  describe('Function: isEmpty()', () => {
    test('isEmpty() should be a function', () => {
      expect(typeof $('div').isEmpty).toBe('function')
    })
  })

  describe('Function: exists()', () => {
    test('exists() should be a function', () => {
      expect(typeof $('div').exists).toBe('function')
    })
  })

  describe('Function: add()', () => {
    test('add() should be a function', () => {
      expect(typeof $('div').add).toBe('function')
    })
  })

  describe('Function: remove()', () => {
    test('remove() should be a function', () => {
      expect(typeof $('div').remove).toBe('function')
    })
  })

  describe('Function: attr()', () => {
    test('attr() should be a function', () => {
      expect(typeof $('div').attr).toBe('function')
    })
  })

  describe('Function: data()', () => {
    test('data() should be a function', () => {
      expect(typeof $('div').data).toBe('function')
    })
  })

  describe('Function: text()', () => {
    test('text() should be a function', () => {
      expect(typeof $('div').text).toBe('function')
    })
  })

  describe('Function: html()', () => {
    test('html() should be a function', () => {
      expect(typeof $('div').html).toBe('function')
    })
  })

  describe('Function: val()', () => {
    test('val() should be a function', () => {
      expect(typeof $('div').val).toBe('function')
    })
  })

  describe('Property: length()', () => {
    test('length should be a number', () => {
      expect(typeof $('div').length).toBe('number')
    })

    test('length should be equal to the number of elements selected', () => {
      expect($('div').length).toBe(4)
      expect($('#test').length).toBe(1)
      expect($('.test-class').length).toBe(2)
    })
  })
})

import { describe, expect, beforeEach, test } from "vitest"
import { JSDOM } from "jsdom"
import Core, { $ } from "../src/modules/core"
import { createElement } from "./helpers/utils"

describe("Core Module", () => {
  beforeEach(() => {
    // Create a new JSDOM instance for each test
    const dom: JSDOM = new JSDOM(`<!DOCTYPE html><html><body></body></html>`)
    global.document = dom.window.document

    // Create elements to test different selectors
    const singleElement: HTMLElement = createElement("div", { id: "test" }, { test: "value", test2: "value2" })
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
        // @ts-expect-error - Length property should be read only
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
      const $divs: Core = $('div');
      expect(typeof $divs.map).toBe('function');
    });

    test('map() should return a new Core instance', () => {
      const $divs: Core = $('div');
      const result: Core = $divs.map((el: HTMLElement) => el); // Returns Core<HTMLElement>

      expect(result).toBeInstanceOf(Core);
      expect(result.length).toBe($divs.length); // Preserve length
    });

    test('map() should correctly transform elements', () => {
      const $divs: Core = $('div');
      const transformed: Core = $divs.map((el: HTMLElement) => {
        const clone: HTMLElement = el.cloneNode(true) as HTMLElement;
        clone.dataset.test = 'modified';
        return clone;
      });

      expect(transformed).toBeInstanceOf(Core);
      expect(transformed.length).toBe($divs.length);

      transformed.each((el: HTMLElement) => {
        expect(el.dataset.test).toBe('modified');
      });
    });

    test('map() should return an empty Core instance when called on an empty selection', () => {
      const mapped: Core = $('non-existent-selector').map((el: HTMLElement) => el);

      expect(mapped).toBeInstanceOf(Core);
      expect(mapped.length).toBe(0);
    });

    test('map() should correctly pass index and element to the callback', () => {
      const $divs: Core = $('div');
      const indexes: number[] = [];
      const mapped: Core = $divs.map((el: HTMLElement, index: number) => {
        indexes.push(index);
        return el;
      });

      expect(mapped).toBeInstanceOf(Core);
      expect(indexes).toEqual([...Array($divs.length).keys()]);
    });
  });

  describe('Function: filter()', () => {
    test('filter() should be a function', () => {
      const $divs: Core = $('div');

      expect(typeof $divs.filter).toBe('function');
    });

    test('filter() should return a new Core instance', () => {
      const $divs: Core = $('div');
      const result: Core = $divs.filter((el: HTMLElement) => el.classList.contains('test-class'));
      expect(result).toBeInstanceOf(Core);
    });

    test('filter() should apply the callback function to filter elements', () => {
      const $divs: Core = $('div');
      // Assuming some divs have the class 'active'
      const activeDivs: Core = $divs.filter((el: HTMLElement) => el.classList.contains('test-class'));

      // Ensure that the filtered Core instance contains only the active divs
      expect(activeDivs.length).toBeGreaterThan(0);
      activeDivs.each((el: HTMLElement) => {
        expect(el.classList.contains('test-class')).toBe(true);
      });
    });

    test('filter() should return an empty Core instance when no elements match', () => {
      const $divs: Core = $('div');
      const filtered: Core = $divs.filter((el: HTMLElement) => el.classList.contains('non-existent-class'));
      expect(filtered).toBeInstanceOf(Core);
      expect(filtered.length).toBe(0);
    });

    test('filter() should preserve the selection\'s length after filtering', () => {
      const $divs: Core = $('div');
      const originalLength: number = $divs.length;
      const filtered: Core = $divs.filter((el: HTMLElement) => el.classList.contains('active'));

      expect(filtered.length).toBeLessThanOrEqual(originalLength);
    });
  });

  describe('Function: first()', () => {
    test('first() should be a function', () => {
      expect(typeof $('div').first).toBe('function');
    });

    test('first() should return a Core instance', () => {
      const $divs: Core = $('div');
      const firstDiv: Core = $divs.first();

      expect(firstDiv).toBeInstanceOf(Core);
    });

    test('first() should return the first element in the selection', () => {
      const $divs: Core = $('div');
      const firstDiv: Core = $divs.first();

      // Ensure the first element is the first in the selection
      expect(firstDiv.length).toBe(1);
      expect(firstDiv.get(0).html).toBe($divs.get(0).html);
    });

    test('first() should return an empty Core instance when the selection is empty', () => {
      const firstDiv: Core = $('non-existent-selector').first();

      expect(firstDiv).toBeInstanceOf(Core);
      expect(firstDiv.length).toBe(0);
    });
  });

  describe('Function: last()', () => {
    test('last() should be a function', () => {
      expect(typeof $('div').last).toBe('function');
    });

    test('last() should return a Core instance', () => {
      const $divs: Core = $('div');
      const lastDiv: Core = $divs.last();

      expect(lastDiv).toBeInstanceOf(Core);
    });

    test('last() should return the last element in the selection', () => {
      const $divs: Core = $('div');
      const lastDiv: Core = $divs.last();

      // Ensure the last element is the last in the selection
      expect(lastDiv.length).toBe(1);
      expect(lastDiv.get(0).html).toBe($divs.get($divs.length - 1).html);
    });

    test('last() should return an empty Core instance when the selection is empty', () => {
      const lastDiv: Core = $('non-existent-selector').last();

      expect(lastDiv).toBeInstanceOf(Core);
      expect(lastDiv.length).toBe(0);
    });
  });

  describe('Function: isEmpty()', () => {
    test('isEmpty() should be a function', () => {
      expect(typeof $('div').isEmpty).toBe('function');
    });

    test('isEmpty() should return true for empty selection', () => {
      const emptyDivs: Core = $('non-existent-selector');
      expect(emptyDivs.isEmpty()).toBe(true);
    });

    test('isEmpty() should return false for non-empty selection', () => {
      const nonEmptyDivs: Core = $('div');
      expect(nonEmptyDivs.isEmpty()).toBe(false);
    });
  });

  describe('Function: exists()', () => {
    test('exists() should be a function', () => {
      expect(typeof $('div').exists).toBe('function');
    });

    test('exists() should return false for empty selection', () => {
      const emptyDivs: Core = $('non-existent-selector');
      expect(emptyDivs.exists()).toBe(false);
    });

    test('exists() should return true for non-empty selection', () => {
      const nonEmptyDivs: Core = $('div');
      expect(nonEmptyDivs.exists()).toBe(true);
    });
  });

  describe('Function: add()', () => {
    test('add() should be a function', () => {
      expect(typeof $('div').add).toBe('function');
    });

    test('add() should add new elements to the selection', () => {
      const $divs: Core = $('div');
      const $newDiv: Core = $('span.child');

      // Add the new div to the selection
      const combined: Core = $divs.add($newDiv);

      expect(combined.length).toBe($divs.length + $newDiv.length); // Check if the combined length is correct
    });

    test('add() should return a new Core instance with the added elements', () => {
      const $divs: Core = $('div');
      const $newDiv: Core = $('span.child');

      const combined: Core = $divs.add($newDiv);

      expect(combined).toBeInstanceOf(Core); // Ensure it returns a Core instance
    });

    test('add() should allow adding elements from a selector string', () => {
      const $divs: Core = $('div');
      const combined: Core = $divs.add('.child');

      // Check if the added selection has the correct length
      expect(combined.length).toBe($divs.length + document.querySelectorAll('.child').length);
    });

    test('add() should handle adding multiple selectors or elements', () => {
      const $divs: Core = $('div');
      const combined: Core = $divs.add('span.child, div#test');

      // Check if the combined length is the correct total
      expect(combined.length).toBe($divs.length + document.querySelectorAll('span.child, div#test').length);
    });

    test('add() should not modify the original selection', () => {
      const $divs: Core = $('div');
      const originalLength: number = $divs.length;

      $divs.add('.child'); // Add some elements to the selection
      expect($divs.length).toBe(originalLength); // The original selection should remain the same length
    });
  });

  describe('Function: remove()', () => {
    test('remove() should be a function', () => {
      expect(typeof $('div').remove).toBe('function');
    });

    test('remove() should return a Core instance', () => {
      const $divs: Core = $('div');
      const updatedDivs: Core = $divs.remove('div');

      expect(updatedDivs).toBeInstanceOf(Core);
    });

    test('remove() should remove the specified elements from the selection', () => {
      const $divs: Core = $('div');
      const updatedDivs: Core = $divs.remove($divs.get(0));

      expect(updatedDivs.length).toBe($divs.length - 1); // Length should decrease
      expect(updatedDivs[0]).not.toBe($divs[0]); // The first div should no longer be the same
    });

    test('remove() should return the same selection if no elements match the selector', () => {
      const $divs: Core = $('div');

      const updatedDivs: Core = $divs.remove('non-existent-selector'); // Remove non-existing elements

      expect(updatedDivs.length).toBe($divs.length); // Length should remain unchanged
      expect(updatedDivs[0]).toBe($divs[0]); // The first div should be the same
    });

    test('remove() should return an empty selection when all elements are removed', () => {
      const $divs: Core = $('div');
      const updatedDivs: Core = $divs.remove($divs); // Remove all divs

      expect(updatedDivs.length).toBe(0); // The selection should be empty
    });

    test('remove() should behave as expected when using a Core instance as a selector', () => {
      const $divs: Core = $('div');
      const divToRemove: Core = $('div').first(); // Selecting the first div

      const updatedDivs: Core = $divs.remove(divToRemove);

      expect(updatedDivs.length).toBe($divs.length - 1); // Length should decrease
      expect(updatedDivs[0]).not.toBe(divToRemove[0]); // The first div should no longer be the removed one
    });
  });

  describe('Function: attr()', () => {
    test('attr() should be a function', () => {
      expect(typeof $('div').attr).toBe('function');
    });

    test('attr() should return the correct attribute value when getting an attribute', () => {
      const $divs: Core = $('div');
      const div: Core = $divs.get(0);
      div.attr('data-test', 'test-value');

      const attrValue: string | Core = $divs.attr('data-test');

      expect(attrValue).toBe('test-value'); // Expect the correct attribute value
    });

    test('attr() should return an empty string when the attribute is not present', () => {
      expect($('#test').attr('data-non-existent')).toBe('');
    });

    test('attr() should set the attribute correctly when a value is provided', () => {
      const $divs: Core = $('div');

      $divs.attr('data-test', 'new-value');

      expect($divs.attr('data-test')).toBe('new-value');
    });

    test('attr() should set the same attribute for all selected elements', () => {
      const $divs: Core = $('div');

      $divs.attr('data-test', 'test-value');

      $divs.each((el: HTMLElement) => {
        expect(el.getAttribute('data-test')).toBe('test-value');
      });
    });
  });

  describe('Function: data()', () => {
    test('data() should be a function', () => {
      const $div: Core = $('#test');

      expect(typeof $div.data).toBe('function');
    });

    test('should retrieve all data attributes as an object', () => {
      const $div: Core = $('#test');

      expect($div.data()).toEqual({ test: 'value', test2: 'value2' })
    });

    test('should retrieve a specific data attribute', () => {
      const $div: Core = $('#test');

      expect($div.data('test')).toBe('value');
    });

    test('should return undefined for non-existent attributes', () => {
      const $div: Core = $('#test');

      expect($div.data('nonexistent')).toBeUndefined();
    });

    test('should set a data attribute', () => {
      const $div: Core = $('#test');

      $div.data('key3', 'value3');
      expect($div.data('key3')).toBe('value3');
    });

    test('should update an existing data attribute', () => {
      const $div: Core = $('#test');

      $div.data('test', 'newValue');
      expect($div.data('test')).toBe('newValue');
    });

    test('should set multiple data attributes using an object', () => {
      const $div: Core = $('#test');

      $div.data({ test3: "value3", test4: "value4" });
      expect($div.data()).toEqual({ test: "value", test2: "value2", test3: "value3", test4: "value4" });
    });

    test('should remove a specific data attribute', () => {
      const $div: Core = $('#test');

      $div.data('test', null);
      expect($div.data()).toEqual({ test2: "value2" });
    });

    test('should remove multiple data attributes using an object', () => {
      const $div: Core = $('#test');

      $div.data({ test: null, test2: null });
      expect($div.data()).toEqual({});
    });

    test('should not break when trying to remove a non-existent data attribute', () => {
      const $div: Core = $('#test');

      expect(() => $div.data('nonexistent', null)).not.toThrow();
      expect($div.data()).toEqual({ test: "value", test2: "value2" });
    });

    test('should be able to handle empty elements', () => {
      const $empty: Core = $('#does-not-exist');

      expect($empty.data()).toMatchObject({});
      expect($empty.data('key')).toBeUndefined();
      expect($empty.data('key', 'value')).toMatchObject({});
      expect($empty.data('key', null)).toMatchObject({});
    });
  })

  describe('Function: text()', () => {
    test('text() should be a function', () => {
      expect(typeof $('div').text).toBe('function');
    });

    test('should return the text of a selection', () => {
      expect($('span:first-child').text()).toBe('First');
    });

    test('should set the text of a selection', () => {
      const $element: Core = $('span:first-child');
      $element.text('New text');
      expect($element.text()).toBe('New text');
    });

    test('should return an empty string for elements with no text', () => {
      const $empty: Core = $('div.no-text');
      expect($empty.text()).toBe(''); // Assuming the element has no text content
    });

    test('should allow setting text to an empty string', () => {
      const $element: Core = $('span:first-child');
      $element.text('');
      expect($element.text()).toBe('');
    });

    test('should handle setting text as null or undefined', () => {
      const $element: Core = $('span:first-child');
      expect(() => {
        // @ts-expect-error - Text should not be null or undefined
        $element.text(null);
      }).toThrowError();
      expect($element.text()).toBe('First');

      // @ts-expect-error - Text should not be null or undefined
      expect($element.text(undefined)).toBe('First');
    });

    test('should set and get the text of a selection', () => {
      const $element: Core = $('span:first-child');

      expect($element.text('New text').text()).toBe('New text');
    });

  });


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

  describe('Function: get()', () => {
    test('get() should be a function', () =>{
      expect(typeof $('div').get).toBe('function')
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

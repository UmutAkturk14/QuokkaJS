import { describe, it, expect, beforeEach, test } from "vitest";
import Core, { $ } from "../src/modules/dom";

import { createElement, setDOM, basicChecks } from "./helpers/utils"

describe("DOM Module", () => {
  basicChecks();
  beforeEach(setDOM)

  test('Extension of core module', () => {
    expect($).toBeInstanceOf(Function)
  })

  test('Function: $', () => {
    const $divs: Core = $('div');

    expect($divs).toBeInstanceOf(Core)
    expect($divs.length).toBe(4)
    expect($divs.addClass).toBeInstanceOf(Function)
  })

  test('Function: Append', () => {
    // Select the parent element and append a new child element
    const newChild: HTMLElement = createElement("span", { className: "new-child", textContent: "New Child" });
    const parent: Core = $('#parent'); // Use the $ selector to get the parent element
    parent.append(newChild); // Append the new child to the parent

    // Optionally, check the new child's content and class
    expect(newChild.textContent).toBe("New Child");
    expect(newChild.className).toBe("new-child");
  });


  // test('Function: Prepend', () => {
  //   expect(false).toBe(true);
  // })

  // test('Function: Before', () => {
  //   expect(false).toBe(true);
  // })

  // test('Function: After', () => {
  //   expect(false).toBe(true);
  // })

  // test('Function: Remove', () => {
  //   expect(false).toBe(true);
  // })

  // test('Function: Css', () => {
  //   expect(false).toBe(true);
  // })

  // test('Function: Show', () => {
  //   expect(false).toBe(true);
  // })

  // test('Function: Hide', () => {
  //   expect(false).toBe(true);
  // })

  // test('Function: Toggle', () => {
  //   expect(false).toBe(true);
  // })

  // test('Function: classList', () => {
  //   expect(false).toBe(true);
  // })

  // test('Function: hasClass()', () => {
  //   expect(false).toBe(true);
  // })

  // test('Function: removeClass()', () => {
  //   expect(false).toBe(true);
  // })

  // test('Function: text()', () => {
  //   expect(false).toBe(true);
  // })
});

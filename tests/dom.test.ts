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
    const newChild: HTMLElement = createElement("span", { className: "new-child", textContent: "New Child" });
    $('#parent').append(newChild);

    const $newChild: Core = $('.new-child');
    const $parentDiv: Core = $('#parent');

    console.log($newChild.elements[0].outerHTML)

    expect($newChild).toBeInstanceOf(Core);
    expect($newChild.length).toBe(1);
    expect($newChild.elements[0].textContent).toBe("New Child");
    expect(newChild.className).toBe("new-child");
    expect($parentDiv.elements[0].lastElementChild).toBe($newChild.elements[0]);
  });


  test('Function: Prepend', () => {
    expect(false).toBe(true);
  })

  test('Function: Before', () => {
    const newChild: HTMLElement = createElement("span", { className: "new-child", textContent: "New Child" });
    const $secondChild: Core = $('#parent').children().eq(1);
    $secondChild.before(newChild);

    const $newChild: Core = $('.new-child');
    const $parentDiv: Core = $('#parent');

    console.log($newChild.elements[0].outerHTML);

    expect($newChild).toBeInstanceOf(Core);
    expect($newChild.length).toBe(1);
    expect($newChild.elements[0].textContent).toBe("New Child");
    expect(newChild.className).toBe("new-child");

    // Ensure the new child is before the second child of the parent
    expect($parentDiv.elements[0].children[1]).toBe($newChild.elements[0]);
  });


  test('Function: After', () => {
    expect(false).toBe(true);
  })

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

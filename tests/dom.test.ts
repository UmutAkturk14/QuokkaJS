import { describe, it, expect, beforeEach, test } from "vitest";
import { JSDOM } from "jsdom";
import Core, { $ } from "../src/modules/dom";

import { createElement } from "./helpers/utils"

describe("DOM Module", () => {
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

  test('Extension of core module', () => {
    expect($).toBeInstanceOf(Function)
  })

  test('Function: $', () => {
    const $divs: Core = $('div');

    expect($divs).toBeInstanceOf(Core)
    expect($divs.length).toBe(4)
    expect($divs.addClass).toBeInstanceOf(Function)
  })

  test.todo('Function: Append')
  test.todo('Function: Prepend')
  test.todo('Function: Before')
  test.todo('Function: After')
  test.todo('Function: Css')
  test.todo('Function: Show')
  test.todo('Function: Hide')
  test.todo('Function: Toggle')
  test.todo('Function: hasClass()')
  test.todo('Function: removeClass()')
  test.todo('Function: text()')
  test.todo('Function: html()')
  test.todo('Function: val()')
});

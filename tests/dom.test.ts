import { describe, it, expect, beforeEach, test } from "vitest";
import DOM, { $ } from "../src/modules/dom";


import { createElement, setDOM, basicChecks } from "./helpers/utils"

describe("DOM Module", () => {
  basicChecks();
  beforeEach(setDOM)

  test('Extension of DOM module', () => {
    expect($).toBeInstanceOf(Function)
  })

  test('Function: $', () => {
    const $divs: DOM = $('div');

    expect($divs).toBeInstanceOf(DOM)
    expect($divs.length).toBe(4)
    expect($divs.addClass).toBeInstanceOf(Function)
  })

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

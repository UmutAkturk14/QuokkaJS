import { describe, expect, beforeEach, test } from "vitest"
import { $ } from "../src/modules/core"
import { basicChecks, setDOM } from "./helpers/utils"

describe("Geometry Module", () => {
  beforeEach(setDOM)
  // ! JSDOM FAILS RELEVANT PROPERTIES IN THE SOURCE CODE.
  // ! ONLY CHECKING THE IMPORTS.

  test('Function: height()', () => {
    expect(typeof $('body').geometry.height).toBe('function');
  });

  test('Function: width()', () => {
    expect(typeof $('body').geometry.width).toBe('function');
  });

  test('Function: innerWidth()', () => {
    expect(typeof $('body').geometry.innerWidth).toBe('function');
  });

  test('Function: innerHeight()', () => {
    expect(typeof $('body').geometry.innerHeight).toBe('function');
  });

  test('Function: outerWidth()', () => {
    expect(typeof $('body').geometry.outerWidth).toBe('function');
  });

  test('Function: outerHeight()', () => {
    expect(typeof $('body').geometry.outerHeight).toBe('function');
  });

  test('Function: offset()', () => {
    expect(typeof $('body').geometry.offset).toBe('function');
  });

  test('Function: position()', () => {
    expect(typeof $('body').geometry.position).toBe('function');
  });

  test('Function: offsetTop()', () => {
    expect(typeof $('body').geometry.offsetTop).toBe('function');
  });

  test('Function: offsetLeft()', () => {
    expect(typeof $('body').geometry.offsetLeft).toBe('function');
  });

  test('Function: scrollTop()', () => {
    expect(typeof $('body').geometry.scrollTop).toBe('function');
  });

  test('Function: scrollLeft()', () => {
    expect(typeof $('body').geometry.scrollLeft).toBe('function');
  });

  test('Function: scrollWidth()', () => {
    expect(typeof $('body').geometry.scrollWidth).toBe('function');
  });

  test('Function: scrollHeight()', () => {
    expect(typeof $('body').geometry.scrollHeight).toBe('function');
  });

  test('Function: isInViewport()', () => {
    expect(typeof $('body').geometry.isInViewport).toBe('function');
  });

  test('Function: rect()', () => {
    expect(typeof $('body').geometry.rect).toBe('function');
  });
})

import { describe, expect, beforeEach, test } from "vitest";
import { Storage } from "../src/modules/storage";

const testKey: string = "testKey";
const testNamespace: string = "testNS";
const testValue: { foo: string } = { foo: "bar" };
const stringValue: string = "hello";
const boolValue: boolean = true;

describe("Storage", () => {
  beforeEach(() => {
    Storage.local.clear();
    Storage.session.clear();
  });

  describe("Storage", () => {
  beforeEach(() => {
    Storage.local.clear();
    Storage.session.clear();
  });

  test("set and get without expiry", () => {
    Storage.local.set({ name: testKey, value: testValue });
    const result = Storage.local.get(testKey);
    expect(result).toEqual(testValue);
  });

  test("set and get with expiry timestamp (not expired)", () => {
    const future = Date.now() + 10000; // 10 seconds in the future
    Storage.local.set({ name: testKey, value: stringValue, expires: future });
    const result = Storage.local.get(testKey);
    expect(result).toBe(stringValue);
  });

  test("set and get with expiry timestamp (expired)", () => {
    const past = Date.now() - 10000; // 10 seconds ago
    Storage.local.set({ name: testKey, value: stringValue, expires: past });
    const result = Storage.local.get(testKey);
    expect(result).toBeNull();
    // Also confirm key was removed from storage
    expect(localStorage.getItem(testKey)).toBeNull();
  });

  test("set and get with expiry Date object (not expired)", () => {
    const futureDate = new Date(Date.now() + 5000);
    Storage.local.set({ name: testKey, value: boolValue, expires: futureDate });
    const result = Storage.local.get(testKey);
    expect(result).toBe(boolValue);
  });

  test("set and get with expiry Date object (expired)", () => {
    const pastDate = new Date(Date.now() - 5000);
    Storage.local.set({ name: testKey, value: boolValue, expires: pastDate });
    const result = Storage.local.get(testKey);
    expect(result).toBeNull();
    expect(localStorage.getItem(testKey)).toBeNull();
  });

  test("remove an item", () => {
    Storage.local.set({ name: testKey, value: stringValue });
    Storage.local.remove({ name: testKey });
    expect(Storage.local.get(testKey)).toBeNull();
  });

  test("clear all items", () => {
    Storage.local.set({ name: "key1", value: "val1" });
    Storage.local.set({ name: "key2", value: "val2" });
    Storage.local.clear();
    expect(Storage.local.get("key1")).toBeNull();
    expect(Storage.local.get("key2")).toBeNull();
  });

  test("has method returns true if item exists and is not expired", () => {
    Storage.local.set({ name: testKey, value: testValue });
    expect(Storage.local.has({ name: testKey })).toBe(true);
  });

  test("has method returns false if item is expired", () => {
    const past = Date.now() - 1000;
    Storage.local.set({ name: testKey, value: testValue, expires: past });
    expect(Storage.local.has({ name: testKey })).toBe(false);
  });

  test("expired items removed on initialization", () => {
    const past = Date.now() - 10000;
    // Directly use localStorage to simulate stale expired item
    localStorage.setItem(testKey, JSON.stringify({ value: "foo", expiresAt: past }));

    // Construct a new Storage instance (which calls cleanExpired in constructor)
    const storage = new (Storage.constructor as any)();

    expect(localStorage.getItem(testKey)).toBeNull();
  });
});


});

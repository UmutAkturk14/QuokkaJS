import { describe, expect, beforeEach, test } from "vitest";
import storage from "../src/modules/storage";

const testKey: string = "testKey";
const testNamespace: string = "testNS";
const testValue: { foo: string } = { foo: "bar" };
const stringValue: string = "hello";
const boolValue: boolean = true;

describe("Storage", () => {
  beforeEach(() => {
    storage.local.clear();
    storage.session.clear();
  });

  test("set and get string value", () => {
    storage.local.set(testKey, stringValue);
    expect(storage.local.get(testKey)).toBe(stringValue);
  });

  test("set and get object value", () => {
    storage.local.set(testKey, testValue);
    expect(storage.local.get(testKey)).toEqual(testValue);
  });

  test("set and get boolean value", () => {
    storage.local.set(testKey, boolValue);
    expect(storage.local.get(testKey)).toBe(true);
  });

  test("remove value", () => {
    storage.local.set(testKey, stringValue);
    storage.local.remove(testKey);
    expect(storage.local.get(testKey)).toBeNull();
  });

  test("has method", () => {
    expect(storage.local.has(testKey)).toBe(false);
    storage.local.set(testKey, stringValue);
    expect(storage.local.has(testKey)).toBe(true);
  });

  test("clear method", () => {
    storage.local.set("a", 'a');
    storage.local.set("b", 'b');
    storage.local.clear();
    expect(storage.local.length()).toBe(0);
  });

  test("namespace isolation", () => {
    storage.local.set(testKey, "global");
    storage.local.set(testKey, "namespaced", { namespace: testNamespace });

    expect(storage.local.get(testKey)).toBe("global");
    expect(storage.local.get(testKey, { namespace: testNamespace })).toBe("namespaced");
  });
  test("value is available before expiration", () => {
    const expirationTime: number = Date.now() + 2000; // 1 second from now
    storage.local.set(testKey, stringValue, { expires: expirationTime });

    expect(storage.local.get(testKey)).toBe(stringValue); // should still be valid
  });

  test("value is removed after expiration", async () => {
    const expirationTime: number = Date.now() - 5; // 5ms from now
    storage.local.set(testKey, stringValue, { expires: expirationTime });

    // Now the value should have expired
    expect(storage.local.get(testKey)).toBeNull();
    expect(storage.local.has(testKey)).toBe(false);
  });



  test("entries, keys and values return correctly", () => {
    storage.local.set("key1", "one");
    storage.local.set("key2", "two");

    const keys: string[] = storage.local.keys();
    const values: string[] = storage.local.values();
    const entries: [string, string][] = storage.local.entries();

    expect(keys).toContain("key1");
    expect(keys).toContain("key2");
    expect(values).toContain("one");
    expect(values).toContain("two");
    expect(entries).toContainEqual(["key1", expect.any(String)]);
    expect(entries).toContainEqual(["key2", expect.any(String)]);
  });
});

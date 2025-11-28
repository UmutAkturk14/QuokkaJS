import { PlainObject } from "../../utils/types";
import type {
  WebStorage,
  WebStorageEntry,
  ParsedType,
} from "../../utils/types/interfaces";

function buildKey(name: string, namespace?: string): string {
  return namespace ? `${namespace}-${name}` : name;
}

function parseStoredValue(raw: string | null): ParsedType {
  if (raw === null) return null;
  try {
    const parsed: object = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && "value" in parsed) {
      const value: ParsedType = (parsed as { value: ParsedType }).value;
      if (
        "expiresAt" in parsed &&
        typeof parsed.expiresAt === "number" &&
        Date.now() > parsed.expiresAt
      ) {
        return null;
      }
      return value;
    }
    if (
      typeof parsed === "string" ||
      typeof parsed === "boolean" ||
      typeof parsed === "object"
    ) {
      return parsed;
    }
    return null;
  } catch {
    return raw;
  }
}

function isDate(value: unknown): value is Date {
  return Object.prototype.toString.call(value) === "[object Date]";
}

/**
 * QuokkaStorage is a utility class for managing web storage (localStorage and sessionStorage).
 * It provides methods to create storage instances, clean expired items, and handle storage entries.
 * It supports namespacing and expiration for stored items.
 */
class QuokkaStorage {
  constructor() {
    this.cleanExpired();
  }

  cleanExpired(): void {
    [localStorage, sessionStorage].forEach((store) => {
      for (let i: number = store.length - 1; i >= 0; i--) {
        const key: string | null = store.key(i);
        if (!key) continue;

        const raw: string | null = store.getItem(key);
        const parsed: string | boolean | object | null = parseStoredValue(raw);
        if (parsed === null && raw !== null) {
          store.removeItem(key);
        }
      }
    });
  }

  createWebStorage(store: globalThis.Storage): WebStorage {
    // Private helper: deep merge two PlainObjects, non-array only
    function deepUpdate(
      target: PlainObject,
      updates: PlainObject
    ): PlainObject {
      const result: PlainObject = { ...target };

      for (const key in updates) {
        const updateVal = updates[key];
        const targetVal = target[key];

        const bothAreObjects =
          updateVal &&
          typeof updateVal === "object" &&
          !Array.isArray(updateVal) &&
          targetVal &&
          typeof targetVal === "object" &&
          !Array.isArray(targetVal);

        if (bothAreObjects) {
          result[key] = deepUpdate(targetVal, updateVal);
        } else {
          result[key] = updateVal;
        }
      }

      return result;
    }

    return {
      get: (key: string): object | ParsedType => {
        const raw: string | null = store.getItem(key);
        const parsed: ParsedType = parseStoredValue(raw);
        if (parsed === null && raw !== null) {
          store.removeItem(key);
        }
        return parsed;
      },

      set: ({ name, value, expires, namespace }: WebStorageEntry): void => {
        const fullKey: string = buildKey(name, namespace);
        const expiresAt: number | undefined = isDate(expires)
          ? expires.getTime()
          : expires;
        const record: string = JSON.stringify({
          value,
          ...(expires != null ? { expiresAt } : {}),
        });
        store.setItem(fullKey, record);
      },

      update: ({ name, value, expires, namespace }: WebStorageEntry): void => {
        const fullKey = buildKey(name, namespace);
        const raw = store.getItem(fullKey);

        // type guard for PlainObject
        function isPlainObject(value: unknown): value is PlainObject {
          return (
            value !== null && typeof value === "object" && !Array.isArray(value)
          );
        }

        let existing: PlainObject = {};
        if (raw !== null) {
          const parsed = parseStoredValue(raw);
          if (isPlainObject(parsed)) {
            existing = parsed;
          }
        }

        // Decide how to combine:
        let updated: PlainObject | typeof value;

        if (isPlainObject(value)) {
          // Merge if update value is also an object
          updated = deepUpdate(existing, value);
        } else {
          // Otherwise, just overwrite with the new value
          updated = value;
        }

        const expiresAt = isDate(expires) ? expires.getTime() : expires;
        const record = JSON.stringify({
          value: updated,
          ...(expires != null ? { expiresAt } : {}),
        });

        store.setItem(fullKey, record);
      },

      remove: ({ name, namespace }): void => {
        const fullKey: string = buildKey(name, namespace);
        store.removeItem(fullKey);
      },

      clear: () => store.clear(),

      has: ({ name, namespace }): boolean => {
        return (
          this.createWebStorage(store).get(buildKey(name, namespace)) !== null
        );
      },

      keys: () => Object.keys(store),
      values: () => Object.values(store) as string[],
      entries: () => Object.entries(store) as [string, string][],
      length: () => store.length,
    };
  }

  local: WebStorage = this.createWebStorage(localStorage);
  session: WebStorage = this.createWebStorage(sessionStorage);
}

const storage: QuokkaStorage = new QuokkaStorage();
export default storage;

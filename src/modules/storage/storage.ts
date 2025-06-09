import type { WebStorage, WebStorageEntry, ParsedType } from "../../utils/types/interfaces";

function buildKey(name: string, namespace?: string): string {
  return namespace ? `${namespace}-${name}` : name;
}

function parseStoredValue(raw: string | null): ParsedType {
  if (raw === null) return null;
  try {
    const parsed: object = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && "value" in parsed) {
      const value: ParsedType = (parsed as { value: ParsedType }).value;
      if ("expiresAt" in parsed && typeof parsed.expiresAt === "number" && Date.now() > parsed.expiresAt) {
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
  return Object.prototype.toString.call(value) === '[object Date]';
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
      // Iterate backwards to avoid issues when removing items
      for (let i: number = store.length - 1; i >= 0; i--) {
        const key: string | null = store.key(i);
        if (!key) continue;

        const raw: string | null = store.getItem(key);
        const parsed: string | boolean | object | null = parseStoredValue(raw);
        // If parsed is null but raw exists, it means expired or invalid
        if (parsed === null && raw !== null) {
          store.removeItem(key);
        }
      }
    });
  }

  createWebStorage(store: globalThis.Storage): WebStorage {
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
        const expiresAt: number | undefined = isDate(expires) ? expires.getTime() : expires;
        const record: string = JSON.stringify({
          value,
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
        return this.createWebStorage(store).get(buildKey(name, namespace)) !== null;
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

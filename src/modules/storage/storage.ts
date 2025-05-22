import type { WebStorage, WebStorageEntry } from "../../utils/types/interfaces";

function buildKey(name: string, namespace?: string): string {
  return namespace ? `${namespace}-${name}` : name;
}

function parseStoredValue(raw: string | null): string | object | boolean | null {
  if (raw === null) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && "value" in parsed) {
      if ("expiresAt" in parsed && typeof parsed.expiresAt === "number" && Date.now() > parsed.expiresAt) {
        return null;
      }
      return parsed.value;
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

class QuokkaStorage {
  constructor() {
    this.cleanExpired();
  }

  cleanExpired() {
    [localStorage, sessionStorage].forEach((store) => {
      // Iterate backwards to avoid issues when removing items
      for (let i = store.length - 1; i >= 0; i--) {
        const key = store.key(i);
        if (!key) continue;

        const raw = store.getItem(key);
        const parsed = parseStoredValue(raw);
        // If parsed is null but raw exists, it means expired or invalid
        if (parsed === null && raw !== null) {
          store.removeItem(key);
        }
      }
    });
  }

  createWebStorage(store: globalThis.Storage): WebStorage {
    return {
      get: (key: string) => {
        const raw = store.getItem(key);
        const parsed = parseStoredValue(raw);
        if (parsed === null && raw !== null) {
          store.removeItem(key);
        }
        return parsed;
      },

      set: ({ name, value, expires, namespace }: WebStorageEntry) => {
        const fullKey = buildKey(name, namespace);
        const expiresAt = isDate(expires) ? expires.getTime() : expires;
        const record = JSON.stringify({
          value,
          ...(expires != null ? { expiresAt } : {}),
        });
        store.setItem(fullKey, record);
      },

      remove: ({ name, namespace }) => {
        const fullKey = buildKey(name, namespace);
        store.removeItem(fullKey);
      },

      clear: () => store.clear(),

      has: ({ name, namespace }) => {
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

const Storage = new QuokkaStorage();
export default Storage;

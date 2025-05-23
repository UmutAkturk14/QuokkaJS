import type { WebStorage, WebStorageOptions } from "../../utils/types/interfaces";

function buildKey(key: string, namespace?: string): string {
  return namespace ? `${namespace}-${key}` : key;
}

/**
 * Safely tries to parse JSON. Falls back to original value if parsing fails.
 * Also handles expiration if present.
 */
function parseStoredValue(value: string | null): string | object | boolean | null {
  if (value === null) return null;

  try {
    const parsed: string | object | boolean | unknown = JSON.parse(value);
    if (parsed && typeof parsed === "object" && "value" in parsed) {
      if ("expiresAt" in parsed && typeof (parsed as { expiresAt: number })
        .expiresAt === "number" && Date.now() > (parsed as { expiresAt: number }).expiresAt) {
        return null; // expired
      }
      const typedParsed: { value: string | boolean | object } = parsed as { value: string | boolean | object };
      return typedParsed.value;
    }
    if (typeof parsed === "string" || typeof parsed === "boolean" || (typeof parsed === "object" && parsed !== null)) {
      return parsed;
    }
    return null;
  } catch {
    return value;
  }
}

/**
 * Storage class that provides wrapper methods for both localStorage and sessionStorage
 */
class Storage {
  /**
   * Creates a WebStorage interface wrapper around the native Storage object
   * @param storage - The native Storage object (localStorage or sessionStorage)
   * @returns WebStorage interface implementation
   */
  createWebStorage(storage: globalThis.Storage): WebStorage {
    return {
      get: (key: string, options?: WebStorageOptions): string | object | boolean | null => {
        const fullKey: string = buildKey(key, options?.namespace);
        const raw: string | null = storage.getItem(fullKey);
        const parsed: string | object | boolean | null = parseStoredValue(raw);
        if (parsed === null && raw !== null) {
          // expired, remove
          storage.removeItem(fullKey);
        }
        return parsed;
      },

      set: (key: string, value: string | object | boolean, options?: WebStorageOptions): void => {
        const fullKey: string = buildKey(key, options?.namespace);
        const record: string =
          options?.expires != null
            ? JSON.stringify({
              value,
              expiresAt: options.expires,
            })
            : typeof value === "object"
              ? JSON.stringify(value)
              : String(value);
        storage.setItem(fullKey, record);
      },

      remove: (key: string, options?: WebStorageOptions): void => {
        storage.removeItem(buildKey(key, options?.namespace));
      },

      clear: (): void => {
        storage.clear();
      },

      has: (key: string, options?: WebStorageOptions): boolean => {
        const value: string | object | boolean | null = this.createWebStorage(storage).get(key, options);
        return value !== null;
      },

      keys: (): string[] => Object.keys(storage),
      values: (): string[] => Object.values(storage) as string[],
      entries: (): [string, string][] => Object.entries(storage) as [string, string][],
      length: (): number => storage.length,
    };
  }

  local: WebStorage = this.createWebStorage(localStorage);
  session: WebStorage = this.createWebStorage(sessionStorage);
}

const storage: Storage = new Storage();
export default storage;

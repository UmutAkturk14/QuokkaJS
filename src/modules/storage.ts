interface WebStorage {
  get(key: string): string | null;
  set(key: string, value: string | object): void;
  remove(key: string): void;
  clear(): void;
  has(key: string): boolean;
  keys(): string[];
  values(): string[];
  entries(): [string, string][];
  length(): number;
}

/**
 * Storage class providing wrapper methods for localStorage and sessionStorage
 */
class Storage {
  /**
   * Local storage implementation of WebStorage interface
   */
  local: WebStorage = {
    get: (key: string) => localStorage.getItem(key),
    set: (key: string, value: string | object) =>
      localStorage.setItem(
        key,
        typeof value === "object" ? JSON.stringify(value) : value
      ),
    remove: (key: string) => localStorage.removeItem(key),
    clear: () => localStorage.clear(),
    has: (key: string) => localStorage.getItem(key) !== null,
    keys: () => Object.keys(localStorage),
    values: () => Object.values(localStorage) as string[],
    entries: () => Object.entries(localStorage) as [string, string][],
    length: () => localStorage.length,
  };

  /**
   * Session storage implementation of WebStorage interface
   */
  session: WebStorage = {
    get: (key: string) => sessionStorage.getItem(key),
    set: (key: string, value: string | object) =>
      sessionStorage.setItem(
        key,
        typeof value === "object" ? JSON.stringify(value) : value
      ),
    remove: (key: string) => sessionStorage.removeItem(key),
    clear: () => sessionStorage.clear(),
    has: (key: string) => sessionStorage.getItem(key) !== null,
    keys: () => Object.keys(sessionStorage),
    values: () => Object.values(sessionStorage) as string[],
    entries: () => Object.entries(sessionStorage) as [string, string][],
    length: () => sessionStorage.length,
  };
}

const QuokkaStorage: Storage = new Storage();

export default QuokkaStorage;

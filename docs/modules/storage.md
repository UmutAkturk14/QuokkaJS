## `Storage`

A utility class to simplify working with `localStorage` and `sessionStorage`.
Includes support for:

- Expiration times for stored items

- Namespaced keys

- Automatic removal of expired or corrupted entries

- Typed helper methods (`get`, `set`, `remove`, `clear`, etc.)

<<<<<<< HEAD

=======
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
---

### 🔧 Constructor

#### `new QuokkaStorage()`

Creates a new instance and immediately removes all expired items from both `localStorage` and `sessionStorage`. But `QuokkaStorage` is the term used inside the module code to keep things clear. Most of the time a user will simply import it.

**Example:**

```ts
<<<<<<< HEAD
import { Storage } from 'quokka-js'
=======
import { Storage } from "quokka-js";
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
```

---

### 🧹 `Storage.cleanExpired(): void`

Scans through both `localStorage` and `sessionStorage`, removing any entries that have expired (i.e., their `expiresAt` timestamp is in the past). This function can't be called, it's run automatically when the storage is imported.

**Returns:** `void`

**Example:**

```ts
Storage.cleanExpired(); // Cleans expired values manually
```

---

### 🏗️ `QuokkaStorage.createWebStorage(store: Storage): WebStorage`

Returns a structured interface for a given storage type (`localStorage` or `sessionStorage`), with utility methods.

**Parameters:**

- `store` – Either `localStorage` or `sessionStorage`.

<<<<<<< HEAD

=======
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
**Returns:** `WebStorage` – An object with `get`, `set`, `remove`, `clear`, `has`, `keys`, `values`, `entries`, `length`.

This is basically used to keep things clean, not repeat them all between `localStorage` and `sessionStorage`. Any update done here would take effect in them both. Additionally but not probably, it is possible to add another storage depending on how we would need to extend the module's functionalities.

---

## 🌐 WebStorage API

The `WebStorage` interface is returned by `QuokkaStorage.createWebStorage()`. It's also available via:

- `storage.local` (for `localStorage`)

- `storage.session` (for `sessionStorage`)

<<<<<<< HEAD

=======
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
---

### `WebStorage.get(key: string): ParsedType`

Gets and parses the stored value by key. Automatically removes the item if it has expired.

**Returns:** `ParsedType` (string | boolean | object | null)

**Example:**

```ts
<<<<<<< HEAD
storage.local.get('theme'); // "dark", true, or null
=======
storage.local.get("theme"); // "dark", true, or null
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
```

---

### `WebStorage.set(entry: WebStorageEntry): void`

Stores a value under a key with optional expiration and namespacing.

**Parameters:**

- `entry.name` – The key name.

- `entry.value` – The value to store (string, object, etc).

- `entry.expires?` – Optional expiration date (`Date` or timestamp).

- `entry.namespace?` – Optional namespace prefix.

<<<<<<< HEAD

=======
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
**Returns:** `void`

**Example:**

```ts
storage.local.set({
<<<<<<< HEAD
	name: 'theme',
	value: 'dark'
});

storage.session.set({
	name: 'cart',
	value: {
		items: [1, 2]
	},
	expires: Date.now() + 1000 * 60 * 30, // expires in 30 min
	namespace: 'shop'
=======
  name: "theme",
  value: "dark",
});

storage.session.set({
  name: "cart",
  value: {
    items: [1, 2],
  },
  expires: Date.now() + 1000 * 60 * 30, // expires in 30 min
  namespace: "shop",
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
});
```

---

### `WebStorage.remove(entry: { name: string; namespace?: string }): void`

Removes a value by key and optional namespace.

**Example:**

```ts
<<<<<<< HEAD
storage.local.remove({ name: 'theme' });
=======
storage.local.remove({ name: "theme" });
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
```

---

### `WebStorage.clear(): void`

Clears **all entries** from the storage.

**Example:**

```ts
storage.session.clear(); // clears sessionStorage
```

---

### `WebStorage.has(entry: { name: string; namespace?: string }): boolean`

Checks if a key exists and is not expired.

**Returns:** `boolean`

**Example:**

<<<<<<< HEAD

```ts
if (storage.local.has({ name: 'user' })) {
	console.log('User is cached');
=======
```ts
if (storage.local.has({ name: "user" })) {
  console.log("User is cached");
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
}
```

---

### `WebStorage.keys(): string[]`

Returns all keys in the storage.

**Example:**

```ts
console.log(storage.local.keys()); // ['theme', 'user']
```

---

### `WebStorage.values(): string[]`

Returns all values as strings.

**Note:** Does not parse values.

**Example:**

```ts
console.log(storage.session.values());
```

---

### `WebStorage.entries(): [string, string][]`

Returns `[key, rawValue]` pairs.

**Example:**

```ts
for (const [key, value] of storage.local.entries()) {
<<<<<<< HEAD
	console.log(key, value);
=======
  console.log(key, value);
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
}
```

---

### `WebStorage.length(): number`

Returns the number of stored items.

**Example:**

```ts
console.log(`You have ${Storage.session.length()} session items`);
```

---

## 🔑 Helper Functions (internal use only)

These are internal and not exported directly, but are used in the module:

- `buildKey(name: string, namespace?: string): string` – Constructs key with optional namespace.

- `parseStoredValue(raw: string | null): ParsedType` – Parses JSON, handles `expiresAt`, and falls back safely.

- `isDate(value: unknown): value is Date` – Type guard for `Date`.

<<<<<<< HEAD

=======
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
---

## 📦 Usage Overview

```ts
<<<<<<< HEAD
import storage from './path/to/storage';

// Set
storage.local.set({
	name: 'token',
	value: 'abc123',
	expires: new Date(Date.now() + 60000)
});

// Get
const token = storage.local.get({name: 'token'});

// Remove
Storage.local.remove({
	name: 'token'
});

// Check
if (storage.local.has({ name: 'token' })) {
	console.log('Token still valid');
=======
import storage from "./path/to/storage";

// Set
storage.local.set({
  name: "token",
  value: "abc123",
  expires: new Date(Date.now() + 60000),
});

// Get
const token = storage.local.get({ name: "token" });

// Remove
Storage.local.remove({
  name: "token",
});

// Check
if (storage.local.has({ name: "token" })) {
  console.log("Token still valid");
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
}
```

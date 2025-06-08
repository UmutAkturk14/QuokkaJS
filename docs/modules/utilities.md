# `Utilities` Module

The `Utilities` class provides a comprehensive suite of utility functions to streamline common tasks in JavaScript/TypeScript development. It includes methods for value checks, performance optimization (debouncing/throttling), array and object manipulation, environment detection, encoding/decoding, and more.

This module is especially useful for frontend projects where responsiveness, device-awareness, and clean utility abstractions are needed.

> ✅ **Installation:**
> This utility is available via the `quokka-js` package.

```ts
import { Utilities } from 'quokka-js';
```

---

## 📚 Function Categories

### ✔️ Checker Functions

These methods check the nature or type of a value.

- `isTruthy(value: unknown): boolean`

- `isFalsy(value: unknown): boolean`

- `isArray(value: unknown): boolean`

- `isObject(value: unknown): boolean`

- `isEmpty(value: unknown): boolean`

- `isValidEmail(email: string): boolean`


### ⚙️ Optimizing Functions

Use these to improve performance by controlling how frequently functions run.

- `debounce(func, delay, immediate?): (...args) => void & { cancel() }`

- `throttle(func, limit): (...args) => void`


### 🧩 Organizing Functions

For cloning and flattening deeply nested objects or arrays.

- `deepClone<T>(obj: T): T`

- `flatten<T>(arr: (T | T[])[]): T[]`

- `mergeObjects<T extends object>(...objects: T[]): T`


### 🔢 Generation Functions

- `generateUUID(): string`

- `randomInt(min?: number, max?: number): number`


### 🌐 Environment / Device Functions

- `isMobile(): boolean`

- `isTablet(): boolean`

- `isDesktop(): boolean`

- `getDeviceType(): 'mobile' | 'tablet' | 'desktop'`

- `getOS(): string`

- `getBrowser(): string`

- `getCurrentCoordinates(): Promise<{ lat: number; lon: number }>`

- `getLanguage(): string`

- `getTimeZone(): string`

- `getCountryFromLocale(): string`

- `getReferrer(): string | null`


### 🔍 Getter Functions

- `getQueryParam(param: string, url?: string): string | null`


### 🧬 Encoding / Decoding

- `base64Encode(value: string): string`

- `base64Decode(value: string): string`


---

## 🧪 Method Details

### `isTruthy(value)`

Returns `true` if the value is truthy.

```ts
Utilities.isTruthy(1); // true
Utilities.isTruthy(0); // false
```

### `isFalsy(value)`

Returns `true` if the value is falsy.

---

### `debounce(func, delay, immediate?)`

Delays the function call until after a specified delay. If `immediate` is true, triggers the function at the start.

```ts
const debouncedFn = Utilities.debounce(() => console.log('Run'), 300); debouncedFn(); // Only runs after 300ms
```

---

### `throttle(func, limit)`

Ensures the function is invoked at most once in every time window (`limit` ms).

```ts
const throttledFn = Utilities.throttle(() => console.log('Called'), 500); throttledFn(); // Called at most once every 500ms
```

---

### `deepClone(obj)`

Creates a deep clone of the given object using `structuredClone`.

---

### `generateUUID()`

Generates a UUID (v4-like) string.

```ts
Utilities.generateUUID(); // 'b1dfad30-4dc1-4c01-9f6c-22a25f1139d1'
```

---

### `flatten(arr)`

Recursively flattens an array of nested arrays.

```ts
Utilities.flatten([1, [2, [3]], 4]); // [1, 2, 3, 4]
```

---

### `isArray(value)`

Returns `true` if the value is an array.

---

### `isObject(value)`

Returns `true` if the value is a plain object (not `null` or an array).

---

### `randomInt(min?, max?)`

Returns a random integer between `min` and `max` (inclusive). Defaults to `0–100`.

```ts
Utilities.randomInt(10, 20); // e.g., 13
```

---

### `mergeObjects(...objects)`

Shallow merges multiple objects into a new one.


```ts
Utilities.mergeObjects({ a: 1 }, { b: 2 }); // { a: 1, b: 2 }
```

---

### `isEmpty(value)`

Checks if a string, array, or object is empty.

```ts
Utilities.isEmpty([]); // true Utilities.isEmpty({}); // true Utilities.isEmpty(''); // true
```

---

### `getQueryParam(param, url?)`

Gets a query parameter's value from a URL (defaults to `window.location.href`).


```ts
// URL: http://example.com?foo=bar
Utilities.getQueryParam('foo'); // 'bar'
```

---

### `isValidEmail(email)`

Checks if the input string is a valid email address.

---

### `isMobile()`, `isTablet()`, `isDesktop()`

Detects the current device type using `navigator.userAgent`.

---

### `getDeviceType()`

Returns `'mobile'`, `'tablet'`, or `'desktop'`.

---

### `getOS()`

Detects the current operating system.

---

### `getBrowser()`

Returns the current browser name (Chrome, Firefox, Safari, Edge, Opera, or Unknown).

---

### `getCurrentCoordinates()`

Returns a Promise resolving to `{ lat, lon }` using the Geolocation API.

```ts
Utilities.getCurrentCoordinates().then(coords => console.log(coords.lat));
```

---

### `getLanguage()`

Returns the browser language, e.g., `'en-US'`.

---

### `getTimeZone()`

Returns the system time zone, e.g., `'Europe/Istanbul'`.

---

### `getCountryFromLocale()`

Extracts the country code from the locale string.

```ts
// If navigator.language is "en-US"
Utilities.getCountryFromLocale(); // "US"
```

---

### `getReferrer()`

Returns the document referrer if available.

---

### `base64Encode(value)`

Encodes a string to Base64.

```ts
Utilities.base64Encode('hello'); // aGVsbG8=
```

---

### `base64Decode(value)`

Decodes a Base64 string.


```ts
Utilities.base64Decode('aGVsbG8='); // hello
```

---

## 🧾 Summary

The `Utilities` class is a catch-all utility module for any project that benefits from concise, reliable helpers for values, timing, detection, and encoding. It’s especially handy in frontend projects but can be adapted for broader JS/TS usage too.

You can also extend this class by subclassing it to add more project-specific methods.

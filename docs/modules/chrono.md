## `Chrono`

A utility class for working with time durations, expiry, and human-friendly countdowns.

---

### `Chrono.addMinutes(minutes: number, baseDate?: number | Date): Date`

Adds the specified number of minutes to the provided date (or current time by default).

**Parameters:**

- `minutes` – Number of minutes to add.

- `baseDate?` – Optional base date. Defaults to `Date.now()`.

<<<<<<< HEAD

=======
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
**Returns:** `Date` – The resulting Date.

**Example:**

```ts
Chrono.addMinutes(15); // adds 15 minutes to now
Chrono.addMinutes(30, new Date()); // adds 30 minutes to a given date
```

---

### `Chrono.addHours(hours: number, baseDate?: number | Date): Date`

Adds hours to a given date.

**Parameters:**

- `hours` – Number of hours to add.

- `baseDate?` – Optional base date.

<<<<<<< HEAD

=======
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
**Returns:** `Date`

**Example:**

```ts
Chrono.addHours(2); // adds 2 hours to now
```

---

### `Chrono.addDays(days: number, baseDate?: number | Date): Date`

Adds days to a given date.

**Parameters:**

- `days` – Number of days to add.

- `baseDate?` – Optional base date.

<<<<<<< HEAD

=======
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
**Returns:** `Date`

**Example:**

```ts
Chrono.addDays(7); // adds 7 days
```

---

### `Chrono.addWeeks(weeks: number, baseDate?: number | Date): Date`

Adds weeks to a given date.

**Parameters:**

- `weeks` – Number of weeks to add.

- `baseDate?` – Optional base date.

<<<<<<< HEAD

=======
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
**Returns:** `Date`

**Example:**

```ts
Chrono.addWeeks(2); // adds 2 weeks
```

---

### `Chrono.addSeconds(seconds: number, baseDate?: number | Date): Date`

Adds seconds to a given date.

**Parameters:**

- `seconds` – Number of seconds to add.

- `baseDate?` – Optional base date.

<<<<<<< HEAD

=======
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
**Returns:** `Date`

**Example:**

<<<<<<< HEAD

=======
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
```ts
Chrono.addSeconds(45); // adds 45 seconds
```

---

### `Chrono.addMilliseconds(ms: number, baseDate?: number | Date): Date`

Adds milliseconds to a given date.

**Parameters:**

- `ms` – Number of milliseconds to add.

- `baseDate?` – Optional base date.

<<<<<<< HEAD

=======
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
**Returns:** `Date`

**Example:**

ts

CopyEdit

```ts
Chrono.addMilliseconds(500); // adds 500 ms
```

---

### `Chrono.isExpired(expiryTime: number | Date, baseTime?: number | Date): boolean`

Checks if a given expiry time is in the past.

**Parameters:**

- `expiryTime` – Target expiry time.

- `baseTime?` – Optional base time. Defaults to `Date.now()`.

<<<<<<< HEAD

=======
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
**Returns:** `boolean` – `true` if expired.

**Example:**

```ts
Chrono.isExpired(new Date(Date.now() - 1000)); // true
```

---

### `Chrono.timeLeft(expiryTime: number | Date, unit?: 'ms' | 'seconds' | 'minutes' | 'hours' | 'days', baseTime?: number | Date): number`

Returns how much time is left until expiry.

**Parameters:**

- `expiryTime` – Expiry timestamp.

- `unit?` – Unit of time. Defaults to `'ms'`.

- `baseTime?` – Optional reference time.

<<<<<<< HEAD

=======
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
**Returns:** `number` – Time remaining in specified unit.

**Example:**

```ts
<<<<<<< HEAD
Chrono.timeLeft(Date.now() + 3600000, 'minutes'); // ~60
=======
Chrono.timeLeft(Date.now() + 3600000, "minutes"); // ~60
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
```

---

### `Chrono.expiresInMinutes(expiryTime: number | Date, baseTime?: number | Date): number`

Returns how many full minutes are left until expiry.

**Returns:** `number`

**Example:**

```ts
Chrono.expiresInMinutes(Date.now() + 300000); // 5
```

---

### `Chrono.expiresInHours(expiryTime: number | Date, baseTime?: number | Date): number`

Returns how many full hours are left until expiry.

**Returns:** `number`

**Example:**

```ts
Chrono.expiresInHours(Date.now() + 7200000); // 2
```

---

### `Chrono.expiresInDays(expiryTime: number | Date, baseTime?: number | Date): number`

Returns how many full days are left until expiry.

**Returns:** `number`

**Example:**

```ts
Chrono.expiresInDays(Date.now() + 86400000 * 3); // 3
```

---

### `Chrono.setExpiryFromNow(options?: { minutes?: number; hours?: number; days?: number; weeks?: number }): Date`

Creates an expiry timestamp based on time from now.

**Parameters:**

- `options?` – Object with optional durations.

<<<<<<< HEAD

=======
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
**Returns:** `Date`

**Example:**

```ts
Chrono.setExpiryFromNow({ minutes: 5 }); // now + 5 min
```

---

### `Chrono.getExpiryDiff(expiryTime: number | Date, baseTime?: number | Date): { diff: number, isExpired: boolean, days: number, hours: number, minutes: number, seconds: number }`

Returns a detailed breakdown of the time left.

**Returns:** Object with:

- `diff` – Raw ms diff

- `isExpired` – Boolean

- `days`, `hours`, `minutes`, `seconds` – Breakdown

<<<<<<< HEAD

=======
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
**Example:**

ts

CopyEdit

```ts
Chrono.getExpiryDiff(Date.now() + 3661000);
/* {   diff: 3661000,   isExpired: false,   days: 0,   hours: 1,   minutes: 1,   seconds: 1 } */
```

---

### `Chrono.formatExpiry(expiryTime: number | Date, baseTime?: number | Date): string`

Returns a human-readable expiry string.

**Returns:** `string` – e.g. `"Expires in 1 hour"` or `"Expired 5 minutes ago"`

**Example:**

```ts
Chrono.formatExpiry(Date.now() + 60000); // "Expires in 1 minute" Chrono.formatExpiry(Date.now() - 2000);  // "Expired just now"
```

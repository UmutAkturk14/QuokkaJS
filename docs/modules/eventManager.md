# Event Manager Module Documentation

The `eventManager` module adds event-handling functionality to the `Core` class using method extensions via a Proxy.

---

## Overview

This module provides a simplified and chainable interface for DOM event handling, inspired by jQuery's event system. It supports event namespaces, once-only handlers, and custom event triggering.

---

## API Reference

### `on(event: string, callback: EventListener): Core`

Registers an event listener on all elements within the Core instance.

**Parameters:**

- `event`: A string representing the event name (optionally namespaced, e.g. `click.namespace`).

- `callback`: The function to call when the event is triggered.


**Returns:**

- `Core`: For method chaining.


**Usage:**

```ts
$('.btn').on('click', (e) => console.log('Clicked'));
$('.box').on('mouseover.namespace', handleHover);
```

---

### `off(event: string, callback?: EventListener): Core`

Removes a previously bound event listener. If no callback is provided, removes all handlers for the event/namespace.

**Parameters:**

- `event`: A string representing the event name (optionally namespaced).

- `callback` _(optional)_: The function reference to remove.


**Returns:**

- `Core`: For method chaining.


**Usage:**

```ts
$('.btn').off('click');
$('.box').off('mouseover.namespace', handleHover);
```

---

### `once(event: string, callback: EventListener): Core`

Adds a one-time event listener to all elements. The callback is automatically removed after the first invocation.

**Parameters:**

- `event`: A string representing the event name (optionally namespaced).

- `callback`: The function to execute once.


**Returns:**

- `Core`: For method chaining.


**Usage:**

```ts
$('.alert').once('mouseenter', () => alert('You hovered once'));
```

---

### `trigger(event: string, detail?: unknown): Core`

Programmatically triggers a custom event on all selected elements.

**Parameters:**

- `event`: A string representing the event name.

- `detail` _(optional)_: Any data you want to pass to the event.


**Returns:**

- `Core`: For method chaining.


**Usage:**

```ts
$('.card').trigger('customEvent', { foo: 'bar' });
```

---

## Namespaced Events

Event strings can include namespaces (e.g., `click.modal`) to allow fine-grained control over removing listeners without affecting others.

**Examples:**

```ts
$('.btn').on('click.modal', openModal);
$('.btn').off('click.modal');
```

---

## Internal Utilities

### `handlerMap: WeakMap<HTMLElement, HandlerEntry[]>`

Stores all registered event handlers for each DOM element. This enables selective removal of handlers.

### `parseEvent(eventWithNamespace: string): { event: string; namespace?: string }`

Utility function that splits a namespaced event string into its base event and optional namespace.

---

## Example Integration

The module is integrated via the `Core` class proxy.

```ts
import { $ } from 'quokka-js';

$('.item').on('click', () => console.log('Item clicked'));
$('.item').trigger('click');
```

---

## Type Definitions

```ts
interface HandlerEntry {
  event: string;
  namespace?: string;
  callback: EventListener;
}
```

---

## Notes

- The module uses native `CustomEvent` for the `trigger` method.

- `once` handlers clean themselves up using `off` after the first call.

- Namespaced event support is limited to `on`, `off`, and `once`.


---

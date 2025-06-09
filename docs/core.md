# Core Module Documentation

The **Core Module** is the foundation of QuokkaJS, providing essential functionality for DOM manipulation, element selection, and data handling. It is designed to be lightweight, intuitive, and type-safe, making it a powerful tool for modern web development.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
   - [Initialization](#initialization)
   - [Element Selection](#element-selection)
   - [DOM Manipulation](#dom-manipulation)
   - [Data Handling](#data-handling)
   - [Element Traversal](#element-traversal)
   - [Utility Methods](#utility-methods)
4. [API Reference](#api-reference)
5. [Examples](#examples)
6. [Contributing](#contributing)

---

## Introduction

The **Core Module** provides a jQuery-like API with modern enhancements, powered by TypeScript. It allows you to:

- Select and manipulate DOM elements.
- Handle data attributes and text content.
- Traverse and filter elements.
- Chain methods for a fluent API.

---

## Installation

To use the Core Module, install QuokkaJS via npm:

```bash
npm install quokkajs
```

Then, import the `$` function in your project:

```typescript
import { $ } from "quokkajs";
```

---

## Usage

### Initialization

The `$` function initializes a `Core` instance. It accepts:

- A **CSS selector** (e.g., `".class"`, `"#id"`).

- An **HTMLElement** or an array of **HTMLElements**.

- A **tag string** (e.g., `"<div>"`) to create new elements.

```typescript
// Initialize with a CSS selector
const $divs = $("div");

// Initialize with an HTMLElement
const $element = $(document.getElementById("myElement"));

// Create a new element with attributes
const $newDiv = $("<div>", { id: "newDiv", text: "Hello, World!" });
```

---

### Element Selection

The `Core` instance provides array-like behavior for selected elements. You can access elements by index or use methods like `first()`, `last()`, and `get()`.

```typescript
// Get/set attributes
$divs.attr("data-test", "value"); // Set attribute
const attrValue = $divs.attr("data-test"); // Get attribute

// Get/set text content
$divs.text("New text"); // Set text
const textContent = $divs.text(); // Get text

// Get/set inner HTML
const htmlContent = $divs.html(); // Get HTML

// Get/set value
const value = $divs.val(); // Get value
```

---

### Data Handling

The `data()` method allows you to get, set, or remove data attributes.

```typescript
// Get all data attributes
const data = $divs.data();

// Get a specific data attribute
const specificData = $divs.data("key");

// Set a data attribute
$divs.data("key", "value");

// Set multiple data attributes
$divs.data({ key1: "value1", key2: "value2" });

// Remove a data attribute
$divs.data("key", null);
```

---

### Element Traversal

The Core Module provides methods for traversing and filtering elements, such as `each()`, `map()`, `filter()`, `add()`, and `remove()`.

```typescript
// Iterate over elements
$divs.each((el, index) => {
  console.log(`Element ${index}:`, el);
});

// Map elements to a new array
const $mapped: Core = $divs.map((el: HTMLElement) => el.cloneNode(true));

// Filter elements
const $filtered: Core = $divs.filter((el: HTMLElement) =>
  el.classList.contains("active")
);

// Add elements to the selection
const $combined: Core = $divs.add(".newElements");

// Remove elements from the selection
const $updated: Core = $divs.remove(".unwantedElements");
```

---

### Utility Methods

The Core Module includes utility methods for checking element existence and emptiness.

```typescript
// Check if elements exist
const exists: boolean = $divs.exists();

// Check if the selection is empty
const isEmpty: boolean = $divs.isEmpty();

// Get the number of selected elements
const length: number = $divs.length;
```

## API Reference

### `$(selector, attributes)`

Initializes a `Core` instance.

- **Parameters**:

  - `selector`: A CSS selector, `HTMLElement`, or array of `HTMLElement`.

  - `attributes` (optional): An object of attributes for new elements.

- **Returns**: A `Core` instance.

---

### Core Methods

#### `data(name?, value?)`

Gets, sets, or removes data attributes.

- **Parameters**:

  - `name` (optional): A string (attribute name) or object (key-value pairs).

  - `value` (optional): The value to set or `null` to remove.

- **Returns**: A string, object, or `Core` instance.

---

#### `attr(name, value?)`

Gets or sets an attribute.

- **Parameters**:

  - `name`: The attribute name.

  - `value` (optional): The value to set.

- **Returns**: A string or `Core` instance.

---

#### `text(text?)`

Gets or sets text content.

- **Parameters**:

  - `text` (optional): The text to set.

- **Returns**: A string or `Core` instance.

---

#### `html()`

Gets the inner HTML of the first element.

- **Returns**: A string.

---

#### `val()`

Gets the `value` attribute of the first element.

- **Returns**: A string.

---

#### `each(callback)`

Iterates over selected elements.

- **Parameters**:

  - `callback`: A function that receives the element and index.

- **Returns**: The `Core` instance.

---

#### `map(callback)`

Maps elements to a new array.

- **Parameters**:

  - `callback`: A function that transforms elements.

- **Returns**: A new `Core` instance.

---

#### `filter(callback)`

Filters elements based on a condition.

- **Parameters**:

  - `callback`: A function that tests elements.

- **Returns**: A new `Core` instance.

---

#### `first()`

Gets the first element in the selection.

- **Returns**: A new `Core` instance.

---

#### `last()`

Gets the last element in the selection.

- **Returns**: A new `Core` instance.

---

#### `add(selector)`

Adds elements to the selection.

- **Parameters**:

  - `selector`: A CSS selector or `Core` instance.

- **Returns**: A new `Core` instance.

---

#### `remove(selector)`

Removes elements from the selection.

- **Parameters**:

  - `selector`: A CSS selector or `Core` instance.

- **Returns**: A new `Core` instance.

---

#### `exists()`

Checks if elements exist.

- **Returns**: A boolean.

---

#### `isEmpty()`

Checks if the selection is empty.

- **Returns**: A boolean.

---

## Examples

### Example 1: Basic Usage

```typescript
const $divs = $("div");
$divs.attr("data-test", "value").text("Hello, World!");
```

### Example 2: Data Handling

```typescript
$divs.data({ key1: "value1", key2: "value2" });
const data = $divs.data("key1"); // 'value1'
```

### Example 3: Element Traversal

```typescript
$divs.each((el, index) => {
  console.log(`Element ${index}:`, el);
});
```

---

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](https://chat.deepseek.com/a/chat/s/CONTRIBUTING.md) to get started.

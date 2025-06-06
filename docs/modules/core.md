# 📦 Core Class – Documentation

The `Core` class provides a chainable, array-like interface for working with DOM elements, extending functionality with custom event management, DOM manipulation, and geometry utilities.

---

## 🧱 Constructor


```ts
new Core(selector: string | HTMLElement | HTMLElement[], attributes?: Record<string, string>)
```
- `selector`:
	- A CSS selector string (".class", "#id").
	- A tag string (`<div>`) to create new elements.
	- A single HTMLElement.
	- An array of HTMLElements.

`attributes` (optional): Key-value pairs to set attributes or text on new elements.

Returns a `Proxy` instance of `Core` with access to extended `DOM`, `eventManager`, and `geometry` modules.

## 🔑 Properties

| Property       | Description                                     |
| -------------- | ----------------------------------------------- |
| `elements`     | Array of matched or created DOM elements        |
| `eventManager` | Methods imported from the `eventManager` module |
| `DOM`          | Methods imported from the `DOM` module          |
| `geometry`     | Methods imported from the geometry module       |
| [index]        | Array-like access to elements (e.g., node[1])   |
| `length`       | Read-only number of matched elements            |
|                |                                                 |

## 🧰 Core Methods

### `data(name?, value?)`

Get, set, or remove `data-*`attributes.

```ts
core.data()                      // Get all data attributes
core.data("key")                 // Get specific attribute
core.data("key", "value")        // Set attribute
core.data({ key: "value" })      // Set multiple attributes
core.data({ key: null })         // Remove attribute
```

### `each(callback)`
Iterate over elements.

```ts
$('.elements').each((el, i) => { ... });
```


### `map(callback)`
Transform elements.

```ts
$('.elements').map((el, i) => transformedEl);
```

### `filter(callback)`
Filter elements.


```ts
$('.elements').filter((el, i) => el.classList.contains("visible"));
```

### `first(), last()`
Get the first or last element in a new Core instance.

```ts
$('.elements').first();
$('.elements').last();
```

## ✅ Checks
- isEmpty() → true if no elements.
- exists() → true if any elements exist.

## ➕ Element Management

### `add(selector | Core)`
Append elements to current selection.

### `remove()`
Remove all elements from the DOM.

### `removeChild(index)`
Remove the element at the given index.

## 📎 Attributes
### `attr(name: string, value?: string)`
Get or set an attribute.

```ts
$('#element').attr('newAttr', 'newAttrValue')
```

### `removeAttr(name)`
Remove a specific attribute.

```ts
$('#element').removeAttr('newAttr');
```

## 📝 Content
### `text() / text(value)`
Get or set text content.

### `html()`
Get the innerHTML of the first element.

### `val()`
Get the value attribute.

## 🎨 Class Handling

```ts
$('.element').addClass("active");
$('.element').removeClass("hidden");
$('.element').toggleClass("selected");
$('.element').hasClass("loading"); // returns boolean
```

### `classList()`
Get the class attribute value of the first element.

## 📦 Tree Traversal

### `children()`
Get all children of the selected elements.

### `parent()`
Get immediate parents.

### `parents()`
Get all ancestors.

### `siblings()`
Get all sibling elements.

## 🔍 Element Selection

### `get(index: number, core: boolean = true)`
Get an element by index. Return a Core instance or raw element.

```ts
$('.element').get(0); // Returns the element as a Core instance

$('.element').get(0, false); // Returns the element as an HTMLElement
```

### `eq(index: number)`
Return the Core instance for a specific index, supports negative indexes.

```ts
$('.element').eq(-5);
```

### `find(selector: string)`
Find elements inside the selected elements.

```ts
$('.element').find('searcClass');
```

## 🔠 Identification & Match

### `id(identifier?: string)`
Check if the first element matches the ID (if argument is provided). Otherwise, return the ID of the first element.

```ts
$('#element').id(); // Returns the ID attribute of the element
$('#element').id('param'); // Checks if the ID attribute of the element is 'param', then returns a boolean that turns true if the ID matches
```

### `is(selector: string | Element | ((el: HTMLElement) => boolean))`
Check if the first element matches the given selector, element, or callback condition.

## 🔁 Chainable Utilities via Proxy
Your instance can call additional methods from: `DOM`, `eventManager` or `geometry` modules

Example:

```ts
$('#element').addClass("visible").on("click", callback).scrollTop(100);
```

Here, `on()` function is found in the `eventManager` module, and `scrollTop()` is in `geometry`. To keep things chainable and jQuery-like to make it more intuitive, these are called by the `Core` module. But to keep things as modular and scalable as possible, they have their own modules.

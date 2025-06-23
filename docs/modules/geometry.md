# `Geometry` Module Documentation

The `geometry` module extends the `Core` class in `quokka-js`, providing a set of methods for working with DOM element dimensions, position, scrolling, and viewport visibility.

All methods operate on the **first matched element** in the wrapped set (`HTMLElement[]`) and are accessible via:

```ts
<<<<<<< HEAD
import { $ } from 'quokka-js';

$('.selector').width();      // Get width
$('.selector').offset();     // Get offset from document
=======
import { $ } from "quokka-js";

$(".selector").width(); // Get width
$(".selector").offset(); // Get offset from document
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
```

---

## 📦 Box Model Dimensions

### `.width(): number`
<<<<<<< HEAD
Returns the `clientWidth` of the element (excluding padding, border, margin, and scrollbars).

### `.height(): number`
Returns the `clientHeight` of the element (excluding padding, border, margin, and scrollbars).

### `.innerWidth(): number`
Alias of `.width()` — consistent with jQuery-style API.

### `.innerHeight(): number`
Alias of `.height()` — consistent with jQuery-style API.

### `.outerWidth(includeMargin = false): number`
=======

Returns the `clientWidth` of the element (excluding padding, border, margin, and scrollbars).

### `.height(): number`

Returns the `clientHeight` of the element (excluding padding, border, margin, and scrollbars).

### `.innerWidth(): number`

Alias of `.width()` — consistent with jQuery-style API.

### `.innerHeight(): number`

Alias of `.height()` — consistent with jQuery-style API.

### `.outerWidth(includeMargin = false): number`

>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
Returns the full width including border and padding.
If `includeMargin` is `true`, left and right margins are also included.

### `.outerHeight(includeMargin = false): number`
<<<<<<< HEAD
=======

>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
Returns the full height including border and padding.
If `includeMargin` is `true`, top and bottom margins are also included.

---

## 📍 Element Positioning

### `.offset(): { top: number; left: number }`
<<<<<<< HEAD
Returns the element's position **relative to the document**, accounting for scroll.

### `.position(): { top: number; left: number }`
Returns the element's position **relative to its offset parent**.

### `.offsetTop(): number`
Returns the vertical offset of the element from the top of the document.

### `.offsetLeft(): number`
=======

Returns the element's position **relative to the document**, accounting for scroll.

### `.position(): { top: number; left: number }`

Returns the element's position **relative to its offset parent**.

### `.offsetTop(): number`

Returns the vertical offset of the element from the top of the document.

### `.offsetLeft(): number`

>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
Returns the horizontal offset of the element from the left of the document.

---

## ↕️ Scroll Utilities

### `.scrollTop(value?: number): number | Core`
<<<<<<< HEAD
=======

>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
- **Getter**: Returns the current vertical scroll position of the element.
- **Setter**: If a `value` is passed, sets `scrollTop` and returns the Core instance for chaining.

### `.scrollLeft(value?: number): number | Core`
<<<<<<< HEAD
=======

>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
- **Getter**: Returns the current horizontal scroll position of the element.
- **Setter**: If a `value` is passed, sets `scrollLeft` and returns the Core instance.

### `.scrollWidth(): number`
<<<<<<< HEAD
Returns the total scrollable width of the element (includes overflow).

### `.scrollHeight(): number`
=======

Returns the total scrollable width of the element (includes overflow).

### `.scrollHeight(): number`

>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
Returns the total scrollable height of the element (includes overflow).

---

## 👁️ Viewport & Visibility

### `.isInViewport(): boolean`
<<<<<<< HEAD
=======

>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
Checks whether the element is fully within the viewport.

---

## 🧱 Native DOMRect

### `.rect(): DOMRect`
<<<<<<< HEAD
=======

>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
Returns the element’s bounding rectangle (`getBoundingClientRect()`).

---

## 🧪 Example Usage

```ts
<<<<<<< HEAD
import { $ } from 'quokka-js';

const height = $('.my-box').outerHeight(true);
const { top, left } = $('.header').offset();

$('.scrollable-div').scrollTop(200);   // Set scroll
const scroll = $('.scrollable-div').scrollTop();  // Get scroll
=======
import { $ } from "quokka-js";

const height = $(".my-box").outerHeight(true);
const { top, left } = $(".header").offset();

$(".scrollable-div").scrollTop(200); // Set scroll
const scroll = $(".scrollable-div").scrollTop(); // Get scroll
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
```

---

## Notes

- All methods use the **first element** in the matched set (`this[0]`).
- Methods are chainable where applicable (e.g. `scrollTop()` and `scrollLeft()` setters).
- This module is registered automatically in the `Core` instance via Proxy.

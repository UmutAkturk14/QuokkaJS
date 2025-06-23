# DOM Module

The `DOM` module provides chainable utility methods for DOM manipulation and animations, extending the core library with visual interactivity and structural DOM changes. This module is designed to simplify common operations like inserting elements, applying animations, and triggering DOM events. This module also extends the functionality of the `Core` module via a Proxy, so when it is imported, `DOM` is automatically imported, too.

## Import

```ts
import { $ } from "quokka-js";
```

---

## Core Methods

### `append(child)`

Appends a child element to the selected elements.

- **Parameters:**

- **Returns:** `Core` — for chaining.

```ts
$(".element").append("<p>Hello</p>");
```

---

### `prepend(child)`

Prepends a child element to the selected elements.

- **Parameters:** Same as `append`.

- **Returns:** `Core`

<<<<<<< HEAD

=======

> > > > > > > dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc

---

### `before(child)`

Inserts the child before the selected elements.

---

### `after(child)`

Inserts the child after the selected elements.

---

### `focus()`

Triggers focus on the selected elements (e.g., inputs, buttons).

---

### `click()`

Triggers a click event on the selected elements.

```ts
<<<<<<< HEAD
$('.element').click()
=======
$(".element").click();
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
```

---

### `blur()`

Triggers blur on the selected elements.

---

## Animation Methods

These methods rely on inline style changes to create animation effects.

### `zoomIn(duration = 600, scale = 1.2)`

Scales the element up smoothly.

---

### `zoomOut(duration = 600)`

Scales the element back to its original size.

---

### `pulseGlow(duration = 800, intensity = 20, colors?)`

Creates a glowing pulsing animation using `box-shadow` and `text-shadow`.

- **Optional `colors`:**

<<<<<<< HEAD

````ts
const glowColours = {
	boxShadow: 'rgba(...)',
	textShadow: 'rgba(...)',
	boxShadowPulse: 'rgba(...)',
	textShadowPulse: 'rgba(...)'
};

$('.element').pulseGlow(600, 20, glowColours);
=======
```ts
const glowColours = {
  boxShadow: "rgba(...)",
  textShadow: "rgba(...)",
  boxShadowPulse: "rgba(...)",
  textShadowPulse: "rgba(...)",
};

$(".element").pulseGlow(600, 20, glowColours);
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
````

---

### `pulse(duration = 600, scale = 1.2)`

A bouncy scaling pulse animation.

```ts
<<<<<<< HEAD
$('.element').pulse()
=======
$(".element").pulse();
>>>>>>> dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc
```

---

### `bounce(duration = 600, height = 30)`

Creates a bounce effect vertically.

---

### `shake(duration = 400, intensity = 1.5)`

Simulates a shaking motion horizontally.

---

### `flip(duration = 600)`

Performs a 3D Y-axis rotation and resets after the duration.

---

### `slideDown()`, `slideUp()`, `slideYToggle()`

Slide animations along the Y-axis.

---

### `slideLeft()`, `slideRight()`, `slideXToggle()`

Slide animations along the X-axis.

---

### `fadeIn()`, `fadeOut()`, `fadeToggle()`

Fade animations using `opacity`.

---

### `invisible()`

Makes the element invisible using `visibility: hidden`.

---

### `visible()`

Makes the element visible using `visibility: visible`.

---

### `hide()`

Hides the element using `display: none`.

---

### `show()`

Shows the element by resetting the `display` property.

---

### `toggle()`

Toggles visibility via `display`.

---

### `toggleVisibility()`

Toggles `visibility` between `visible` and `hidden`.

---

### `css(property: string | object, value?: string)`

Applies inline CSS to elements.

- **Usage:**

```ts
$(".element").css("color", "red");
$(".element").css({ color: "blue", fontSize: "14px" });
```

---

### `directionalFade(scrollUpFade: boolean = false, animationType: 'fade' | 'slide' = 'fade', selectors: string = DEFAULT_DIRECTIONAL_FADE_SELECTOR)`

An advanced animation that fades and moves the element depending on the user scroll.

If the scroll up fade is `true`, then the animation will work on scroll up, too, meaning, it will keep appearing every time a user scrolls up and down. Otherwise, it will animate once on scroll down and the elements will stay there.

<<<<<<< HEAD
Two kinds of animation type, `fade` and `slide`. The default option is `fade`.
=======
Two kinds of animation type, `fade` and `slide`. The default option is `fade`.

> > > > > > > dfa9ef3a9d52739fc989d530383bf1fc6aaab4cc

`selectors` are the parameter that sets how elements get the animation.

**NOTE:** This part is going to be made more intuitive like;

```ts
$(".element").directionalFade();
```

should just work. Right now, it works, but not on the element selected in the `Core` instance. This is going to be reworked.

---

## Notes

- All methods are chainable.

- This module assumes the presence of the `Core` wrapper and its `.each()` iteration logic.

- Animations are handled using inline styles and `setTimeout`/`requestAnimationFrame` patterns.

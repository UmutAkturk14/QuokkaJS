import type { Core } from "@modules/core";

const DEFAULT_DIRECTIONAL_FADE_SELECTOR: string = `
  section, article, div, p, span, h1, h2, h3, h4, h5, h6,
  img, video, figure, picture,
  ul, ol, li,
  blockquote, pre, code, table
`.replace(/\s+/g, ''); // optional: compress whitespace


/**
 * Animation methods
 */
function directionalFade(
  this: Core,
  scrollUpFade: boolean = false,
  animationType: 'fade' | 'slide' = 'fade',
  selectors: string = DEFAULT_DIRECTIONAL_FADE_SELECTOR,
): Core {
  // 1. Inject animation styles
  const style: HTMLStyleElement = document.createElement('style');
  style.textContent = {
    fade: `
      .fade-target {
        opacity: 0;
        transition: opacity 600ms ease;
      }
      .fade-visible {
        opacity: 1 !important;
      }`,
    slide: `
      .slide-target {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 600ms ease, transform 600ms ease;
      }
      .slide-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }`
  }[animationType];
  document.head.appendChild(style);

  // 2. Select elements to animate
  const elements: Element[] = Array.from(this.find(selectors));

  // Class names based on type
  const targetClass: string = animationType + '-target';
  const visibleClass: string = animationType + '-visible';

  // 3. Initial visibility setup
  elements.forEach(el => {
    const rect: DOMRect = el.getBoundingClientRect();
    const inView: boolean = rect.top < window.innerHeight && rect.bottom > 0;
    el.classList.add(targetClass);
    if (inView) {
      el.classList.add(visibleClass);
    }
  });

  // 4. Throttle function
  function throttle(fn: (...args: unknown[]) => void, delay: number) {
    let lastCall: number = 0;
    return function (...args: unknown[]) {
      const now: number = new Date().getTime();
      if (now - lastCall < delay) return;
      lastCall = now;
      return fn(...args);
    };
  }

  // 5. Scroll logic
  let lastScrollY: number = window.scrollY;

  function handleScroll(): void {
    const currentScrollY: number = window.scrollY;
    const scrollingDown: boolean = currentScrollY > lastScrollY;
    lastScrollY = currentScrollY;

    elements.forEach(el => {
      const rect: DOMRect = el.getBoundingClientRect();
      const inView: boolean = rect.top < window.innerHeight && rect.bottom > 0;

      if (!el.classList.contains(targetClass)) return;

      if (scrollingDown && inView) {
        el.classList.add(visibleClass);
      }

      if (!scrollingDown && rect.top > window.innerHeight && scrollUpFade) {
        el.classList.remove(visibleClass);
      }
    });
  }

  // 6. Attach throttled scroll event
  window.addEventListener('scroll', throttle(handleScroll, 50));

  return this;
}

export {
  directionalFade
};

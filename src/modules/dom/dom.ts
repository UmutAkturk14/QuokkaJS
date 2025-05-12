import { Core } from "@modules/core";
import type { DOMMethods } from "@utils/types";
import * as animations from '@utils/animations';
import * as advancedAnimations from '@utils/animations';

const {
  zoomIn,
  zoomOut,
  pulseGlow,
  pulse,
  bounce,
  shake,
  flip,
  slideDown,
  slideUp,
  slideYToggle,
  slideXToggle,
  slideRight,
  slideLeft,
  fadeOut,
  fadeIn,
  fadeToggle,
  invisible,
  hide,
  show,
  toggle,
  toggleVisibility,
  visible,
  css
} = animations;

const { directionalFade } = advancedAnimations;



/**
 * Append methods
 */

function insertAt(
  this: Core,
  child: string | HTMLElement | Core,
  position: 'append' | 'prepend' | 'before' | 'after' | 'replace'
): Core {
  if (typeof child === 'string') {
    const tempDiv: HTMLDivElement = document.createElement('div');
    tempDiv.innerHTML = child;
    const nodes: ChildNode[] = Array.from(tempDiv.childNodes);

    this.each((el: HTMLElement) => {
      nodes.forEach((node: ChildNode) => {
        switch (position) {
        case 'prepend':
          el.insertBefore(node.cloneNode(true), el.firstChild);
          break;
        case 'before':
          el.parentNode?.insertBefore(node.cloneNode(true), el);
          break;
        case 'after':
          el.parentNode?.insertBefore(node.cloneNode(true), el.nextSibling);
          break;
        case 'append':
          el.appendChild(node.cloneNode(true));
          break;
        case 'replace':
          el.parentNode?.replaceChild(node.cloneNode(true), el);
          break;
        default:
          console.warn('Invalid position provided for insertion');
          break;
        }
      });
    });

  } else {
    const elements: HTMLElement[] =
      child instanceof Core ? child.elements : [child];

    this.each((el: HTMLElement) => {
      elements.forEach((childEl: HTMLElement) => {
        if (el === childEl || el.contains(childEl)) return;

        switch (position) {
        case 'prepend':
          el.insertBefore(childEl.cloneNode(true), el.firstChild);
          break;
        case 'before':
          el.parentNode?.insertBefore(childEl.cloneNode(true), el);
          break;
        case 'after':
          el.parentNode?.insertBefore(childEl.cloneNode(true), el.nextSibling);
          break;
        case 'append':
          el.appendChild(childEl.cloneNode(true));
          break;
        case 'replace':
          el.parentNode?.replaceChild(childEl.cloneNode(true), el);
          break;
        default:
          console.warn('Invalid position provided for insertion');
          break;
        }
      });
    });
  }

  return this;
}

function append(this: Core, child: string | HTMLElement | Core): Core {
  return insertAt.call(this, child, 'append');
}

function prepend(this: Core, child: string | HTMLElement | Core): Core {
  return insertAt.call(this, child, 'prepend');
}

function before(this: Core, child: string | HTMLElement | Core): Core {
  return insertAt.call(this, child, 'before');
}

function after(this: Core, child: string | HTMLElement | Core): Core {
  return insertAt.call(this, child, 'after');
}

/**
 * Focus, click, and blur methods
 */

function focus(this: Core): Core {
  return applyMethod.call(this, 'focus');
}

function click(this: Core): Core {
  return applyMethod.call(this, 'click');
}

function blur(this: Core): Core {
  return applyMethod.call(this, 'blur');
}

function applyMethod(this: Core, method: 'focus' | 'click' | 'blur'): Core {
  this.each((el: HTMLElement) => {
    if (typeof el[method] === 'function') {
      (el[method] as () => void)();
    }
  });
  return this;
}




export const DOM: DOMMethods = {
  prepend,
  before,
  after,
  append,
  focus,
  click,
  blur,
  zoomIn,
  zoomOut,
  pulseGlow,
  pulse,
  bounce,
  shake,
  flip,
  slideDown,
  slideUp,
  slideYToggle,
  slideXToggle,
  slideRight,
  slideLeft,
  fadeOut,
  fadeIn,
  fadeToggle,
  invisible,
  hide,
  show,
  toggle,
  toggleVisibility,
  visible,
  css,
  directionalFade
};
